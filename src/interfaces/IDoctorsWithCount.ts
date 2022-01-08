import IDoctor from '@/interfaces/IDoctor';

export default interface IDoctorsWithCount {
  doctors: IDoctor[];
  count: number;
}
