import { Object3D } from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

export default class FbxModel {
  static async AddObjectToScene(modelPath: string): Promise<unknown> {
    const loader = new FBXLoader();
    console.log(modelPath);

    const mainObject = await loader.loadAsync(modelPath, this.HandleXHR);
    FbxModel.HandleMainObject(mainObject);
    return mainObject;
  }

  static HandleMainObject(object: Object3D) {
    object.scale.set(0.01, 0.01, 0.01);
  }

  static HandleXHR(xhr: ProgressEvent) {
    // console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
  }
  static HandleError(error: unknown) {
    console.log(error);
  }
}
