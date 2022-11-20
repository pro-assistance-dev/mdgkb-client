import IDay from '@/interfaces/IDay';

export default class Day implements IDay {
  date: Date = new Date();
  shortName = '';
  selected = false;
  constructor() {
    return;
  }
}
