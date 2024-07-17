import MapNodeRequestObject from '@/classes/MapNodeRequestObject';
import BaseStore from '@/services/BaseStore';
import HttpClient from '@/services/HttpClientS';
class S extends BaseStore<MapNodeRequestObject> {
  constructor() {
    super(MapNodeRequestObject, 'map-nodes');
  }
  async Upload(nodes: MapNodeRequestObject): Promise<void> {
    const route = await HttpClient.Post<MapNodeRequestObject, MapNodeRequestObject>({ query: `upload`, payload: nodes });
    this.Set(route);
  }
}

const store: S = new S();
export default store;
