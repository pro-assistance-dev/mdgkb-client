import * as Three from 'three';
import { Object3D, Scene, Vector3 } from 'three';
// import {TextGeometry} from 'three-addons'
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

import { CallbackFunction } from '@/interfaces/elements/Callback';
import { MapBuildingsEventsTypes } from '@/interfaces/MapEventsTypes';
import { MapGroupsTypes } from '@/interfaces/MapGroupsTypes';

import BuildingModel from './BuildingModel';
import MapExtender from './MapExtender';
import MapNode from './MapNode';
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
      const edges = new Three.EdgesGeometry(b.getMesh().geometry);
      const line = new Three.LineSegments(edges, new Three.LineBasicMaterial({ color: 0x838385 }));
      line.scale.set(0.01, 0.01, 0.01);
      scene.add(line);
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
        const neighbor = nodes.find((node: MapNode) => node.mapNodeName === neighborName);
        if (neighbor) {
          n.neighbors.push(neighbor);
        }
      });
    });
  }

  getRouteVector(route: MapRoute): Vector3[] {
    const worldPosition = new Three.Vector3();
    const nodes = this.getNodes();
    const points: Three.Vector3[] = [];

    route.mapRouteNodes.forEach((m: MapNode) => {
      const findedNode = nodes.find((n: MapNode) => n.mapNodeName === m.mapNodeName);
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

  getMark(nodeName: string): Three.Mesh | undefined {
    const geometry = new Three.BoxGeometry(0.1, 0.1, 0.1);
    const material = new Three.MeshBasicMaterial({ color: 0x00ff00 });
    const mark = new Three.Mesh(geometry, material);

    const node = this.findNode(nodeName);
    if (!node) {
      return;
    }

    const pos = node.getPosition();
    mark.position.set(pos.x, pos.y + 0.1, pos.z);
    const label = createDiv();
    mark.add(label);

    console.log(mark);
    return mark;
  }
}
const createDiv = (): any => {
  const earthDiv = document.createElement('div');
  earthDiv.className = 'label';
  earthDiv.textContent = 'Вы здеся';

  // earthDiv.style.backgroundColor = 'transparent';

  const earthLabel = new CSS2DObject(earthDiv);
  earthLabel.position.set(0, 0.1, 0);
  earthLabel.center.set(0, 1);
  return earthLabel;
};
