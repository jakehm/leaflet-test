import {LayerGroup} from 'react-leaflet'
import L from 'leaflet'
import LeafletOverpassLayer from 'leaflet-overpass-layer'

export default class OverpassLayer extends LayerGroup {
  componentWillReceiveProps(nextProps) {
    const opl = new L.LeafletOverpassLayer({
      'query': '(node({{bbox}})[organic];node({{bbox}})[second_hand];);out qt;'
    })
    nextProps.map.addLayer(opl)
  }
}