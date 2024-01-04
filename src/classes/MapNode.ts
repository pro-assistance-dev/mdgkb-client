import { Object3D } from 'three';

import ClassHelper from '@/services/ClassHelper';

export default class MapNode extends Object3D {
  isEntry?: string;
  neighbors: MapNode[] = [];
  neighborsUuid: string[] = [];

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
  }
}
