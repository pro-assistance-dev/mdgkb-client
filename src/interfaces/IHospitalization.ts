import IDivision from '@/interfaces/buildings/IDivision';
import IHospitalizationStage from '@/interfaces/IHospitalizationStage';
import IHospitalizationType from '@/interfaces/IHospitalizationType';

export default interface IHospitalization {
  id?: string;
  hospitalizationType?: IHospitalizationType;
  hospitalizationTypeId?: string;
  hospitalizationStages: IHospitalizationStage[];
  date: Date;
  division?: IDivision;
  divisionId?: string;
}
