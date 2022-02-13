import Division from '@/classes/buildings/Division';
import HospitalizationStage from '@/classes/hospitalizations/HospitalizationStage';
import HospitalizationType from '@/classes/hospitalizations/HospitalizationType';
import IDivision from '@/interfaces/buildings/IDivision';
import IHospitalization from '@/interfaces/IHospitalization';
import IHospitalizationStage from '@/interfaces/IHospitalizationStage';
import IHospitalizationType from '@/interfaces/IHospitalizationType';

export default class Hospitalization implements IHospitalization {
  id?: string;
  date: Date = new Date();
  hospitalizationType?: IHospitalizationType;
  hospitalizationTypeId?: string;
  division?: IDivision;
  divisionId?: string;
  hospitalizationStages: IHospitalizationStage[] = [];
  constructor(i?: IHospitalization) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.date = i.date;
    if (i.hospitalizationType) {
      this.hospitalizationType = new HospitalizationType(i.hospitalizationType);
    }
    this.hospitalizationTypeId = i.hospitalizationTypeId;
    if (i.division) {
      this.division = new Division(i.division);
    }
    this.divisionId = i.divisionId;
    if (i.hospitalizationStages) {
      this.hospitalizationStages = i.hospitalizationStages.map((item: IHospitalizationStage) => new HospitalizationStage(item));
    }
  }
}
