import DpoApplication from './DpoApplication';

export default interface IDpoApplicationsWithCount {
  dpoApplications: DpoApplication[];
  count: number;
}
