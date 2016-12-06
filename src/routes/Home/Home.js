import React from 'react'
import axios from 'axios'
import polyline from 'polyline'

// react-leaflet imports
import { Map, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import Control from 'react-leaflet-control'
//implementing AnimatedMarker plugin
import AnimatedMarkerElement from './components/AnimatedMarkerElement.js'
//implementing mapzen's searchbox
import SearchBox from './components/SearchBox.js'

class Home extends React.Component {
  state = {
    zoom: 16,
    position: {
      lat: 51.505,
      lng: -0.09,
    },
    mapKey: Math.random(),
  }

  handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            position: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            mapKey: Math.random()
          })
        }, (err) => {
          console.log("Geolocation did not work: " + err)
        }
      )
    } else {
      console.log("Geolocation did not work.  Navigator.geolocation falsy")
    }
  }

  handleNavigate = (e) => {
    const destination = e.latlng

    let position
    if (this.state.route) {
      const animatedMarker = this.animatedMarkerElement.animatedMarker
      position = animatedMarker.getLatLng()
    } else {
      position = this.state.position
    }
    this.getRoute(position, destination)
  }

  getRoute = (position, destination) => {
    const endpoint = 'https://router.project-osrm.org/match/v1/driving/'
      + position.lng + ',' + position.lat + ';'
      + destination.lng + ',' + destination.lat
  
    axios.get(endpoint)
      .then(response => {
        const geometry = response.data.matchings[0].geometry
        const coordinates = polyline.decode(geometry)
        this.setState({
          destination: destination,
          route: {
            'type': 'LineString',
            'coordinates': coordinates
          }
        })
      })
      .catch(error => {
        console.log('endpoint= ' + endpoint)
        console.log(error)
      }) 
  }

  handleSearchSelect = e => {
    console.log(e)
  }

  render () {
    return (
      <Map 
        style={{height: "100vh", width: "100vw"}}
        zoom={this.state.zoom}
        center={this.state.position}
        key={this.state.mapKey}
        onClick={this.handleNavigate}
        ref='map'
        >
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/<copyright">OpenStreetMap</a> contributors'
        />
        <SearchBox
          onSelect={this.handleNavigate}
        />
        <Control position="bottomright" >
          <button
            onClick={this.handleGeolocation}
            >
            geolocate
          </button>
        </Control>
        {!this.state.route &&
          <Marker
           position={this.state.position}
          />
        }
        {this.state.route &&
          <Polyline positions={this.state.route.coordinates} />
        }
        {this.state.route &&
            <AnimatedMarkerElement 
              route={this.state.route} 
              ref={marker => { this.animatedMarkerElement = marker }}
            />
        }
      </Map>
    )
  }
}

export default App;
