const HeaderHeight = -58;

export default function scroll(id: string, yOffset?: number): void {
  const el = document.getElementById(id);
  const offset = yOffset ?? HeaderHeight;
  let y = 0;

  if (el) {
    y = el.getBoundingClientRect().top + window.pageYOffset + offset;
  }
  if (y) {
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}
