import IPaidService from '@/interfaces/IPaidService';

export default interface IWithPaidService {
  id?: string;
  paidService?: IPaidService;
  paidServiceId?: string;
}
