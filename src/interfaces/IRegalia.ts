import Regalia from '@/classes/Regalia';

export default interface IRegalia {
  constructor: Regalia;
  id?: string;
  name: string;
  employeeId?: string;
}
