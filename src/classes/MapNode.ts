import { Mesh, Object3D, Vector3 } from 'three';

import ClassHelper from '@/services/ClassHelper';

export default class MapNode extends Object3D {
  isEntry?: string;
  mapNodeName = '';
  neighbors: MapNode[] = [];
  neighborsUuid: string[] = [];
  neighborsNames: string[] = [];

  constructor(i?: MapNode) {
    super();
    ClassHelper.BuildClass(this, i);
  }

  static GetClassName(): string {
    return 'mapNode';
  }

  extendObject(object3D: Object3D) {
    const c = object3D as MapNode;
    c.isEntry = this.isEntry;
    c.neighbors = [];
    c.neighborsUuid = this.neighborsUuid;
    c.splitNameToNeighbors = this.splitNameToNeighbors;
    c.neighborsNames = [];
    c.getMesh = this.getMesh;
    c.getGeometryVector = this.getGeometryVector;
    c.scaleVector = this.scaleVector;
    c.getPosition = this.getPosition;
  }

  splitNameToNeighbors() {
    const names = this.name.split('_').slice(1);
    if (names[0]) {
      this.mapNodeName = names[0];
    }
    if (names.length > 1) {
      const neighborsNumbers = names.splice(1);

      if (this.name === 'Node_40_39_41') {
        console.log(neighborsNumbers);
      }
      this.neighborsNames.push(...neighborsNumbers);
    }
    if (this.name === 'Node_40_39_41') {
      console.log(this);
    }
  }

  getMesh(): Mesh {
    return this.children.find((c: Object3D) => c.type === 'Mesh') as Mesh;
  }

  getGeometryVector(): Vector3 {
    return this.getMesh().geometry.boundingSphere?.center as Vector3;
    // this.getMesh().geometry.boundingBox?.min as Vector3;
  }

  scaleVector(vector: Vector3) {
    const scale = 100;
    if (!vector) {
      return;
    }
    vector.x = vector.x / scale;
    vector.y = vector.y / scale;
    vector.z = vector.z / scale;
  }

  getPosition(): Vector3 {
    const vector = this.getGeometryVector();
    this.scaleVector(vector);
    console.log(this);
    return vector;
  }
}
