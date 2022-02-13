import IHospitalizationType from '@/interfaces/IHospitalizationType';

export default interface IHospitalizationAnalysis {
  id?: string;
  hospitalizationType?: IHospitalizationType;
  hospitalizationTypeId?: string;
  name: string;
  durationDays: number;
  children: boolean;
}
