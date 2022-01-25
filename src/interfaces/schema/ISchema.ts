import ICommentsSchema from '@/interfaces/schema/ICommentsSchema';
import IHumanSchema from '@/interfaces/schema/IHumanSchema';
import IPatientDiagnosisSchema from '@/interfaces/schema/IPatientDiagnosisSchema';
import IPatientSchema from '@/interfaces/schema/IPatientSchema';

export default interface ISchema {
  humanSchema: IHumanSchema;
  commentsSchema: ICommentsSchema;
  patientSchema: IPatientSchema;
  patientDiagnosisSchema: IPatientDiagnosisSchema;
}
