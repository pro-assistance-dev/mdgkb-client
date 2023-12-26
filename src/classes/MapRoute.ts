import MapNode from '@/classes/MapNode';
import ClassHelper from '@/services/ClassHelper';

export default class MapRoute {
  id?: string;
  name?: string;
  startNodeId?: MapNode;
  startNode?: string;
  endNodeId?: MapNode;
  endNode?: string;
  nodes: MapNode[] = [];

  constructor(i?: MapNode) {
    ClassHelper.BuildClass(this, i);
  }

  static GetClassName(): string {
    return 'mapRoute';
  }
}
