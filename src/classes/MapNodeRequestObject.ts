import MapNode from '@/classes/MapNode';
export default class MapNodeRequestObject {
  id?: string;
  isEntry = true;
  name = '';
  neighborsNames: string[] = [];

  constructor(i?: MapNode) {
    if (!i) {
      return;
    }
    this.name = i?.mapNodeName;
    this.neighborsNames = i.neighborsNames;
  }
}
