require('./AnimatedMarker')
import { Marker } from 'react-leaflet'
import L from 'leaflet'

export default class AnimatedMarkerElement extends MapComponent {

  componentWillMount () {
    const line = L.polyline([this.props.route.coordinates]),
      animatedMarker = L.animatedMarker(line.getLatLngs())

    console.log('in componentWillMount')
    this.props.map.addLayer(animatedMarker)
  }
}