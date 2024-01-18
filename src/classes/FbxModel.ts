import { Box3, Object3D, Scene } from 'three';
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

    const box = new Box3().setFromObject(object);
    // const shift = box.getCenter(object.position);
    console.log(box);
    object.traverse(function (child) {
      // const center = box.getCenter(new Vector3());
      // if ((child as THREE.Mesh).isMesh) {
      // child.castShadow = true;
      // child.position.sub(shift);
      // findedNode.position   child.receiveShadow = true;
      // child.position.x += child.position.x - center.x;
      // child.position.y += child.position.y - center.y;
      // child.position.z += child.position.z - center.z;
      // (child as THREE.Mesh).material = material
      // if ((child as THREE.Mesh).material) {
      //   ((child as THREE.Mesh).material as THREE.MeshBasicMaterial).transparent = false;
      // }
      // }
    });
    // // console.log(object);
    // scene.add(object);
    // console.log(scene);
  }

  static HandleXHR(xhr: ProgressEvent) {
    // console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
  }
  static HandleError(error: unknown) {
    console.log(error);
  }
}
