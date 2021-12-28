import IPaidProgramsGroup from '@/interfaces/IPaidProgramsGroupsForServer';

export interface State {
  items: IPaidProgramsGroup[];
  item: IPaidProgramsGroup;
  itemsForDelete: string[];
}
