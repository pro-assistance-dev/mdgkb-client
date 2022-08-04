import IResidencyApplication from '@/interfaces/IResidencyApplication';

export interface State {
  items: IResidencyApplication[];
  item: IResidencyApplication;
  emailExists: boolean;
  typeExists: boolean;
  count: number;
}
