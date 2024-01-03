import * as Three from 'three';

import BuildingModel from './BuildingModel';

export default class MapModel extends Three.Group {
  buildingHovered = false;
  constructor(o: Three.Object3D) {
    super();
    this.add(o);
    this.wrapBuildings();
  }

  buildingHover() {
    this.buildingHovered = true;
  }

  private wrapBuildings() {
    const b = new BuildingModel();
    const c = this.getMapObject().children;
    c.forEach((cc, i) => {
      b.extendObject(c[i] as BuildingModel);
    });
    // console.log(c.length);

    // this.children[0].children.forEach((c: Three.Object3D, i: number, a: Three.Object3D[]) => {
    //   // @ts-ignore
    //   if (!c.isGroup) {
    //     return;
    //   }
    //   const bb = new BuildingModel(c);
    //   this.children[0].children[i] = bb;
    //   // c.add(bb);
    //   // b.push(bb);
    //   // return new BuildingModel(c);
    // });
    // this.children = this.mapObject.children.map((c: Three.Object3D) => {
    //   // @ts-ignore
    //   return new BuildingModel(c);
    // });
  }

  getMapObject(): Three.Object3D {
    return this.children[0];
  }
}
