import { Object3D } from 'three';
import { Ref } from 'vue';

import Core3D from './Core3D';

interface IHoverable extends Object3D {
  onPointerOver(): void;
  onPointerOut(): void;
}

interface IClickable extends Object3D {
  onPointerClick(): void;
}

export default class Engine3D {
  private core = new Core3D();
  hoveredObject?: IHoverable;

  hoverables: IHoverable[] = [];
  clickables: IClickable[] = [];

  add(obj: Object3D): void {
    this.core.add(obj);
  }

  addAndWatch(obj: Object3D): void {
    this.add(obj);
    this.core.watch(obj);
  }

  onPointerMove(e: MouseEvent) {
    this.core.setPointerCoordinates(e);
    const obj = this.core.getFirstIntersect<IHoverable>(this.hoverables);
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
    this.core.getIntersects(this.clickables).forEach((i: IClickable) => i.object.onPointerClick());
  }

  init(target: Ref) {
    target.value.appendChild(this.core.getDomElement());
    target.value.appendChild(this.core.getCssDomElement());

    this.bindEvents();
    this.core.updateMatrix();
  }

  fillObjects() {
    this.core.getScene().traverse((o: unknown) => {
      if ((o as IHoverable).onPointerOut && (o as IHoverable).onPointerOver) {
        this.hoverables.push(o as IHoverable);
      }
      if ((o as IClickable).onPointerClick) {
        this.clickables.push(o as IClickable);
      }
    });
  }

  private bindEvents() {
    window.addEventListener('pointermove', this.onPointerMove.bind(this));
    window.addEventListener('click', this.onPointerClick.bind(this));
  }
}
