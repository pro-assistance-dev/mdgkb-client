import IForm from '@/interfaces/IForm';
import IHospitalizationToDocumentType from '@/interfaces/IHospitalizationToDocumentType';
import IHospitalizationTypeAnalyze from '@/interfaces/IHospitalizationTypeAnalize';
import IHospitalizationTypeDocument from '@/interfaces/IHospitalizationTypeDocument';
import IHospitalizationTypeStage from '@/interfaces/IHospitalizationTypeStage';
import { PolicyTypes } from '@/interfaces/PolicyTypes';
import { ReferralTypes } from '@/interfaces/ReferralTypes';
import { StayTypes } from '@/interfaces/StayTypes';
import { TreatmentTypes } from '@/interfaces/TreatmentTypes';

export default interface IHospitalizationType {
  id?: string;
  description: string;
  policyType: PolicyTypes;
  treatmentType: TreatmentTypes;
  stayType: StayTypes;
  referralType: ReferralTypes;
  hospitalizationsToDocumentTypes?: IHospitalizationToDocumentType[];
  // selectedHospitalisation: IHospitalization;
  hospitalizationTypeStages: IHospitalizationTypeStage[];
  hospitalizationTypeAnalyzes: IHospitalizationTypeAnalyze[];
  hospitalizationTypeDocuments: IHospitalizationTypeDocument[];

  formPattern: IForm;
  formPatternId?: string;
}
