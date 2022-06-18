import IResidencyApplication from './IResidencyApplication';

export default interface IResidencyApplicationsWithCount {
  residencyApplications: IResidencyApplication[];
  count: number;
}
