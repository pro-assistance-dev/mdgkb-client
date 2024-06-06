import * as Three from 'three';
import { Object3D, Scene, Vector3 } from 'three';

// import {TextGeometry} from 'three-addons'
import { CallbackFunction } from '@/interfaces/elements/Callback';
import { MapBuildingsEventsTypes } from '@/interfaces/MapEventsTypes';
import { MapGroupsTypes } from '@/interfaces/MapGroupsTypes';

import BuildingModel from './BuildingModel';
import MapExtender from './MapExtender';
import MapNode from './MapNode';
import MapPainter from './MapPainter';
import MapRoute from './MapRoute';

export default class MapModel extends Three.Group {
  buildings: Three.Group = new Three.Group();
  nodes: Three.Group = new Three.Group();

  constructor() {
    super();
  }

  setup(events: Map<MapBuildingsEventsTypes, CallbackFunction>, scene: Scene): void {
    new MapExtender().extendObject(this);
    this.bindEvents(events);
    this.fillNodesNeighbors();
    this.decorate(scene);
  }

  decorate(scene: Scene): void {
    this.getBuildings().forEach((b: BuildingModel) => {
      scene.add(MapPainter.GetEdge(b));
    });
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
    c.fillNodesNeighbors = this.fillNodesNeighbors;
    c.getRouteVector = this.getRouteVector;
    c.setup = this.setup;
    c.decorate = this.decorate;
    c.getMark = this.getMark;
    c.findNode = this.findNode;
  }

  getNodesGroup(): Object3D {
    return this.children.find((c: Object3D) => c.name === MapGroupsTypes.Nodes) as Object3D;
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
  }

  fillNodesNeighbors() {
    const nodes = this.getNodes();

    nodes.forEach((n: MapNode) => n.splitNameToNeighbors());
    nodes.forEach((n: MapNode) => {
      n.neighborsNames.forEach((neighborName: string) => {
        const neighbor = this.findNode(neighborName);
        if (neighbor) {
          n.neighbors.push(neighbor);
        }
      });
    });
  }

  getRouteVector(route: MapRoute): Vector3[] {
    const worldPosition = new Three.Vector3();
    const points: Three.Vector3[] = [];

    route.mapRouteNodes.forEach((m: MapNode) => {
      const findedNode = this.findNode(m.mapNodeName);
      if (findedNode) {
        findedNode.worldToLocal(worldPosition);
        points.push(findedNode.getPosition());
      }
    });

    return points;
  }

  findNode(nodeName: string): MapNode | undefined {
    return this.getNodes().find((n: MapNode) => n.mapNodeName === nodeName);
  }

  getMark(nodeName: string, start: boolean, color: string): Three.Mesh | undefined {
    const pos = this.findNode(nodeName)?.getPosition();
    if (!pos) {
      return;
    }
    const mark = MapPainter.GetMark(color);
    mark.position.set(pos.x, pos.y + 0.4, pos.z);

    const label = MapPainter.GetLabel(start ? 'Вы здесь' : 'Вам сюда');
    mark.add(label);

    return mark;
  }
}
