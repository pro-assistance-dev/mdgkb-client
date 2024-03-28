export default class Dragger {
  private dragged = false;
  private dragImg = new Image();

  constructor() {
    this.dragImg.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
  }

  start(e?: DragEvent): void {
    this.dragged = true;
    if (e && e.dataTransfer) {
      e.dataTransfer.setDragImage(this.dragImg, 0, 0);
    }
  }

  end(): void {
    this.dragged = false;
  }
  isDragged(): boolean {
    return this.dragged;
  }
}
