import IVisitingRuleGroup from '@/interfaces/IVisitingRuleGroup';

export default interface IVisitingRule {
  id?: string;
  text: string;
  order: number;
  isListItem: boolean;
  visitingRuleGroupId?: string;
  visitingRuleGroup: IVisitingRuleGroup;
}
