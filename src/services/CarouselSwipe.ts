export default function carouselSwipe(direction: string, ref: any): void {
  if (direction == 'left') {
    ref.next();
  }

  if (direction == 'right') {
    ref.prev();
  }
}
