import VisitingRule from '@/classes/VisitingRule';
import VisitingRuleGroup from '@/classes/VisitingRuleGroup';
import IVisitingRuleGroup from '@/interfaces/IVisitingRuleGroup';

import ClassTester from '../../__services__/ClassTester/ClassTester';

describe('Class VisitingRuleGroup', () => {
  let visitingRuleGroup: VisitingRuleGroup;

  beforeEach(() => {
    visitingRuleGroup = new VisitingRuleGroup();
  });
  test('constructor', () => {
    const classInspectResult = ClassTester.Inspect<VisitingRuleGroup, IVisitingRuleGroup>(VisitingRuleGroup);
    expect(classInspectResult).toEqual(true);
  });

  test('getVisitingRulesList get only list rules', () => {
    visitingRuleGroup.visitingRules = [new VisitingRule(), new VisitingRule(), new VisitingRule()];
    visitingRuleGroup.visitingRules[2].isListItem = false;
    expect(visitingRuleGroup.visitingRules).toHaveLength(3);
    expect(visitingRuleGroup.getVisitingRulesList()).toHaveLength(2);
  });

  test('getVisitingRulesText get only text rules', () => {
    visitingRuleGroup.visitingRules = [new VisitingRule(), new VisitingRule(), new VisitingRule()];
    visitingRuleGroup.visitingRules[2].isListItem = false;
    expect(visitingRuleGroup.visitingRules).toHaveLength(3);
    expect(visitingRuleGroup.getVisitingRulesText()).toHaveLength(1);
  });
});
