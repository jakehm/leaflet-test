import React from 'react'
import 'react-toolbox/lib/commons.scss'
import { Map, TileLayer } from 'react-leaflet'
import Control from 'react-leaflet-control'
import { Button, IconButton, Snackbar } from 'react-toolbox';
import snackbarTheme from './snackbarTheme.scss'

class App extends React.Component {
  state = {
    zoom: 13,
    lat: 51.505,
    lng: -0.09,
    mapKey: Math.random(),
    snackbarActive: false
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
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            mapKey: Math.random()
          })
        }, (err) => {
          this.setState({snackbarActive: true})
        }
      )
    } else {
      this.setState({snackbarActive: true})
    }
  }

  handleSnackbarToggle = () => {
    this.setState({snackbarActive: !this.state.snackbarActive})
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
        <div style={{
          zIndex: 99999999,
          position: 'absolute',
          left: 0,
          top: 90
        }}>
          <button>hi </button>
        <Snackbar
          theme={snackbarTheme}
          action='Dismiss'
          active={this.state.snackbarActive}
          icon='my_location'
          label='Geolocation is not enabled on your device.'
          timeout={2000}
          onClick={this.handleSnackbarToggle}
          onTimeout={this.handleSnackbarToggle}
          type='warning'
        />
      </div>
      </div>
    )
  }
}

export default App;
