import { Object3D } from 'three';

import ClassHelper from '@/services/ClassHelper';

export default class MapNode extends Object3D {
  isEntry?: string;
  mapNodeName = '';
  neighbors: MapNode[] = [];
  neighborsUuid: string[] = [];
  neighborsNames: string[] = [];

  constructor(i?: MapNode) {
    super();
    ClassHelper.BuildClass(this, i);
  }

  static GetClassName(): string {
    return 'mapNode';
  }

  extendObject(object3D: Object3D) {
    const c = object3D as MapNode;
    c.isEntry = this.isEntry;
    c.neighbors = this.neighbors;
    c.neighborsUuid = this.neighborsUuid;
    c.splitNameToNeighbors = this.splitNameToNeighbors;
    c.splitNameToNeighbors();
  }

  splitNameToNeighbors() {
    const names = this.name.split('_').splice(0, 1);
    if (names[0]) {
      this.mapNodeName = names[0];
    }
    if (names.length > 1) {
      this.neighborsNames.push(...names.splice(1));
    }
  }
}
