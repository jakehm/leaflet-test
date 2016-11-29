import { MapControl } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet-geocoder-mapzen'

export default class SearchBox extends MapControl {

  componentWillMount () {
    const options = {
      focus: true,
      position: 'topright',
      attribution: null
    }
    const searchBox = L.control.geocoder('mapzen-mNEwdS8', options)
    this.leafletElement = searchBox
  }
}
