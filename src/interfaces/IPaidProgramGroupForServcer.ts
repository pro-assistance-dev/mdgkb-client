import IPaidProgramsGroup from '@/interfaces/IPaidProgramsGroupsForServer';

export default interface IPaidProgramsGroupsForServer {
  paidProgramsGroups: IPaidProgramsGroup[];
  paidProgramsGroupsForDelete: string[];
}
