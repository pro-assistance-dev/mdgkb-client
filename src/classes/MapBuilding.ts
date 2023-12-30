import * as Three from 'three';
import { MeshStandardMaterial } from 'three';
export default class MapBuilding extends Three.Mesh {
  customProp = 'customProp';
  constructor(object: Three.Mesh) {
    super(object.geometry, object.material);
  }
  onPointerOver() {
    console.log('move');

    (this.material as MeshStandardMaterial).color.set('red');
  }
  onPointerOut() {
    (this.material as MeshStandardMaterial).color.set('white');
  }
}
