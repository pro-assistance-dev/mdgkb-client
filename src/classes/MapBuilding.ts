import * as Three from 'three';

export default class MapModel extends Three.Group {
  constructor(object: Three.Group) {
    super();
    const mutableThis = this as Mutable<MapModel>;
    Object.assign(mutableThis, object);
  }
}
