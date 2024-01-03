import { Object3D, Scene } from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

import BuildingModel from './BuildingModel';
export default class FbxModel {
  static async AddObjectToScene(modelPath: string, scene: Scene) {
    const loader = new FBXLoader();
    const data = await loader.loadAsync(modelPath, this.HandleXHR);
    FbxModel.HandleObject(data, scene);
  }

  static HandleObject(object: Object3D, scene: Scene) {
    const o = new BuildingModel();

    object.traverse(function (child: Object3D) {
      o.extendObject(child as BuildingModel);
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
