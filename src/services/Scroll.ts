// height 58 - margin
const HeaderHeight = -58 - 10;

export default function scroll(id?: string, yOffset?: number): void {
  if (!id) {
    document.body.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  // document.body.scrollTo({ top: 0 });
  const el = document.getElementById(id);
  const offset = yOffset ?? HeaderHeight;
  let y = 0;
  if (el) {
    const elRect = el.getBoundingClientRect();
    y = elRect.top + offset + document.body.scrollTop;
  }
  if (y) {
    document.body.scrollTo({ top: y, behavior: 'smooth' });
  }
}
