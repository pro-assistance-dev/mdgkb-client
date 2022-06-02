import ITreatDirection from '@/interfaces/ITreatDirection';
export default class TreatDirection implements ITreatDirection {
  id?: string;
  name = '';

  constructor(i?: ITreatDirection) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
  }
}
