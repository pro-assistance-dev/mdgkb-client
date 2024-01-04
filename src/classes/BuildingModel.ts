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
      console.log(value, key);
      this.addEventListener(key, value.bind(this));
    });
  }

  onPointerOver() {
    this.click();
    this.material = new Three.MeshStandardMaterial({ color: 'red' });
  }
  onPointerOut() {
    this.material = new Three.MeshStandardMaterial({ color: 'white' });
  }

  click() {
    console.log(this);
    this.hasEventListener(MapEventsTypes.BuildingClick as string as keyof Three.Object3DEventMap, () => {
      console.log(111);
    });
    // this.dispatchEvent({ type: MapEventsTypes.BuildingClick as string as keyof Three.Object3DEventMap });
    this.dispatchEvent({ type: MapEventsTypes.BuildingClick as string as keyof Three.Object3DEventMap });
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
