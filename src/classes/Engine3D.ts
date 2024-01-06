import * as Three from 'three';
import { Group, Object3D, PerspectiveCamera, Raycaster, Renderer, Scene, Vector2 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Ref } from 'vue';

interface IHoverable extends Object3D {
  onPointerOver(): void;
  onPointerOut(): void;
}

interface IClickable extends Object3D {
  onPointerClick(): void;
}

export default class Engine3D {
  scene: Scene = Engine3D.initScene();
  camera: PerspectiveCamera = Engine3D.initCamera();
  renderer: Renderer = Engine3D.initRenderer();
  controls?: OrbitControls;

  pointer: Vector2 = new Three.Vector2();
  raycaster: Raycaster = new Three.Raycaster();
  hoveredObject?: IHoverable;

  hoverables: IHoverable[] = [];
  clickables: IClickable[] = [];

  private initControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enabled = true;
    this.controls.enableDamping = true;
    this.controls.enablePan = false;
    // this.controls.enableZoom = false;
    // this.controls.tick = () => controls.update();
    // this.controls = new Three.Vector3(this.camera, this.renderer.domElement);
    // this.controls.enableDamping = true;
    // this.controls.target.set(0, 1, 0);
  }

  private static initScene() {
    const scene = new Three.Scene();

    scene.add(new Three.AxesHelper(5));


    // const light = new Three.PointLight(0xffffff, 500);
    // light.position.set(0.8, 1.4, 1.0);
    const light = new Three.AmbientLight(0xffffff, 2);
    light.position.set(0, 1.4, 100);
    // const color = 0xFFFFFF;  // белый
    // const near = 10;
    // const far = 100;
    // scene.fog = new Three.Fog(color, near, far);

    scene.add(light);
    // const ambientLight = new Three.AmbientLight();
    // scene.add(ambientLight);
    return scene;
  }

  private static initCamera() {
    // const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 90);
    // camera.position.set(0, 10, 0);
    const camera = new Three.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 4, 0);
    return camera;
  }

  private static initRenderer() {
    const renderer = new Three.WebGLRenderer({ antialias: true });
    renderer.shadowMap.enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor('white', 1);
    renderer.clearColor;
    // renderer.setSize(800, 800);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);
    return renderer;
  }

  private render() {
    this.renderer.render(this.scene, this.camera);
  }

  private setPointerCoordinates(e: MouseEvent) {
    const xOffset = e.clientX - this.renderer.domElement.offsetLeft;
    const yOffset = e.clientY - this.renderer.domElement.offsetTop;

    const containerWidth = this.renderer.domElement.clientWidth;
    const containerHeight = this.renderer.domElement.clientHeight;

    this.pointer.x = (xOffset / containerWidth) * 2 - 1;
    this.pointer.y = -(yOffset / containerHeight) * 2 + 1;
    this.raycaster.setFromCamera(this.pointer, this.camera);
  }

  getManager(): unknown {
    return this.scene.children.find((c: Object3D) => (c as Group).isGroup);
  }

  private getFirstIntersect<T>(objects: Object3D[]): undefined | T {
    const intersects = this.raycaster.intersectObjects(objects);
    if (intersects.length > 0) {
      return intersects[0].object as T;
    }
  }

  onPointerMove(e: MouseEvent) {
    this.setPointerCoordinates(e);

    const obj = this.getFirstIntersect<IHoverable>(this.hoverables);
    if (!obj) {
      this.hoveredObject?.onPointerOut();
      this.hoveredObject = undefined;
      return;
    }
    if (obj.uuid === this.hoveredObject?.uuid) {
      return;
    }
    obj.onPointerOver();
    this.hoveredObject?.onPointerOut();
    this.hoveredObject = obj;
  }

  onPointerClick(e: MouseEvent) {
    // const obj = this.getFirstIntersect<IClickable>(this.clickables);
    // @ts-ignore
    const intersects = this.raycaster.intersectObjects(this.clickables) as IClickable[];
    console.log(intersects, this.clickables);
    // @ts-ignore
    intersects.forEach((i) => i.object.onPointerClick());
    // if (obj) {
    //   obj.onPointerClick();
    // }
  }

  static CreateInstance(target: Ref) {
    const instance = new Engine3D();

    // window.addEventListener('resize', instance.onWindowResize.bind(instance), false);
    target.value.appendChild(instance.renderer.domElement);
    instance.animate();
    instance.initControls();
    instance.bindEvents();
    return instance;
  }

  fillObjects() {
    this.scene.traverse((o: unknown) => {
      if ((o as IHoverable).onPointerOut && (o as IHoverable).onPointerOver) {
        this.hoverables.push(o as IHoverable);
      }
      if ((o as IClickable).onPointerClick) {
        this.clickables.push(o as IClickable);
      }
    });
    console.log(this.clickables);
  }

  private bindEvents() {
    window.addEventListener('pointermove', this.onPointerMove.bind(this));
    window.addEventListener('click', this.onPointerClick.bind(this));
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
    // this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setSize(200, 200);
    this.render();
  }
}
