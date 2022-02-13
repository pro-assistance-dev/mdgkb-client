import IHospitalizationStageComment from '@/interfaces/IHospitalizationStageComment';
import IHospitalizationType from '@/interfaces/IHospitalizationType';

export default interface IHospitalizationStage {
  id?: string;
  hospitalizationType?: IHospitalizationType;
  hospitalizationTypeId?: string;
  hospitalizationStageComments?: IHospitalizationStageComment[];
  name: string;
}
