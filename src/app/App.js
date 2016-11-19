import React from 'react'
import 'react-toolbox/lib/commons.scss'
import { Map, TileLayer } from 'react-leaflet'
import Control from 'react-leaflet-control'
import { Button, IconButton } from 'react-toolbox';

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

  render () {
    return (
      <div>
        <Map 
          style={{height: "100vh", width: "100vw"}}
          zoom={this.state.zoom}
          center={[this.state.lat, this.state.lng]}
          key={this.state.mapKey}
        >
          <TileLayer
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            zIndex={0}
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
