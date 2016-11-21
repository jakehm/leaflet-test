import React from 'react'
import 'react-toolbox/lib/commons.scss'
import { Map, TileLayer } from 'react-leaflet'
import Control from 'react-leaflet-control'
import { Button, IconButton } from 'react-toolbox';
import axios from 'axios'
import OverpassLayer from './OverpassLayer'

class App extends React.Component {
  state = {
    zoom: 13,
    lat: 51.505,
    lng: -0.09,
    mapKey: Math.random(),
  }

  componentDidMount () {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      }
    )
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
    const endpoint = `http://nominatim.openstreetmap.org/reverse?\
      format=json&lat=${e.latlng.lat}&lon=${e.latlng.lng}&zoom=18&addressdetails=1`
    axios.get(endpoint)
      .then((response) => {
        const address = response.data.display_name.split(' ').join('+')        
        const searchEndpoint = `http://nominatim.openstreetmap.org/search?q=${address}&format=json&polygon=1&addressdetails=1`
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
        >
          <TileLayer
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Control position="bottomright" >
            <Button icon='my_location' floating  mini 
              onClick={this.handleGeolocation}
            />
          </Control>
          <OverpassLayer />
        </Map>
      </div>
    )
  }
}

export default App;
