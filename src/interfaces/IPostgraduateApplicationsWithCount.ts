import IPostgraduateApplication from './IPostgraduateApplication';

export default interface IPostgraduateApplicationsWithCount {
  postgraduateApplications: IPostgraduateApplication[];
  count: number;
}
