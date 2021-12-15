import IVisitingRule from '@/interfaces/IVisitingRule';

export default class VisitingRule implements IVisitingRule {
  id?: string;
  text = '';
  order = 0;
  isListItem = true;
  divisionId?: string;

  constructor(visitingRule?: IVisitingRule) {
    if (!visitingRule) {
      return;
    }
    this.id = visitingRule.id;
    this.text = visitingRule.text;
    this.order = visitingRule.order;
    this.isListItem = visitingRule.isListItem;
    this.divisionId = visitingRule.divisionId;
  }

  static CreateVisitingRule(order?: number): IVisitingRule {
    const newVisitingRule = new VisitingRule();
    if (order) {
      newVisitingRule.order = order;
    }
    return newVisitingRule;
  }
}
