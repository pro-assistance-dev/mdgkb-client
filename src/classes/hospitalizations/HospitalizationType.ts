import Form from '@/classes/Form';
import HospitalizationToDocumentType from '@/classes/hospitalizations/HospitalizationToDocumentType';
import HospitalizationTypeAnalyze from '@/classes/hospitalizations/HospitalizationTypeAnalyze';
import HospitalizationTypeDocument from '@/classes/hospitalizations/HospitalizationTypeDocument';
import HospitalizationTypeStage from '@/classes/hospitalizations/HospitalizationTypeStage';
import IForm from '@/interfaces/IForm';
import IHospitalizationToDocumentType from '@/interfaces/IHospitalizationToDocumentType';
import IHospitalizationType from '@/interfaces/IHospitalizationType';
import IHospitalizationTypeAnalize from '@/interfaces/IHospitalizationTypeAnalize';
import IHospitalizationTypeDocument from '@/interfaces/IHospitalizationTypeDocument';
import IHospitalizationTypeStage from '@/interfaces/IHospitalizationTypeStage';
import { PolicyTypes } from '@/interfaces/PolicyTypes';
import { ReferralTypes } from '@/interfaces/ReferralTypes';
import { StayTypes } from '@/interfaces/StayTypes';
import { TreatmentTypes } from '@/interfaces/TreatmentTypes';

export default class HospitalizationType implements IHospitalizationType {
  id?: string;
  description = '';
  hospitalizationsToDocumentTypes?: IHospitalizationToDocumentType[];
  policyType: PolicyTypes = PolicyTypes.OMS;
  referralType: ReferralTypes = ReferralTypes.Moscow;
  stayType: StayTypes = StayTypes.AllDay;
  treatmentType: TreatmentTypes = TreatmentTypes.Conservative;
  hospitalizationTypeAnalyzes: IHospitalizationTypeAnalize[] = [];
  hospitalizationTypeDocuments: IHospitalizationTypeDocument[] = [];
  hospitalizationTypeStages: IHospitalizationTypeStage[] = [];

  formPattern: IForm = new Form();
  formPatternId?: string;
  constructor(i?: IHospitalizationType) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.description = i.description;
    this.policyType = i.policyType;
    this.referralType = i.referralType;
    this.stayType = i.stayType;
    this.treatmentType = i.treatmentType;
    if (i.hospitalizationTypeStages) {
      this.hospitalizationTypeStages = i.hospitalizationTypeStages.map(
        (item: IHospitalizationTypeStage) => new HospitalizationTypeStage(item)
      );
    }
    if (i.hospitalizationsToDocumentTypes) {
      this.hospitalizationsToDocumentTypes = i.hospitalizationsToDocumentTypes.map((item: IHospitalizationToDocumentType) => {
        return new HospitalizationToDocumentType(item);
      });
    }
    // if (i.selectedHospitalisation) {
    //   this.selectedHospitalisation = new Hospitalization(i.selectedHospitalisation);
    // }
    if (i.hospitalizationTypeAnalyzes) {
      this.hospitalizationTypeAnalyzes = i.hospitalizationTypeAnalyzes.map((item: IHospitalizationTypeAnalize) => {
        return new HospitalizationTypeAnalyze(item);
      });
    }
    if (i.hospitalizationTypeDocuments) {
      this.hospitalizationTypeDocuments = i.hospitalizationTypeDocuments.map((item: IHospitalizationTypeDocument) => {
        return new HospitalizationTypeDocument(item);
      });
    }
    if (i.formPattern) {
      this.formPattern = new Form(i.formPattern);
    }
    this.formPatternId = i.formPatternId;
  }
}
