import Building from '@/classes/Building';
import DivisionComment from '@/classes/DivisionComment';
import DivisionImage from '@/classes/DivisionImage';
import DivisionPaidService from '@/classes/DivisionPaidService';
import DivisionVideo from '@/classes/DivisionVideo';
import Doctor from '@/classes/Doctor';
import DoctorDivision from '@/classes/DoctorDivision';
import Entrance from '@/classes/Entrance';
import FileInfo from '@/classes/FileInfo';
import Floor from '@/classes/Floor';
import MedicalProfileDivision from '@/classes/MedicalProfileDivision';
import NewsDivision from '@/classes/NewsDivision';
import Schedule from '@/classes/Schedule';
import SocialMedia from '@/classes/SocialMedia';
import Timetable from '@/classes/Timetable';
import TreatDirection from '@/classes/TreatDirection';
import Vacancy from '@/classes/Vacancy';
import VisitingRuleGroup from '@/classes/VisitingRuleGroup';
import ContactInfo from '@/services/classes/ContactInfo';
import ClassHelper from '@/services/ClassHelper';

export default class Division {
  id?: string;
  name = '';
  info?: string = '';
  address?: string = '';
  show = false;
  floorId?: string;
  showCommonVisitingRules = true;
  entranceId?: string;

  entrance?: Entrance = new Entrance();
  slug?: string = '';
  @ClassHelper.GetClassConstructor(DoctorDivision)
  doctorsDivisions: DoctorDivision[] = [];
  doctorsDivisionsForDelete: string[] = [];
  @ClassHelper.GetClassConstructor(Vacancy)
  vacancies: Vacancy[] = [];
  timetable: Timetable = new Timetable();
  timetableId?: string;
  schedule: Schedule = new Schedule();
  scheduleId?: string;
  hasDiagnostic = false;
  hasAmbulatory = false;
  @ClassHelper.GetClassConstructor(DivisionImage)
  divisionImages: DivisionImage[] = [];
  divisionImagesForDelete: string[] = [];
  @ClassHelper.GetClassConstructor(DivisionComment)
  divisionComments: DivisionComment[] = [];
  timetableDaysForDelete: string[] = [];
  @ClassHelper.GetClassConstructor(VisitingRuleGroup)
  visitingRulesGroups: VisitingRuleGroup[] = [];
  visitingRulesGroupsForDelete: string[] = [];
  buildingId?: string;
  @ClassHelper.GetClassConstructor(DivisionPaidService)
  divisionPaidServices: DivisionPaidService[] = [];
  hospitalizationContactInfo?: ContactInfo;
  hospitalizationContactInfoId?: string;
  hospitalizationDoctorId?: string;
  hospitalizationDoctor?: Doctor;
  @ClassHelper.GetClassConstructor(MedicalProfileDivision)
  medicalProfilesDivisions: MedicalProfileDivision[] = [];
  @ClassHelper.GetClassConstructor(DivisionVideo)
  divisionVideos: DivisionVideo[] = [];
  divisionVideosForDelete: string[] = [];
  @ClassHelper.GetClassConstructor(ContactInfo)
  contactInfo: ContactInfo = new ContactInfo();
  contactInfoId?: string;
  @ClassHelper.GetClassConstructor(TreatDirection)
  treatDirection: TreatDirection = new TreatDirection();
  treatDirectionId?: string;
  chiefId?: string;
  chief: Doctor = new Doctor();
  @ClassHelper.GetClassConstructor(SocialMedia)
  socialMedias: SocialMedia[] = [];
  @ClassHelper.GetClassConstructor(NewsDivision)
  newsDivisions: NewsDivision[] = [];
  newsDivisionsForDelete: string[] = [];
  isCenter = false;

  //
  commentsCount = 0;
  constructor(i?: Division) {
    ClassHelper.BuildClass(this, i);
  }
  static GetClassName(): string {
    return 'division';
  }
  getAddress(): string {
    if (this.entrance && this.entrance.building) {
      return this.entrance.building.address;
    }
    return '';
  }

  addDivisionVideo(): void {
    this.divisionVideos.push(new DivisionVideo());
  }

  addVisitingRuleGroup(): void {
    const item = new VisitingRuleGroup();
    item.order = this.visitingRulesGroups.length;
    this.visitingRulesGroups.push(item);
  }

  setChief(item: Doctor) {
    this.chief = new Doctor(item);
    this.chiefId = item.id;
  }

  removeChief(): void {
    this.chief = new Doctor();
    this.chiefId = undefined;
  }

  addDoctorDivision(doctor: Doctor): void {
    const doctorDivision = new DoctorDivision();
    doctorDivision.doctor = new Doctor(doctor);
    doctorDivision.doctorId = doctor.id;
    doctorDivision.divisionId = this.id;
    this.doctorsDivisions.push(doctorDivision);
  }

  getBuildingNumber(): string {
    return String(this.entrance?.building?.number);
  }

  getEntranceNumber(): string {
    return String(this.entrance?.number);
  }

  scheduleAndRulesExists(): boolean {
    const scheduleItemsExists = this.schedule.scheduleItems.length;
    const visitingRulesExists = this.visitingRulesGroups.filter((vg: VisitingRuleGroup) => {
      return !!vg.visitingRules.length;
    });
    return !!scheduleItemsExists && !!visitingRulesExists;
  }

  getDoctors(onlyShowed: boolean): Doctor[] {
    const doctors: Doctor[] = [];
    this.doctorsDivisions.forEach((dd: DoctorDivision) => {
      if (onlyShowed) {
        if (dd.show) {
          doctors.push(dd.doctor);
        }
      } else {
        doctors.push(dd.doctor);
      }
    });
    return doctors;
  }

  setAddressFromBuilding(building: Building): void {
    const floor = building.floors.find((item: Floor) => item.id == this.floorId);
    const entrance = building.entrances.find((item: Entrance) => item.id == this.entranceId);
    this.address = `${building.address}${entrance?.number ? `, ${entrance.number} вход` : ''}${
      floor?.number ? `, ${floor.number} этаж` : ''
    }`;
  }

  addImage(): void {
    this.divisionImages.push(new DivisionImage());
  }

  getFileInfos(): FileInfo[] {
    const fileInfos: FileInfo[] = [];
    this.divisionImages.forEach((d: DivisionImage) => fileInfos.push(d.fileInfo));
    return fileInfos;
  }
}
