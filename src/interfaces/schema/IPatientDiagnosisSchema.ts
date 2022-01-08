export default interface IPatientDiagnosisSchema {
  tableName: string;
  mkbDiagnosisId: string;
  mkbSubDiagnosisId: string;

  joinTable: string;
  joinTableFk: string;
  joinTablePk: string;
}
