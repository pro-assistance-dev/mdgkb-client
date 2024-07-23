import Message, { MessageOpts } from './Message';
import Time from './Time';
import Timer from './Timer';
import Statuses from './types/Statuses';

type NotificationOpts = MessageOpts & {
  duration: number;
};

class NotificationConstructor extends Message {
  private duration = Time.S(3);

  protected showMessage(m: string | NotificationOpts, t: Statuses) {
    super.showMessage(m, t);
    if (typeof m !== 'string') {
      this.duration = m.duration ?? this.duration;
    }
    Timer.Wait(this.GetDuration()).then(() => super.hide());
  }

  private GetDuration(): number {
    return this.duration;
  }
  Dev() {
    const m = 'В режиме разработки';
    const t = Statuses.Warning;
    super.showMessage(m, t);
  }
  Save() {
    const m = 'Изменения успешно сохранены';
    const t = Statuses.Success;
    super.showMessage(m, t);
  }
}

const Notification: NotificationConstructor = new NotificationConstructor();
export default Notification;
