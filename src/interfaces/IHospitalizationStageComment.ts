import IHospitalizationStage from '@/interfaces/IHospitalizationStage';

export default interface IHospitalizationStageComment {
  id?: string;
  hospitalizationStage?: IHospitalizationStage;
  hospitalizationStageId?: string;
  name: string;
}
