import IWebsite from '@/interfaces/contacts/IWebsite';

export default class Website implements IWebsite {
  id?: string;
  address?: string;
  description?: string;

  constructor(site?: IWebsite) {
    if (!site) {
      return;
    }

    this.id = site.id;
    this.address = site.address;
    this.description = site.description;
  }
}
