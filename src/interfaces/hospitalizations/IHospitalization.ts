import IHospitalizationToDocumentType from '@/interfaces/hospitalizations/IHospitalizationToDocumentType';

export default interface IHospitalization {
  id?: string;
  name: string;
  paid: boolean;
  hospitalizationsToDocumentTypes?: IHospitalizationToDocumentType[];
}
