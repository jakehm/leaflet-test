import {LayerGroup} from 'react-leaflet'
import L from 'leaflet'
import LeafletOverpassLayer from 'leaflet-overpass-layer'

export default class OverpassLayer extends LayerGroup {
  constructor(props) {
    super(props)
    this.addLayer(props.map)
  }
  componentWillReceiveProps(nextProps) {
    this.addLayer(nextProps.map)
  }

  addLayer = (map) => {
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
    map.addLayer(opl)
  }
}
