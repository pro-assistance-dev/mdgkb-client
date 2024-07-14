import Message, { MessageOpts } from './Message';

type DialogResultType = 'cancel' | 'submit';
interface DialogResult {
  type: DialogResultType;
  [key: string]: any;
}

type DialogOpts = MessageOpts & {
  text: string;
  confirmButtonText: string;
  cancelButtonText: string;
};

class DialogConstructor extends Message {
  private confirmButtonText = 'Да';
  private cancelButtonText = 'Нет';

  private resolve?: any;
  private reject?: any;

  GetConfirmButtonText(): string {
    return this.confirmButtonText;
  }

  GetCancelButtonText(): string {
    return this.cancelButtonText;
  }

  Show(m: string | DialogOpts): Promise<DialogResult> {
    super.show();
    if (typeof m !== 'string') {
      this.confirmButtonText = m.confirmButtonText;
      this.cancelButtonText = m.cancelButtonText;
    }
    return new Promise<DialogResult>((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }

  Save(): Promise<DialogResult> {
    return this.Show({
      text: 'У вас есть несохранённые изменения',
      confirmButtonText: 'Сохранить',
      cancelButtonText: 'Не сохранять',
    });
  }

  Submit() {
    this.resolve(true);
    this.hide();
  }
  Cancel() {
    this.reject();
    this.hide();
  }

  protected hide() {
    this.resolve = undefined;
    this.reject = undefined;
    super.hide();
  }
}

const Dialog: DialogConstructor = new DialogConstructor();
export default Dialog;
