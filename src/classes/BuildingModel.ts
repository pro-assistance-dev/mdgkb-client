import * as Three from 'three';
type CallbackFunction = (...args: unknown[]) => void | Promise<void>;
import { Mesh, Object3D } from 'three';

import { MapBuildingsEventsTypes } from '@/interfaces/MapEventsTypes';
export default class BuildingModel extends Three.Mesh {
  customProp = 'customProp';
  isHoverable = true;
  isClickable = true;
  isActive = false;
  number = '';
  buildingId = '';
  displayLines = true;
  conditionalLines = true;
  standartMaterial?: Three.Material | Three.Material[];
  constructor() {
    super();

    this.standartMaterial = this.material;
    // this.add(object);
  }

  bindEvents(events: Map<MapBuildingsEventsTypes, CallbackFunction>) {
    events.forEach((value, key) => {
      const mesh = this.getMesh();
      if (mesh) {
        mesh.addEventListener(key, value.bind(this));
      }
      // this.addEventListener(key, value.bind(this));
    });
  }

  setNumber(): void {
    this.number = this.name.split('_')[1];
    this.buildingId = this.name.split('_').slice(2).join('-');
  }

  getMesh(): Mesh {
    return this.children.find((c: Object3D) => c.type === 'Mesh') as Mesh;
  }

  onPointerClick() {
    this.click();
    this.material = new Three.MeshStandardMaterial({ color: 'green' });
  }
  onPointerOver() {
    this.standartMaterial = this.material;
    this.material = new Three.MeshStandardMaterial({ color: 'red' });
    document.body.style.cursor = 'pointer';
  }

  onPointerOut() {
    this.material = this.standartMaterial ?? this.material;
    document.body.style.cursor = 'auto';
  }

  click() {
    console.log(this.parent);

    this.dispatchEvent({
      type: MapBuildingsEventsTypes.Click as string as keyof Three.Object3DEventMap,
      id: (this.parent as BuildingModel).buildingId as string,
    } as Three.BaseEvent<keyof Three.Object3DEventMap>);
  }

  extendObject(object3D: Object3D) {
    const c = object3D as BuildingModel;

    c.getMesh = this.getMesh;

    const mesh = c.getMesh() as BuildingModel;

    if (mesh) {
      mesh.onPointerOver = this.onPointerOver;
      mesh.onPointerOut = this.onPointerOut;
      // mesh.isHoverable = this.isHoverable;
      mesh.onPointerClick = this.onPointerClick;
      mesh.click = this.click;
    }

    c.click = this.click;
    c.bindEvents = this.bindEvents;

    c.setNumber = this.setNumber;
    c.number = this.number;
    c.buildingId = this.buildingId;
    c.setNumber();
    this.standartMaterial = this.material;
    c.standartMaterial = this.material;
  }
}
