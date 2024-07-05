import * as Three from 'three';
import { Group, Object3D, PerspectiveCamera, Raycaster, Renderer, Scene, Vector2 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';

import Core3DFabric from './Core3DFabric';

export default class Core3D {
  private scene: Scene = Core3DFabric.Scene();
  camera: PerspectiveCamera = Core3DFabric.Camera();
  private renderer: Renderer = Core3DFabric.Renderer();
  private cssRenderer: CSS2DRenderer = Core3DFabric.CssRenderer();
  controls: OrbitControls;

  pointer: Vector2 = new Three.Vector2();
  raycaster: Raycaster = new Three.Raycaster();

  watch(obj?: Three.Object3D, opts?: { lookAt: boolean }) {
    if (!obj) {
      return;
    }
    obj.lookAt(this.camera.position);
    this.render();
    window.requestAnimationFrame(() => this.watch(obj, opts));
  }

  add(obj: Object3D): void {
    this.scene.add(obj);
  }

  addAndWatch(obj: Object3D): void {
    this.add(obj);
    this.watch(obj);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
    this.cssRenderer.render(this.scene, this.camera);
  }

  getManager(): unknown {
    return this.scene.children.find((c: Object3D) => (c as Group).isGroup);
  }

  constructor() {
    this.animate();
    this.controls = Core3DFabric.Control(this.camera, this.getCssDomElement());
    this.updateMatrix();
  }

  remove(obj?: Object3D): void {
    if (!obj) {
      return;
    }
    this.clearThree(obj);
    this.scene.remove(obj);
    this.animate();
  }

  clearThree(obj: Object3D) {
    while (obj.children.length > 0) {
      this.clearThree(obj.children[0]);
      obj.remove(obj.children[0]);
    }
    if (obj.geometry) obj.geometry.dispose();

    if (obj.material) {
      Object.keys(obj.material).forEach((prop: unknown) => {
        if (!obj.material[prop]) return;
        if (obj.material[prop] !== null && typeof obj.material[prop].dispose === 'function') obj.material[prop].dispose();
      });
      obj.material.dispose();
    }
  }

  private animate() {
    requestAnimationFrame(this.animate.bind(this));
    if (this.controls) {
      this.controls.update();
    }
    // console.log(this.camera);

    this.render();
  }

  private onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    // this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setSize(200, 200);
    this.render();
  }

  getDomElement() {
    return this.renderer.domElement;
  }

  getCssDomElement() {
    return this.cssRenderer.domElement;
  }

  setRaycaster(): void {
    this.raycaster.setFromCamera(this.pointer, this.camera);
  }

  getScene(): Scene {
    return this.scene;
  }

  getFirstIntersect<T>(objects: Object3D[]): undefined | T {
    const intersects = this.raycaster.intersectObjects(objects);
    if (intersects.length > 0) {
      return intersects[0].object as T;
    }
  }

  getIntersects(objs: any) {
    return this.raycaster.intersectObjects(objs);
  }

  setPointerCoordinates(e: MouseEvent) {
    const domEl = this.getDomElement();
    const xOffset = e.clientX - domEl.offsetLeft;
    const yOffset = e.clientY - domEl.offsetTop;

    this.pointer.x = (xOffset / domEl.clientWidth) * 2 - 1;
    this.pointer.y = -(yOffset / domEl.clientHeight) * 2 + 1;
    this.raycaster.setFromCamera(this.pointer, this.camera);
  }
  updateMatrix(): void {
    this.camera.updateProjectionMatrix();
  }
}
