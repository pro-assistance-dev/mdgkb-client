import * as Three from 'three';
import { Mesh, Object3D, Scene } from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

import MapBuilding from './MapBuilding';
export default class FbxModel {
  static AddObjectToScene(modelPath: string, scene: Scene) {
    let o;
    new FBXLoader().load(
      modelPath,
      (object) => {
        // @ts-ignore
        FbxModel.HandleObject(object as Mesh, scene);
      },
      FbxModel.HandleXHR,
      FbxModel.HandleError
    );
    return o;
  }

  static HandleObject(object: Mesh, scene: Scene) {
    // object = new MapBuilding(object);
    object.traverse(function (child: Object3D) {
      const childU = new MapBuilding(child as Mesh);
      (child as MapBuilding).onPointerOver = childU.onPointerOver;
      if ((child as Three.Mesh).isMesh) {
        // (child as Three.Mesh).material = material;
        if ((child as Three.Mesh).material) {
          ((child as Three.Mesh).material as Three.MeshBasicMaterial).transparent = false;
        }
      }
      return child;
    });

    object.scale.set(0.01, 0.01, 0.01);
    scene.add(object);
  }
  static HandleXHR(xhr: ProgressEvent) {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
  }
  static HandleError(error: unknown) {
    console.log(error);
  }
}
