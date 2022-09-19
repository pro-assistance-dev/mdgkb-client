import Building from '@/classes/Building';
import ContactInfo from '@/classes/contacts/ContactInfo';
import Division from '@/classes/Division';
import Doctor from '@/classes/Doctor';
import Entrance from '@/classes/Entrance';
import Schedule from '@/classes/timetable/Schedule';
import Timetable from '@/classes/timetable/Timetable';
import TreatDirection from '@/classes/TreatDirection';
import VisitingRule from '@/classes/VisitingRule';

import EmptyVariables from '../../__mocks__/EmptyVariables';
const sourceItem = {
  id: '06950b91-62bf-4183-8a4f-2756dacaf32c',
  name: 'Имя',
  info: '',
  address: '',
  show: '',
  floorId: '',
  showCommonVisitingRules: '',
  entranceId: '',
  entrance: undefined,
  slug: '',
  doctors: [],
  doctorsForDelete: [],
  vacancies: [],
  timetable: new Timetable(),
  timetableId: '',
  schedule: new Schedule(),
  scheduleId: '',
  divisionImages: [],
  divisionImagesForDelete: [],
  divisionImagesNames: [],
  divisionComments: [],
  timetableDaysForDelete: [],
  visitingRules: [],
  visitingRulesForDelete: [],
  buildingId: '',
  divisionPaidServices: [],
  hospitalizationContactInfo: undefined,
  hospitalizationContactInfoId: undefined,
  hospitalizationDoctorId: '',
  hospitalizationDoctor: undefined,
  medicalProfilesDivisions: [],
  divisionVideos: [],
  divisionVideosForDelete: [],
  contactInfo: new ContactInfo(),
  contactInfoId: undefined,
  treatDirection: new TreatDirection(),
  treatDirectionId: '',
  chiefId: '',
  chief: new Doctor(),
  socialMedias: [],
  newsDivisions: [],
  newsDivisionsForDelete: [],
};
describe('Class Division', () => {
  let division: Division;

  beforeEach(() => {
    division = new Division();
  });

  test('getAddress get not empty string if address exists', () => {
    expect(division.entrance).toBeInstanceOf(Entrance);
    expect(division.entrance?.building).toBeUndefined();
    expect(division.getAddress()).toBe(EmptyVariables.emptyString);
    if (!division.entrance) {
      return;
    }
    division.entrance.building = new Building();
    const address = 'address';
    division.entrance.building.address = address;
    expect(division.getAddress()).toBe(address);
  });

  test('getVisitingRulesList get only list rules', () => {
    division.visitingRules = [new VisitingRule(), new VisitingRule(), new VisitingRule()];
    division.visitingRules[2].isListItem = false;
    expect(division.visitingRules).toHaveLength(3);
    expect(division.getVisitingRulesList()).toHaveLength(2);
  });

  test('getVisitingRulesText get only text rules', () => {
    division.visitingRules = [new VisitingRule(), new VisitingRule(), new VisitingRule()];
    division.visitingRules[2].isListItem = false;
    expect(division.visitingRules).toHaveLength(3);
    expect(division.getVisitingRulesText()).toHaveLength(1);
  });

  test('addDivisionVideo added one DivisionVideo', () => {
    expect(division.divisionVideos).toHaveLength(0);
    division.addDivisionVideo();
    expect(division.divisionVideos).toHaveLength(1);
  });
});
