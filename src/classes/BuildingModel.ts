import * as Three from 'three';
type CallbackFunction = (...args: unknown[]) => void | Promise<void>;
import { Mesh, Object3D } from 'three';

import { MapBuildingsEventsTypes } from '@/interfaces/MapEventsTypes';
export default class BuildingModel extends Three.Mesh {
  customProp = 'customProp';
  isHoverable = true;
  isClickable = true;
  isActive = false;

  constructor() {
    super();
    // this.add(object);
  }

  bindEvents(events: Map<MapBuildingsEventsTypes, CallbackFunction>) {
    events.forEach((value, key) => {
      this.addEventListener(key, value.bind(this));
    });
  }

  getMesh(): Mesh {
    return this.children.find((c: Object3D) => c.type === 'Mesh') as Mesh;
  }

  onPointerClick() {
    this.click();
    this.material = new Three.MeshStandardMaterial({ color: 'green' });
  }
  onPointerOver() {
    this.material = new Three.MeshStandardMaterial({ color: 'red' });
  }

  onPointerOut() {
    this.material = new Three.MeshStandardMaterial({ color: 'white' });
  }

  click() {
    this.dispatchEvent({
      type: MapBuildingsEventsTypes.Click as string as keyof Three.Object3DEventMap,
      id: '81299614-b64f-4ba7-9cfa-3210569a1909',
    } as Three.BaseEvent<keyof Three.Object3DEventMap>);
  }

  extendObject(object3D: Object3D) {
    const c = object3D as BuildingModel;
    c.getMesh = this.getMesh;

    const mesh = c.getMesh() as BuildingModel;

    if (mesh) {
      mesh.onPointerOver = this.onPointerOver;
      mesh.onPointerOut = this.onPointerOut;
      mesh.isHoverable = this.isHoverable;
      mesh.onPointerClick = this.onPointerClick;
      mesh.click = this.click;
    }

    c.isHoverable = this.isHoverable;
    c.customProp = this.customProp;
    c.isClickable = this.isClickable;
    c.onPointerOver = this.onPointerOver;
    c.onPointerOut = this.onPointerOut;
    c.onPointerClick = this.onPointerClick;
    c.click = this.click;
    c.bindEvents = this.bindEvents;
  }
}
