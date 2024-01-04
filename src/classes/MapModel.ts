import * as Three from 'three';

import { MapGroupsTypes } from '@/interfaces/MapGroupsTypes';

export default class MapModel extends Three.Group {
  buildings: Three.Group = new Three.Group();
  nodes: Three.Group = new Three.Group();
  constructor() {
    super();
  }

  extendObject(c: MapModel) {
    c.buildings = this.buildings;
    c.nodes = this.nodes;
    c.splitChildrenToGroups = this.splitChildrenToGroups;
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
