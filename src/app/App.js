import React from 'react'
import 'react-toolbox/lib/commons.scss'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import Control from 'react-leaflet-control'
import { Button, IconButton } from 'react-toolbox';
import axios from 'axios'
import OverpassLayer from './OverpassLayer'
import CustomMarker from './CustomMarker'

class App extends React.Component {
  state = {
    zoom: 16,
    position: {
      lat: 51.505,
      lng: -0.09,
    },
    mapKey: Math.random(),
    markers: [],
    overpassLayerKey: Math.random()
  }

  componentDidMount () {
    //center map on user's current position
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
          this.refreshOverpassLayer()
        },
        (err) => {
          console.log(err)
        }
      )
    }
  }

  handleGeolocation = () => {
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
        alert("Geolocation did not work: " + err)
      }
    )
  }

  getPosition = (e) => {
    const endpoint = `https://nominatim.openstreetmap.org/reverse?\
      format=json&lat=${e.latlng.lat}&lon=${e.latlng.lng}&zoom=18&addressdetails=1`
    axios.get(endpoint)
      .then((response) => {
        const address = response.data.display_name.split(' ').join('+')        
        const searchEndpoint = `https://nominatim.openstreetmap.org/search?q=${address}&format=json&polygon=1&addressdetails=1`
        axios.get(searchEndpoint)
          .then((response) => {
            console.log('Nominatim search:\n'+response.data)
          })
          .catch((err) => {
            console.log(err)
          })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  refreshOverpassLayer = () => {
    console.log('in refreshOverpassLayer')
    this.setState({
      overpassLayerKey: Math.random()
    })
  }

  render () {
    return (
        <Map 
          style={{height: "100vh", width: "100vw"}}
          zoom={this.state.zoom}
          center={this.state.position}
          key={this.state.mapKey}
          onClick={this.getPosition}
          ref='map'
        >
          <TileLayer
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://osm.org/<copyright">OpenStreetMap</a> contributors'
          />
          {/*<Control position="bottomright" >
            <Button icon='my_location' floating  mini 
              onClick={this.handleGeolocation}
            />
          </Control>
          <Control position="topright" >
            <Button 
              onClick={this.refreshOverpassLayer}>
              Refresh POIs
            </Button>
          </Control>*/}
          <OverpassLayer
            key={this.state.overpassLayerKey}            
          />
          {/*}
          <Marker
            position={this.state.position}
          />
          */}
        </Map>
    )
  }
}

export default App;