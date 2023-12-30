import * as Three from 'three';
import { Mesh, PerspectiveCamera, Raycaster, Renderer, Scene, Vector2 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Ref } from 'vue';

export default class Engine3D {
  scene: Scene = Engine3D.initScene();
  camera: PerspectiveCamera = Engine3D.initCamera();
  renderer: Renderer = Engine3D.initRenderer();
  controls?: OrbitControls;

  pointer: Vector2 = new Three.Vector2();
  raycaster: Raycaster = new Three.Raycaster();

  private initControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.target.set(0, 1, 0);
  }

  private static initScene() {
    const scene = new Three.Scene();

    scene.add(new Three.AxesHelper(5));

    const light = new Three.PointLight(0xffffff, 50);
    light.position.set(0.8, 1.4, 1.0);
    scene.add(light);

    const ambientLight = new Three.AmbientLight();
    scene.add(ambientLight);
    return scene;
  }

  private static initCamera() {
    const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(10, 5.4, -2.0);
    return camera;
  }

  private static initRenderer() {
    const renderer = new Three.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    return renderer;
  }

  private render() {
    this.renderer.render(this.scene, this.camera);
  }

  onPointerMove(e: MouseEvent) {
    this.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
    this.raycaster.setFromCamera(this.pointer, this.camera);

    const intersects = this.raycaster.intersectObjects(this.scene.children);
    for (let i = 0; i < intersects.length; i++) {
      (intersects[0].object as Mesh).material = new Three.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    }
  }

  static CreateInstance(target: Ref) {
    const instance = new Engine3D();
    instance.initControls();

    window.addEventListener('resize', instance.onWindowResize.bind(instance), false);
    target.value.appendChild(instance.renderer.domElement);
    instance.animate();
    window.addEventListener('click', instance.onPointerMove.bind(instance));
    return instance;
  }

  private animate() {
    requestAnimationFrame(this.animate.bind(this));
    if (this.controls) {
      this.controls.update();
    }
    this.render();
  }

  private onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.render();
  }
}
