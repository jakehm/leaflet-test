import React from 'react'
import 'react-toolbox/lib/commons.scss'
import { Map, TileLayer } from 'react-leaflet'
import { Button, IconButton } from 'react-toolbox/lib/button';

class App extends React.Component {
  state = {
    zoom: 13,
    lat: 51.505,
    lng: -0.09
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

  render () {
    const fabStyle = {
      margin: 0,
      top: 'auto',
      right: 20,
      bottom: 20,
      left: 'auto',
      position: 'fixed',
      zIndex: 10
    };
    const position = [this.state.lat, this.state.lng]
    return (
      <div>
        <Map 
          style={{height: "100vh", width: "100vw"}}
          zoom={this.state.zoom}
          center={position}
        >
          <TileLayer
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
        </Map> 
        <IconButton icon='my location' 
          style={fabStyle}
        />
      </div>
    )
  }
}

export default App;
