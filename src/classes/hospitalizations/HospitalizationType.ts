import Hospitalization from '@/classes/hospitalizations/Hospitalization';
import HospitalizationAnalysis from '@/classes/hospitalizations/HospitalizationAnalysis';
import HospitalizationDocument from '@/classes/hospitalizations/HospitalizationDocument';
import HospitalizationToDocumentType from '@/classes/hospitalizations/HospitalizationToDocumentType';
import IHospitalization from '@/interfaces/IHospitalization';
import IHospitalizationAnalysis from '@/interfaces/IHospitalizationAnalize';
import IHospitalizationDocument from '@/interfaces/IHospitalizationDocument';
import IHospitalizationToDocumentType from '@/interfaces/IHospitalizationToDocumentType';
import IHospitalizationType from '@/interfaces/IHospitalizationType';
import { PolicyTypes } from '@/interfaces/PolicyTypes';
import { ReferralTypes } from '@/interfaces/ReferralTypes';
import { StayTypes } from '@/interfaces/StayTypes';
import { TreatmentTypes } from '@/interfaces/TreatmentTypes';

export default class HospitalizationType implements IHospitalizationType {
  id?: string;
  name?: string;
  paid?: boolean;
  hospitalizationsToDocumentTypes?: IHospitalizationToDocumentType[];
  policyType: PolicyTypes = PolicyTypes.OMS;
  referralType: ReferralTypes = ReferralTypes.Moscow;
  stayType: StayTypes = StayTypes.AllDay;
  treatmentType: TreatmentTypes = TreatmentTypes.Conservative;
  selectedHospitalisation: IHospitalization = new Hospitalization();
  hospitalizationAnalyzes: IHospitalizationAnalysis[] = [];
  hospitalizationDocuments: IHospitalizationDocument[] = [];
  constructor(i?: IHospitalizationType) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.paid = i.paid;
    this.policyType = i.policyType;
    this.referralType = i.referralType;
    this.stayType = i.stayType;
    this.treatmentType = i.treatmentType;
    if (i.hospitalizationsToDocumentTypes) {
      this.hospitalizationsToDocumentTypes = i.hospitalizationsToDocumentTypes.map((item: IHospitalizationToDocumentType) => {
        return new HospitalizationToDocumentType(item);
      });
    }
    if (i.selectedHospitalisation) {
      this.selectedHospitalisation = new Hospitalization(i.selectedHospitalisation);
    }
    if (i.hospitalizationAnalyzes) {
      this.hospitalizationAnalyzes = i.hospitalizationAnalyzes.map((item: IHospitalizationAnalysis) => {
        return new HospitalizationAnalysis(item);
      });
    }
    if (i.hospitalizationDocuments) {
      this.hospitalizationDocuments = i.hospitalizationDocuments.map((item: IHospitalizationDocument) => {
        return new HospitalizationDocument(item);
      });
    }
  }

  isMoscowReferral(): boolean {
    return this.referralType === ReferralTypes.Moscow;
  }
}
