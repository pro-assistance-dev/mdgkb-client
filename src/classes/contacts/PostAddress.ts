import IPostAddress from '@/interfaces/contacts/IPostAddress';

export default class PostAddress implements IPostAddress {
  id?: string;
  address?: string;
  description?: string;

  constructor(p?: IPostAddress) {
    if (!p) {
      return;
    }

    this.id = p.id;
    this.address = p.address;
    this.description = p.description;
  }
}
