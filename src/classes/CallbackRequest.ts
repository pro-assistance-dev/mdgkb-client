import ICallbackRequest from '@/interfaces/ICallbackRequest';

export default class CallbackRequest implements ICallbackRequest {
  id?: string;
  name = '';
  description = '';
  phone = '';

  constructor(i?: ICallbackRequest) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.description = i.description;
    this.phone = i.phone;
  }
}
