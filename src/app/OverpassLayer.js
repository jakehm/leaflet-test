import {LayerGroup} from 'react-leaflet'
import L from 'leaflet'
import LeafletOverpassLayer from 'leaflet-overpass-layer'

export default class OverpassLayer extends LayerGroup {
  componentWillReceiveProps(nextProps) {
    const bounds = nextProps.map.getBounds()
    console.log('inside of overpass layer cmpwillrecprops')
    console.log(bounds)
    const opl = new L.LeafletOverpassLayer({
      'query': '[out:json][timeout:25];'
        + '('
        + 'node["amenity"]({{bbox}});'
        + 'way["amenity"]({{bbox}});'
        + 'relation["amenity"]({{bbox}});'
        + ');'
        + 'out body;'
        + '>;'
        + 'out skel qt;'
    })
    nextProps.map.addLayer(opl)
  }
}
