import * as Three from 'three';
import { Object3D } from 'three';

import { CallbackFunction } from '@/interfaces/elements/Callback';
import { MapBuildingsEventsTypes } from '@/interfaces/MapEventsTypes';
import { MapGroupsTypes } from '@/interfaces/MapGroupsTypes';

import BuildingModel from './BuildingModel';
import MapNode from './MapNode';

export default class MapModel extends Three.Group {
  buildings: Three.Group = new Three.Group();
  nodes: Three.Group = new Three.Group();

  constructor() {
    super();
  }

  extendObject(c: MapModel) {
    c.buildings = this.buildings;
    c.nodes = this.nodes;
    c.bindEvents = this.bindEvents;
    c.getBuildingsGroup = this.getBuildingsGroup;
    c.getBuildings = this.getBuildings;
    c.getNodes = this.getNodes;
    c.getNodesGroup = this.getNodesGroup;
    c.filterMesh = this.filterMesh;
  }

  getNodesGroup(): Object3D {
    return this.children.find((c: Object3D) => c.name === MapGroupsTypes.Points) as Object3D;
  }

  getNodes(): MapNode[] {
    return this.filterMesh(this.getNodesGroup().children) as MapNode[];
  }

  filterMesh(objects: Object3D[]): Object3D[] {
    return objects.filter((o: Object3D) => o.type !== 'Mesh');
  }

  getBuildingsGroup(): Object3D {
    return this.children.find((c: Object3D) => c.name === MapGroupsTypes.Buildings) as Object3D;
  }

  getBuildings(): BuildingModel[] {
    return this.filterMesh(this.getBuildingsGroup().children) as BuildingModel[];
  }

  bindEvents(buildingsEvents: Map<MapBuildingsEventsTypes, CallbackFunction>): void {
    this.getBuildings().forEach((b: BuildingModel) => {
      b.bindEvents(buildingsEvents);
    });
    console.log(this.getBuildings());
  }

  private fillNodesNeighbors() {
    const nodes = this.getNodes();

    nodes.forEach((n: MapNode) => n.splitNameToNeighbors());

    nodes.forEach((n: MapNode) => {
      n.neighborsNames.forEach((neighborName: string) => {
        const neighbor = nodes.find((node: MapNode) => node.mapNodeName === neighborName);
        if (neighbor) {
          n.neighbors.push(neighbor);
        }
      });
    });
  }
}
