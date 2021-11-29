import Human from '@/classes/Human';
import IChild from '@/interfaces/IChild';

export default class Child implements IChild {
  id?: string;
  human = new Human();
  humanId?: string;
  constructor(i?: IChild) {
    if (!i) return;
    this.id = i.id;

    this.human = new Human(i.human);
    this.humanId = i.humanId;
  }
}
