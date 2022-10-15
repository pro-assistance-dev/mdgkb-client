import VisitingRuleGroup from '@/classes/VisitingRuleGroup';
import IVisitingRule from '@/interfaces/IVisitingRule';
import IVisitingRuleGroup from '@/interfaces/IVisitingRuleGroup';

export default class VisitingRule implements IVisitingRule {
  id?: string;
  text = '';
  order = 0;
  isListItem = true;
  visitingRuleGroupId?: string;
  visitingRuleGroup: IVisitingRuleGroup = new VisitingRuleGroup();

  constructor(i?: IVisitingRule) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.text = i.text;
    this.order = i.order;
    this.isListItem = i.isListItem;
    this.visitingRuleGroupId = i.visitingRuleGroupId;
    if (i.visitingRuleGroup) {
      this.visitingRuleGroup = new VisitingRuleGroup(i.visitingRuleGroup);
    }
  }
}
