import React from 'react'
import 'react-toolbox/lib/commons.scss'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import Control from 'react-leaflet-control'
import { Button, IconButton } from 'react-toolbox';
import axios from 'axios'
import OverpassLayer from './OverpassLayer'
import MarkerLayer from 'react-leaflet-marker-layer'
import CustomMarker from './CustomMarker'

class App extends React.Component {
  state = {
    zoom: 18,
    lat: 51.505,
    lng: -0.09,
    mapKey: Math.random(),
    markers: []
  }

  componentDidMount () {
    //center map on user's current position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      }
    )
    
    //make a marker for every POI in the area
    //each marker needs a position and text 
    const bounds = this.refs.map.leafletElement.getBounds()
    const boundsString = [
      bounds._southWest.lat,
      bounds._southWest.lng,
      bounds._northEast.lat,
      bounds._northEast.lng
    ].join(',')
    const overpassURL = 'https://overpass-api.de/api/interpreter?data='
    const query = '[out:json][timeout:25];' +
      '(node["amenity"]('+boundsString+');' +
      'way["amenity"]('+boundsString+');' +
      'relation["amenity"]('+boundsString+'););' +
      'out body;>;out skel qt;'
    const endpoint = overpassURL + query
    console.log(endpoint)
    axios.get(endpoint)
      .then(response => {
        console.log(response)
      })
  }

  handleGeolocation = () => {
    navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
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
            console.log(response.data)
          })
          .catch((err) => {
            console.log(err)
          })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render () {
    return (
      <div>
        <Map 
          style={{height: "100vh", width: "100vw"}}
          zoom={this.state.zoom}
          center={[this.state.lat, this.state.lng]}
          key={this.state.mapKey}
          onClick={this.getPosition}
          ref='map'
        >
          {/*
          <MarkerLayer
            markers={this.state.markers}
            longitudeExtractor={m => m.position.lng}
            latitudeExtractor={m => m.position.lat}
            markerComponent={CustomMarker}
            />
            */}
          <TileLayer
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Control position="bottomright" >
            <Button icon='my_location' floating  mini 
              onClick={this.handleGeolocation}
            />
          </Control>
        </Map>
      </div>
    )
  }
}

export default App;
