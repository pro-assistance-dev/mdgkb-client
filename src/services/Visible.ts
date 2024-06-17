export default class Visible {
  private visible = false;

  protected hide() {
    this.visible = false;
  }

  protected show() {
    this.hide();
    this.visible = true;
  }

  IsVisible(): boolean {
    return this.visible;
  }
}
