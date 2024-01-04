import * as Three from 'three';
type CallbackFunction = (...args: unknown[]) => void | Promise<void>;
import { MapEventsTypes } from '@/interfaces/MapEventsTypes';
export default class BuildingModel extends Three.Mesh {
  customProp = 'customProp';
  isHover = false;
  isActive = false;
  constructor() {
    super();
    // this.add(object);
  }

  bindEvents(events: Map<MapEventsTypes, CallbackFunction>) {
    events.forEach((value, key) => {
      this.addEventListener(key, value.bind(this));
    });
  }

  onPointerOver() {
    if (this.name === 'Mesh30' || this.name === 'Mesh1' || this.name === 'Mesh146') {
      return;
    }
    this.click();
    this.material = new Three.MeshStandardMaterial({ color: 'red' });
  }
  onPointerOut() {
    this.material = new Three.MeshStandardMaterial({ color: 'white' });
  }

  click() {
    console.log(this);
    this.dispatchEvent({ type: 'buildingClick' as string as keyof Three.Object3DEventMap });
  }

  extendObject(c: BuildingModel) {
    c.customProp = this.customProp;
    c.isHover = this.isHover;
    c.onPointerOver = this.onPointerOver;
    c.onPointerOut = this.onPointerOut;
    c.click = this.click;
    c.bindEvents = this.bindEvents;
  }
}
