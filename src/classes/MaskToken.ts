import IMaskToken from '@/interfaces/IMaskToken';

export default class MaskToken implements IMaskToken {
  id?: string;
  name = '';
  pattern = '';
  uppercase = false;

  constructor(i?: IMaskToken) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.pattern = i.pattern;
    this.uppercase = i.uppercase;
  }
}
