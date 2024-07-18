import MapRoute from '@/classes/MapRoute';
import IStartEndNode from '@/interfaces/IStartEndNode';
import BaseStore from '@/services/BaseStore';
import HttpClient from '@/services/HttpClientS';

class S extends BaseStore<MapRoute> {
  constructor() {
    super(MapRoute, 'map-nodes');
  }
  async GetRoute(nodes: IStartEndNode): Promise<void> {
    const route = await HttpClient.Get<MapRoute>({ query: this.getUrl(`${nodes.startNodeId}/${nodes.endNodeId}`) });
    this.Set(route);
  }
}

const store: S = new S();
export default store;
