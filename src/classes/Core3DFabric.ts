import * as Three from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';

export default abstract class Core3DFabric {
  static Control(camera: Three.PerspectiveCamera, domElement: HTMLElement): OrbitControls {
    const controls = new OrbitControls(camera, domElement);
    controls.enabled = true;
    controls.enableDamping = true;
    controls.enablePan = false;

    controls.maxPolarAngle = Three.MathUtils.degToRad(80);
    controls.maxDistance = 7;
    controls.minDistance = 3;
    return controls;
  }

  static Scene() {
    const scene = new Three.Scene();
    const light = new Three.AmbientLight(0xffffff, 2);
    light.position.set(0, 1.4, 100);
    scene.add(light);
    return scene;
  }

  static Camera() {
    const camera = new Three.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 4, 0);
    return camera;
  }

  static Renderer() {
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

  static CssRenderer() {
    const renderer = new CSS2DRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0px';
    return renderer;
  }
}
