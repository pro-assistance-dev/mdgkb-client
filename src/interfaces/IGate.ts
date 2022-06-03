import IApplicationCar from '@/interfaces/IApplicationCar';
import IForm from '@/interfaces/IForm';

export default interface IGate {
  id?: string;
  name: string;
  applicationsCars: IApplicationCar[];

  formPattern: IForm;
  formPatternId?: string;
}
