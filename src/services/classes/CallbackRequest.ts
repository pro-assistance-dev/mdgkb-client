import ClassHelper from '@/services/ClassHelper';

export default class CallbackRequest {
  id?: string;
  name = '';
  description = '';
  phone = '';

  constructor(i?: CallbackRequest) {
    ClassHelper.BuildClass(this, i);
  }
}
