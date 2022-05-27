import IFormStatusGroup from '@/interfaces/IFormStatusGroup';

export interface State {
  items: IFormStatusGroup[];
  item: IFormStatusGroup;
  count: number;
  showDialog: boolean;
  dialogTitle: string;
}
