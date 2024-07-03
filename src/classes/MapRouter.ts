import IStartEndNode from '@/interfaces/IStartEndNode';
import { defineEmits } from 'vue';
import SearchElement from './SearchElement';

import Engine3D from '@/classes/Engine3D';
import * as Three from 'three';

export default class MapRouter {
  engine?: Engine3D;
  startNodeName = '';
  endNodeName = '';

  startObjectName = '';
  endObjectName = '';

  interfaceOpened = false;

  selectedStartMode = false;
  selectedEndMode = false;

  routeLine?: Three.Object3D;
  points: Three.Vector3[] = [];
  startMark?: Three.Mesh;
  endMark?: Three.Mesh;
  count = 0;
  frameCount = 0;
  glow?: Three.Mesh;

  constructor(engine: Engine3D) {
    this.engine = engine;
  }

  catBuildNode(): boolean {
    return !!this.startNodeName && !!this.endNodeName;
  }

  drop() {
    if (!this.engine) {
      return;
    }
    this.engine.remove(this.routeLine);
    this.engine.remove(this.endMark);
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    if (this.routeLine) {
      this.routeLine.rotation.x += 0.01;
    }

    this.frameCount++;
    if (this.frameCount % 10 != 0) {
      return;
    }
    console.log(this.frameCount);

    this.count--;
    if (this.count < 0) {
      this.count = this.points.length - 1;
      this.frameCount = 0;
    }

    const p = this.points[this.count];
    this.glow.position.set(p.x, p.y, p.z);
  }

  getNodeGlow(color: string): Three.Mesh {
    const geometry = new Three.CylinderGeometry(0.1, 0.1, 0.32, 32);
    const material = new Three.MeshBasicMaterial({ color: color });
    const nodeGlow = new Three.Mesh(geometry, material);
    // nodeGlow.position.set(point.x, point.y, point.z);
    return nodeGlow;
  }

  add(routeLine: Three.Object3D, mark: Three.Mesh, points: Three.Vector3[]) {
    if (!this.engine) {
      return;
    }
    this.routeLine = routeLine;
    this.points = points;
    this.count = points.length;
    this.endMark = mark;

    this.engine.add(routeLine);
    this.engine.add(mark);

    if (this.points.length > 0) {
      this.glow = this.getNodeGlow(0x000000);
      this.engine.add(this.glow);

      this.animate();
    }
  }

  getNodesForRequest(): IStartEndNode {
    return { startNodeId: this.startNodeName, endNodeId: this.endNodeName };
  }

  selectStart(objectName: string, nodeName: string) {
    this.startNodeName = nodeName;
    this.startObjectName = objectName;
  }

  selectEnd(objectName: string, nodeName: string) {
    this.endNodeName = nodeName;
    this.endObjectName = objectName;
    // if (this.emit) {
    //   this.emit('buildRoute');
    // }
  }

  selectSearch(event: SearchElement) {
    const { label: objectName, value: nodeName } = event;
    this.getSelectFn()(objectName, nodeName);
  }

  private getSelectFn() {
    return this.selectedStartMode ? this.selectStart : this.selectEnd;
  }

  close() {
    this.interfaceOpened = false;
  }

  open() {
    this.interfaceOpened = true;
  }
  openSelectStartInterface() {
    this.selectedStartMode = true;
    this.selectedEndMode = false;
  }
  openSelectEndInterface() {
    this.selectedStartMode = false;
    this.selectedEndMode = true;
  }
  searchCanOpen(): boolean {
    return this.selectedStartMode || this.selectedEndMode;
  }
}
