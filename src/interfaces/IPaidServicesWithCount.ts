import IPaidService from '@/interfaces/IPaidService';

export default interface IPaidServicesWithCount {
  paidServices: IPaidService[];
  count: number;
}
