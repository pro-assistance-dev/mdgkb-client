import IHospitalization from '@/interfaces/IHospitalization';
import IHospitalizationAnalysis from '@/interfaces/IHospitalizationAnalize';
import IHospitalizationDocument from '@/interfaces/IHospitalizationDocument';
import IHospitalizationToDocumentType from '@/interfaces/IHospitalizationToDocumentType';
import { PolicyTypes } from '@/interfaces/PolicyTypes';
import { ReferralTypes } from '@/interfaces/ReferralTypes';
import { StayTypes } from '@/interfaces/StayTypes';
import { TreatmentTypes } from '@/interfaces/TreatmentTypes';

export default interface IHospitalizationType {
  id?: string;
  name?: string;
  paid?: boolean;
  policyType: PolicyTypes;
  treatmentType: TreatmentTypes;
  stayType: StayTypes;
  referralType: ReferralTypes;
  hospitalizationsToDocumentTypes?: IHospitalizationToDocumentType[];
  selectedHospitalisation: IHospitalization;
  hospitalizationAnalyzes: IHospitalizationAnalysis[];
  hospitalizationDocuments: IHospitalizationDocument[];
}
