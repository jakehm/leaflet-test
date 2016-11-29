import { MapComponent } from 'react-leaflet'
import L from 'leaflet'
import Mapzen from 'mapzen.js'
import React from 'react'

export default class SearchBox extends React.Component {

  componentWillMount () {
    super.componentWillMount()
    const geocoder = L.Mapzen.geocoder('mapzen-mNEwdS8')
    geocoder.addTo(this.props.map)
  }

  render () {
    return null
  }
}