// height 58 - margin
const HeaderHeight = -58 - 10;

export default function scroll(query?: string, yOffset?: number): void {
  if (!query) {
    document.body.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  const el = document.querySelector(query);
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
