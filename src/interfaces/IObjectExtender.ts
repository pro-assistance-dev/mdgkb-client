import { Object3D } from 'three';
export default interface IObjectExtender {
  extendObject(o: Object3D): void;
}
