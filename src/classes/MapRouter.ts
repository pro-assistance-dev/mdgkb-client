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
  count = 0;
  frameCount = 0;
  glow?: Three.Mesh;

  constructor(engine: Engine3D) {
    this.engine = engine;
  }

  createStepPoints(step: number) {
    if (this.points.length > 0) {
      for (let i = 0; i < this.points.length - 1; i++) {
        const subPoint: Three.Vector3 = this.points[i];
        this.stepPoints.push(subPoint);
        var dist = Math.sqrt(
          (this.points[i + 1].x - this.points[i].x) * (this.points[i + 1].x - this.points[i].x) +
            (this.points[i + 1].y - this.points[i].y) * (this.points[i + 1].y - this.points[i].y) +
            (this.points[i + 1].z - this.points[i].z) * (this.points[i + 1].z - this.points[i].z)
        );
        const nVectorX = (this.points[i + 1].x - this.points[i].x) / dist;
        const nVectorY = (this.points[i + 1].y - this.points[i].y) / dist;
        const nVectorZ = (this.points[i + 1].z - this.points[i].z) / dist;
        var localDist = dist;
        while (localDist > step / 100) {
          console.log(localDist);
          this.stepPoints.push(
            new Three.Vector3(
              this.points[i].x + (step / 100) * nVectorX,
              this.points[i].y + (step / 100) * nVectorY,
              this.points[i].z + (step / 100) * nVectorZ
            )
          );
          localDist = localDist - step / 100;
        }
        console.log(this.stepPoints);
      }
    }
    return this.stepPoints;
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

    this.frameCount++;
    if (this.frameCount % 20 != 0) {
      return;
    }
    // console.log(this.frameCount);

    this.count--;
    if (this.count < 0) {
      this.count = this.points.length - 1;
      this.frameCount = 0;
    }

    const p = this.points[this.count];

    this.glow.position.set(p.x, p.y, p.z);
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
    this.count = points.length;
    this.endMark = mark;

    this.engine.add(routeLine);
    this.engine.add(mark);
    this.createStepPoints(10);

    if (this.points.length > 0) {
      this.glow = this.getNodeGlow(0x0aa249);
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
