import IVisitsApplication from './IVisitsApplication';

export default interface IVisitsApplicationsWithCount {
  visitsApplications: IVisitsApplication[];
  count: number;
}
