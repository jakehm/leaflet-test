import L from 'leaflet'
import 'leaflet-routing-machine'
import {MapLayer} from 'react-leaflet'

export default class Router extends MapLayer {
  componentWillMount () {
    console.log('inside router')
    super.componentWillMount()
    const {map , position, destination} = this.props
    console.log('inside router will receive props')
    L.Routing.control({
      waypoints: [
        position,
        destination
      ]
    }).addTo(map)
  }

  render() {
    return null
  }
}