import Timer from './Timer';
import Time from './Time';
import Message, { MessageOpts } from './Message';

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
}

const Notification: NotificationConstructor = new NotificationConstructor();
export default Notification;
