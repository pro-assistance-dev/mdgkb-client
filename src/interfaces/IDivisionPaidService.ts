import Division from '@/classes/Division';
import IPaidService from '@/interfaces/IPaidService';

export default interface IDivisionPaidService {
  id?: string;
  division?: Division;
  divisionId?: string;
  paidService?: IPaidService;
  paidServiceId?: string;
}
