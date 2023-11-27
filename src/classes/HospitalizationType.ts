import Form from '@/classes/Form';
import HospitalizationToDocumentType from '@/classes/HospitalizationToDocumentType';
import HospitalizationTypeAnalyze from '@/classes/HospitalizationTypeAnalyze';
import HospitalizationTypeDocument from '@/classes/HospitalizationTypeDocument';
import HospitalizationTypeStage from '@/classes/HospitalizationTypeStage';
import { PolicyTypes } from '@/interfaces/PolicyTypes';
import { ReferralTypes } from '@/interfaces/ReferralTypes';
import { StayTypes } from '@/interfaces/StayTypes';
import { TreatmentTypes } from '@/interfaces/TreatmentTypes';
import ClassHelper from '@/services/ClassHelper';

export default class HospitalizationType {
  id?: string;
  description = '';
  @ClassHelper.GetClassConstructor(HospitalizationToDocumentType)
  hospitalizationsToDocumentTypes?: HospitalizationToDocumentType[];
  policyType: PolicyTypes = PolicyTypes.OMS;
  referralType: ReferralTypes = ReferralTypes.Moscow;
  stayType: StayTypes = StayTypes.AllDay;
  treatmentType: TreatmentTypes = TreatmentTypes.Conservative;
  @ClassHelper.GetClassConstructor(HospitalizationTypeAnalyze)
  hospitalizationTypeAnalyzes: HospitalizationTypeAnalyze[] = [];
  @ClassHelper.GetClassConstructor(HospitalizationTypeDocument)
  hospitalizationTypeDocuments: HospitalizationTypeDocument[] = [];
  @ClassHelper.GetClassConstructor(HospitalizationTypeStage)
  hospitalizationTypeStages: HospitalizationTypeStage[] = [];

  formPattern: Form = new Form();
  formPatternId?: string;
  constructor(i?: HospitalizationType) {
    ClassHelper.BuildClass(this, i);
  }
}
