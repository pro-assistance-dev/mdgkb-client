import VisitsApplication from '@/classes/VisitsApplication';

export default interface IVisitsApplicationsWithCount {
  visitsApplications: VisitsApplication[];
  count: number;
}
