import * as Three from 'three';
type CallbackFunction = (...args: unknown[]) => void | Promise<void>;
import { MapEventsTypes } from '@/interfaces/MapEventsTypes';
export default class BuildingModel extends Three.Mesh {
  customProp = 'customProp';
  isHover = false;
  constructor() {
    super();
    // this.add(object);
  }

  bindEvents(events: Map<MapEventsTypes, CallbackFunction>) {
    events.forEach((value, key) => {
      this.addEventListener(key, value);
    });
  }

  onPointerOver() {
    this.material = new Three.MeshStandardMaterial({ color: 'red' });
  }
  onPointerOut() {
    this.material = new Three.MeshStandardMaterial({ color: 'white' });
  }
  extendObject(c: BuildingModel) {
    c.customProp = this.customProp;
    c.isHover = this.isHover;
    c.onPointerOver = this.onPointerOver;
    c.onPointerOut = this.onPointerOut;
  }
}
