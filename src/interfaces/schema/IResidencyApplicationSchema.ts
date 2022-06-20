import IBaseSchema from '@/interfaces/schema/IBaseSchema';

export default interface IResidencyApplicationSchema extends IBaseSchema {
  createdAt: string;
  formStatusId: string;
  email: string;
  pointsAchievements: string;
  pointsEntrance: string;
  pointsSum: string;
  startYear: string;
  endYear: string;
  fullName: string;
  courseName: string;
}
