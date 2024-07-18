export default class PaidService {
  id?: string;
  code = '';
  name = '';
  price = 0;
  duration = '';

  constructor(i?: PaidService) {
    ClassHelper.BuildClass(this, i);
  }
}
