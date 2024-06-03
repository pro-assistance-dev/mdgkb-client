import Timer from './Timer'
import Time from './Time'

export enum MType {
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
}
type MessageOptions = {
  text: string
  title: string
  duration: number
}

export default class Message {
  private static instance = ref(new Message())
  private type: MType = MType.Success;
  private text = ""
  private title = ""
  private duration = Time.S(3)
  private visible = false

  private hide() {
    this.visible = false
  }

  private show(m: string | MessageOptions, t: MType) {
    this.type = t
    if (typeof m === 'string') {
      this.text = m
    } else {
      this.text = m.text
      this.duration = m.duration ?? this.duration
      this.title = m.title ?? ''
    }
    this.visible = true
  }

  static GetText(): string {
    return this.Get().text
  }

  static GetTitle(): string {
    return this.Get().title
  }

  static GetType(): MType {
    return this.Get().type

  }
  static IsVisible(): boolean {
    return this.Get().visible
  }

  private static Get(): Message {
    return this.instance.value
  }

  private static GetDuration(): number {
    return this.Get().duration
  }

  private static Show(m: string | MessageOptions, t: MType): void {
    this.Get().show(m, t)
    Timer.Wait(Message.GetDuration()).then(Message.Hide)
  }

  static Success(m: string | MessageOptions): void {
    Message.Show(m, MType.Success);
  }

  static Error(m: string | MessageOptions): void {
    Message.Show(m, MType.Error);
  }
  static Warning(m: string | MessageOptions): void {
    Message.Show(m, MType.Warning);
  }

  static Hide(): void {
    Message.Get().hide()
  }

  static FormMessage(errorFields: any): string {
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
