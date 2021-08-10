import Division from '@/classes/buildings/Division';
import FileInfo from '@/classes/File/FileInfo';
import Human from '@/classes/Human';
import IDivision from '@/interfaces/buildings/IDivision';
import IDoctor from '@/interfaces/doctors/IDoctor';

export default class Doctor implements IDoctor {
  id?: string;
  human = new Human();
  humanId?: string;
  division?: IDivision;
  divisionId?: string;
  education?: string;
  schedule?: string;
  position?: string;
  tags?: string;
  fileInfo = new FileInfo();
  fileInfoId?: string;

  constructor(i?: IDoctor) {
    if (!i) return;
    this.id = i.id;
    this.human = new Human(i.human);
    this.humanId = i.humanId;
    this.division = new Division(i.division);
    // TODO Исправить)
    if (i.divisionId !== '00000000-0000-0000-0000-000000000000') this.divisionId = i.divisionId;
    this.education = i.education;
    this.schedule = i.schedule;
    this.position = i.position;
    this.tags = i.tags;
    this.fileInfoId = i.fileInfoId;
    if (i.fileInfo) this.fileInfo = new FileInfo(i.fileInfo);
  }
}
