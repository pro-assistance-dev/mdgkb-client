import IVisitingRule from '@/interfaces/IVisitingRule';

export default interface IVisitingRuleGroup {
  id?: string;
  name: string;
  color: string;
  order: number;
  divisionId?: string;
  visitingRules: IVisitingRule[];
  visitingRulesForDelete: string[];

  getVisitingRulesList: () => IVisitingRule[];
  getVisitingRulesText: () => IVisitingRule[];
  addVisitingRule: () => void;
}
