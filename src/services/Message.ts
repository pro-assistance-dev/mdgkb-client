import Statuses from './types/Statuses';

export type MessageOpts = {
  text: string;
  title: string;
};

export default class Message {
  private type: Statuses = Statuses.Success;
  private text = '';
  private title = '';
  private visible = false;

  protected hide() {
    this.visible = false;
  }

  protected show(m: string | MessageOpts, t: Statuses) {
    this.hide();
    this.type = t;
    if (typeof m === 'string') {
      this.text = m;
    } else {
      this.text = m.text;
      this.title = m.title ?? '';
    }
    this.visible = true;
  }

  GetText(): string {
    return this.text;
  }

  GetTitle(): string {
    return this.title;
  }

  GetType(): Statuses {
    return this.type;
  }

  IsVisible(): boolean {
    return this.visible;
  }

  Success(m: string | MessageOpts): void {
    this.show(m, Statuses.Success);
  }

  Error(m: string | MessageOpts): void {
    this.show(m, Statuses.Error);
  }

  Warning(m: string | MessageOpts): void {
    this.show(m, Statuses.Warning);
  }

  FormMessage(errorFields: any): string {
    let errorMessage = '<strong>Проверьте правильность введенных данных:</strong><ul>';
    for (const item of Object.keys(errorFields)) {
      if (errorFields[item][0] && errorFields[item][0].message) {
        errorMessage += `<li>${errorFields[item][0].message}</li>`;
      }
    }
    errorMessage += '</ul>';
    return errorMessage;
  }
}
