import * as Three from 'three';
export default class MapBuilding extends Three.Mesh {
  customProp = 'customProp';
  isHover = false;
  constructor(object: Three.Mesh) {
    super(object.geometry, object.material);
  }
  onPointerOver() {
    this.material = new Three.MeshStandardMaterial({ color: 'red' });
  }
  onPointerOut() {
    this.material = new Three.MeshStandardMaterial({ color: 'white' });
  }
}
