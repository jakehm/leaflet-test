require('./AnimatedMarker')
import { MapComponent } from 'react-leaflet'
import L from 'leaflet'

export default class AnimatedMarkerElement extends MapComponent {

  componentWillMount () {
    const line = L.polyline(this.props.route.coordinates)
    this.animatedMarker = L.animatedMarker(line.getLatLngs())
    this.props.map.addLayer(this.animatedMarker)
  }

  componentWillReceiveProps (nextProps) {
    nextProps.map.removeLayer(this.animatedMarker)

    const line = L.polyline(nextProps.route.coordinates)
    this.animatedMarker = L.animatedMarker(line.getLatLngs())
    nextProps.map.addLayer(this.animatedMarker)
  }

  render () {
    return null
  }
}
