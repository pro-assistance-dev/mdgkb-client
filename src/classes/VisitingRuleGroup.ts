import VisitingRule from '@/classes/VisitingRule';
import IVisitingRule from '@/interfaces/IVisitingRule';
import IVisitingRuleGroup from '@/interfaces/IVisitingRuleGroup';

export default class VisitingRuleGroup implements IVisitingRuleGroup {
  id?: string;
  name = '';
  color = '';
  order = 0;
  divisionId?: string;
  visitingRules: IVisitingRule[] = [];
  visitingRulesForDelete: string[] = [];

  constructor(i?: IVisitingRuleGroup) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.color = i.color;
    this.order = i.order;
    this.divisionId = i.divisionId;
    if (i.visitingRules) {
      this.visitingRules = i.visitingRules.map((item: IVisitingRule) => new VisitingRule(item));
    }
  }

  getVisitingRulesList(): IVisitingRule[] {
    return this.visitingRules.filter((v: IVisitingRule) => v.isListItem);
  }

  getVisitingRulesText(): IVisitingRule[] {
    return this.visitingRules.filter((v: IVisitingRule) => !v.isListItem);
  }

  addVisitingRule(): void {
    this.visitingRules.push(new VisitingRule());
  }
}
