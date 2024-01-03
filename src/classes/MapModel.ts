import * as Three from 'three';

import { MapGroupsTypes } from '@/interfaces/MapGroupsTypes';

export default class MapModel extends Three.Group {
  buildings: Three.Group = new Three.Group();
  nodes: Three.Group = new Three.Group();
  constructor(o: Three.Object3D) {
    super();
    this.add(o);
  }

  splitChildrenToGroups() {
    this.children.forEach((c: Three.Object3D) => {
      const cGroup = c as Three.Group;
      switch (cGroup.name) {
        case MapGroupsTypes.Buildings:
          this.buildings = cGroup;
          break;

        case MapGroupsTypes.Nodes:
          this.nodes = cGroup;
          break;
        default:
          break;
      }
    });
  }
}
