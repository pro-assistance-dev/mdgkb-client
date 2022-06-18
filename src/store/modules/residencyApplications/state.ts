import IResidencyApplication from '@/interfaces/IResidencyApplication';

export interface State {
  items: IResidencyApplication[];
  item: IResidencyApplication;
  emailExists: boolean;
  count: number;
}
