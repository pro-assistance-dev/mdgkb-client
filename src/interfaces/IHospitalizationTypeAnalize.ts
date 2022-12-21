import IHospitalizationType from '@/interfaces/IHospitalizationType';

export default interface IHospitalizationTypeAnalyze {
  id?: string;
  order: number;
  hospitalizationType?: IHospitalizationType;
  hospitalizationTypeId?: string;
  name: string;
  durationDays: number;
  children: boolean;
}
