import {LayerGroup} from 'react-leaflet'
import L from 'leaflet'
import LeafletOverpassLayer from 'leaflet-overpass-layer'

export default class OverpassLayer extends LayerGroup {
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.id)
    console.log('OverpassLayer receiving props')
    const query = '('
      + 'node["amenity"]({{bbox}});'
      + 'way["amenity"]({{bbox}});'
      + 'relation["amenity"]({{bbox}});'
      + ');'
      + 'out body;'
      + '>;'
      + 'out skel qt;'

    const opl = new L.OverPassLayer({
      'query': query,
      'endPoint': 'https://overpass-api.de/api/',
    })
    nextProps.map.addLayer(opl)
  }
}
