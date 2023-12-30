import * as Three from 'three';
import { Object3D, Scene } from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
export default class FbxModel {
  static AddObjectToScene(modelPath: string, scene: Scene) {
    let o;
    new FBXLoader().load(
      modelPath,
      (object) => {
        FbxModel.HandleObject(object, scene);
      },
      FbxModel.HandleXHR,
      FbxModel.HandleError
    );
    return o;
  }

  static HandleObject(object: Object3D, scene: Scene) {
    object.traverse(function (child: Object3D) {
      if ((child as Three.Mesh).isMesh) {
        // (child as Three.Mesh).material = material;
        if ((child as Three.Mesh).material) {
          ((child as Three.Mesh).material as Three.MeshBasicMaterial).transparent = false;
        }
      }
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
