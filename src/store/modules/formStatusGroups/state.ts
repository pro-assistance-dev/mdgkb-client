import FormStatusGroup from '@/classes/FormStatusGroup';

export interface State {
  items: FormStatusGroup[];
  item: FormStatusGroup;
  count: number;
  showDialog: boolean;
  dialogTitle: string;
}
