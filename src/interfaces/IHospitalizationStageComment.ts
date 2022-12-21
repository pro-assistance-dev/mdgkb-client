import IHospitalizationTypeStage from '@/interfaces/IHospitalizationStage';

export default interface IHospitalizationStageComment {
  id?: string;
  hospitalizationStage?: IHospitalizationTypeStage;
  hospitalizationStageId?: string;
  name: string;
}
