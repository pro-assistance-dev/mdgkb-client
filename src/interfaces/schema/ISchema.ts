import IHumanSchema from '@/interfaces/schema/IHumanSchema';
import IPatientDiagnosisSchema from '@/interfaces/schema/IPatientDiagnosisSchema';
import IPatientSchema from '@/interfaces/schema/IPatientSchema';

export default interface ISchema {
  humanSchema: IHumanSchema;
  patientSchema: IPatientSchema;
  patientDiagnosisSchema: IPatientDiagnosisSchema;
}
