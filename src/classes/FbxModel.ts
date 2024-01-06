import { Object3D, Scene } from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

export default class FbxModel {
  static async AddObjectToScene(modelPath: string, scene: Scene): Promise<unknown> {
    const loader = new FBXLoader();
    const mainObject = await loader.loadAsync(modelPath, this.HandleXHR);
    FbxModel.HandleMainObject(mainObject, scene);
    return mainObject;
  }

  static HandleMainObject(object: Object3D, scene: Scene) {
    object.scale.set(0.01, 0.01, 0.01);
    scene.add(object);
  }

  static HandleXHR(xhr: ProgressEvent) {
    // console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
  }
  static HandleError(error: unknown) {
    console.log(error);
  }
}
