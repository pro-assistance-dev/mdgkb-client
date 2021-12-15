import IVisitingRule from '@/interfaces/IVisitingRule';

export default interface IVisitingRuleWithDeleted {
  visitingRules: IVisitingRule[];
  visitingRulesForDelete: string[];
}
