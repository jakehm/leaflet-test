import { MapControl } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet-geocoder-mapzen'
require('leaflet-geocoder-mapzen/dist/leaflet-geocoder-mapzen.css')

export default class SearchBox extends MapControl {

  componentWillMount () {
    const options = {
      focus: true,
      position: 'topright',
      attribution: null
    }
    const searchBox = L.control.geocoder('mapzen-mNEwdS8', options)
    searchBox.on('select', e => {
      this.props.onSelect(e);
    })
    this.leafletElement = searchBox
  }
}
