import IDivision from '@/interfaces/IDivision';
import IPaidService from '@/interfaces/IPaidService';

export default interface IDivisionPaidService {
  id?: string;
  division?: IDivision;
  divisionId?: string;
  paidService?: IPaidService;
  paidServiceId?: string;
}
