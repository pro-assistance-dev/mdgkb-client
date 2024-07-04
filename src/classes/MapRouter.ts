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
  stepPoints: Three.Vector3[] = [];
  startMark?: Three.Mesh;
  endMark?: Three.Mesh;
  pointIdx = 0;
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

  // a = false;
  // curV = new Three.Vector3();
  needCount = true;
  from = new Three.Vector3();
  to = new Three.Vector3();
  curStep = new Three.Vector3();
  step = new Three.Vector3();
  len1 = 0;
  len2 = 0;

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.frameCount++;
    // if (this.frameCount % 5 !== 0) {
    //   return;
    // }
    if (!this.points[this.pointIdx + 1]) {
      this.pointIdx = 0;
    }
    if (this.needCount) {
      this.from = this.points[this.pointIdx];
      this.to = this.points[this.pointIdx + 1];

      this.curStep.set(this.from.x, this.from.y, this.from.z);
      this.step.set(this.to.x - this.from.x, this.to.y - this.from.y, this.to.z - this.from.z);

      this.len1 = this.step.length();
      const s = 80;
      this.step.set(this.step.x / this.len1 / s, this.step.y / this.len1 / s, this.step.z / this.len1 / s);
      this.needCount = false;
    }

    this.curStep.add(this.step);
    this.glow.position.set(this.curStep.x, this.curStep.y, this.curStep.z);
    const curS = new Three.Vector3(this.curStep.x, this.curStep.y, this.curStep.z);
    curS.set(this.to.x - curS.x, this.to.y - curS.y, this.to.z - curS.z);

    if (curS.length() < this.step.length()) {
      this.pointIdx++;
      this.frameCount = 0;
      this.needCount = true;
    }
  }

  getNodeGlow(color: string): Three.Mesh {
    const geometry = new Three.CylinderGeometry(0.03, 0.03, 0.02, 32);
    const material = new Three.MeshBasicMaterial({ color: color });
    const nodeGlow = new Three.Mesh(geometry, material);
    return nodeGlow;
  }

  add(routeLine: Three.Object3D, mark: Three.Mesh, points: Three.Vector3[]) {
    if (!this.engine) {
      return;
    }
    this.routeLine = routeLine;
    this.points = points;
    this.endMark = mark;
    this.engine.add(routeLine);
    this.engine.add(mark);

    if (this.points.length > 0) {
      const pos = this.endMark.position;
      const end = this.points[this.points.length - 1];
      // console.log(pos, this.points);

      if (pos.x !== end.x || pos.z !== end.z) {
        this.points = this.points.reverse();
      }
      // this.createStepPoints(10);
      this.glow = this.getNodeGlow(0x0aa249);
      this.glow.position.set(this.points[0].x, this.points[0].y, this.points[0].z);
      this.engine.add(this.glow);

      const sp = this.points[0];
      this.engine.core.camera.lookAt(this.points[1]);
      this.engine.core.camera.rotation.z = -3.1439050074902792;
      this.engine.core.camera.position.set(sp.x - 1, this.engine.core.camera.position.y, sp.z);
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
