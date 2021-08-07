import IDoctor from '@/interfaces/doctors/IDoctor';
import IDivision from '@/interfaces/buildings/IDivision';
import Human from '@/classes/Human';
import Division from '@/classes/buildings/Division';

export default class Doctor implements IDoctor {
  id?: string;
  human = new Human();
  humanId?: string;
  division?: IDivision;
  divisionId?: string;
  education?: string;
  schedule?: string;
  tags?: string;

  constructor(i?: IDoctor) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.human = new Human(i.human);
    this.humanId = i.humanId;
    this.division = new Division(i.division);
    if (i.divisionId !== '00000000-0000-0000-0000-000000000000') this.divisionId = i.divisionId;
    this.education = i.education;
    this.schedule = i.schedule;
    this.tags = i.tags;
  }
}
