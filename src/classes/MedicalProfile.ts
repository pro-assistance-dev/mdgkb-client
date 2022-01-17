import IMedicalProfile from '@/interfaces/IMedicalProfile';

export default class MedicalProfile implements IMedicalProfile {
  id?: string;
  name = '';

  constructor(i?: IMedicalProfile) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
  }
}
