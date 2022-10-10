import Building from '@/classes/Building';
import Division from '@/classes/Division';
import Entrance from '@/classes/Entrance';
import VisitingRule from '@/classes/VisitingRule';
import IDivision from '@/interfaces/IDivision';
import IDivisionVideo from '@/interfaces/IDivisionVideo';

import EmptyVariables from '../../__mocks__/EmptyVariables';
import ClassTester from '../../__services__/ClassTester/ClassTester';

describe('Class Division', () => {
  let division: Division;

  beforeEach(() => {
    division = new Division();
  });
  test('constructor', () => {
    const classInspectResult = ClassTester.Inspect<Division, IDivision>(Division);
    expect(classInspectResult).toEqual(true);
  });

  test('added functions', () => {
    const classInspectResult = ClassTester.InspectAddedFunctions<IDivision, IDivisionVideo>({
      entity: division,
      constructions: [{ func: division.addDivisionVideo, arr: division.divisionVideos }],
    });
    expect(classInspectResult).toEqual(true);
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
