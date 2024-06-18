import IStartEndNode from '@/interfaces/IStartEndNode';
import { defineEmits } from 'vue';
import SearchElement from './SearchElement';

import * as Three from 'three';

export default class MapRouter {
  startNodeName = '';
  endNodeName = '';

  startObjectName = '';
  endObjectName = '';

  interfaceOpened = false;

  selectedStartMode = false;
  selectedEndMode = false;

  routeLine?: Three.Object3D;
  startMark?: Three.Mesh;
  endMark?: Three.Mesh;

  emit = defineEmits(['close', 'buildRoute']);

  catBuildNode(): boolean {
    return !!this.startNodeName && !!this.endNodeName;
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
    if (this.emit) {
      this.emit('buildRoute');
    }
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
    console.log(false);
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
