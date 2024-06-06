import Message, { MessageOpts } from './Message'
import Statuses from './types/Statuses'

type DialogResultType = 'cancel' | 'submit';
interface DialogResult {
  type: DialogResultType;
  [key: string]: any;
}


type DialogOpts = MessageOpts & {
  duration: number
  confirmButtonText: string
  cancelButtonText: string
}

class DialogConstructor extends Message {
  private confirmButtonText = "Да"
  private cancelButtonText = "Нет"

  private resolve?: any
  private reject?: any

  GetConfirmButtonText(): string {
    return this.confirmButtonText
  }

  GetCancelButtonText(): string {
    return this.cancelButtonText
  }

  Show(m: string | DialogOpts, t: Statuses): Promise<DialogResult> {
    super.show(m, t)
    if (typeof m !== 'string') {
      this.confirmButtonText = m.confirmButtonText
      this.cancelButtonText = m.cancelButtonText
    }
    return new Promise<DialogResult>((resolve, reject) => {
      this.resolve = resolve
      this.reject = reject
    })
  }

  Submit() {
    this.resolve(true)
    this.hide()
  }
  Cancel() {
    this.reject(false)
    this.hide()
  }

  protected hide() {
    this.resolve = undefined
    this.reject = undefined
    super.hide()
  }
}

const Dialog: DialogConstructor = new DialogConstructor()
export default Dialog
