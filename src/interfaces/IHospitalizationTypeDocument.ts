import IHospitalizationType from '@/interfaces/IHospitalizationType';

export default interface IHospitalizationTypeDocument {
  id?: string;
  order: number;
  hospitalizationType?: IHospitalizationType;
  hospitalizationTypeId?: string;
  name: string;
  children: boolean;
}
