import IHospitalizationStageComment from '@/interfaces/IHospitalizationStageComment';
import IHospitalizationType from '@/interfaces/IHospitalizationType';

export default interface IHospitalizationTypeStage {
  id?: string;
  hospitalizationType?: IHospitalizationType;
  order: number;
  hospitalizationTypeId?: string;
  hospitalizationStageComments?: IHospitalizationStageComment[];
  name: string;
}
