import * as Three from 'three';
export default class BuildingModel extends Three.Mesh {
  customProp = 'customProp';
  isHover = false;
  constructor() {
    super();
    // this.add(object);
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
