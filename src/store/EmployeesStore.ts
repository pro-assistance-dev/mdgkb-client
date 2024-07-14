import Employee from '@/classes/Employee';
import BaseStore from '@/services/BaseStore';

class S extends BaseStore<Employee> {
  constructor() {
    super(Employee, 'employees');
  }
}

const store: S = new S();
export default store;
