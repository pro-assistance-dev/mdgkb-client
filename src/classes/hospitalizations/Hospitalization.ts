import IHospitalization from '@/interfaces/hospitalizatoins/IHospitalization';

export default class Hospitalization implements IHospitalization {
  name = '';
  paid = false;

  constructor(hospitalization?: IHospitalization) {
    if (!hospitalization) {
      return;
    }
    this.name = hospitalization.name;
    this.paid = hospitalization.paid;
  }
}
