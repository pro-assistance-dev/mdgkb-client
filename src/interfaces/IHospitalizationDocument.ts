import IHospitalizationType from '@/interfaces/IHospitalizationType';

export default interface IHospitalizationDocument {
  id?: string;
  hospitalizationType?: IHospitalizationType;
  hospitalizationTypeId?: string;
  name: string;
  children: boolean;
}
