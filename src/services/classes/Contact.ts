import Email from '@/services/classes/Email';
import Phone from '@/services/classes/Phone';
import PostAddress from '@/services/classes/PostAddress';
import Website from '@/services/classes/Website';
import ClassHelper from '@/services/ClassHelper';

export default class Contact {
  id?: string;
  description = '';
  time = '';
  latitude = '';
  longitude = '';
  @ClassHelper.GetClassConstructor(Email)
  emails: Email[] = [];
  @ClassHelper.GetClassConstructor(PostAddress)
  postAddresses: PostAddress[] = [new PostAddress()];
  @ClassHelper.GetClassConstructor(Phone)
  phones: Phone[] = [];
  @ClassHelper.GetClassConstructor(Website)
  websites: Website[] = [];

  constructor(i?: Contact) {
    ClassHelper.BuildClass(this, i);
  }

  addEmail(): Email {
    const item = Email.Create();
    item.contactId = this.id;
    this.emails.push(item);
    return item;
  }

  addPhone(): Phone {
    const item = Phone.Create();
    item.contactId = this.id;
    this.phones.push(item);
    return item;
  }

  static Create(): Contact {
    const item = new Contact();
    item.id = ClassHelper.CreateUUID();
    return item;
  }

  removeEmail(id: string): void {
    ClassHelper.RemoveFromClassById(id, this.emails);
  }

  removePhone(id: string): void {
    ClassHelper.RemoveFromClassById(id, this.phones);
  }

  addPostAddress(): void {
    this.postAddresses.push(new PostAddress());
  }
  addWebsite(): void {
    this.websites.push(new Website());
  }
  pushFirst(): void {
    if (!this.emails.length) {
      this.emails.push(new Email());
    }
    if (!this.phones.length) {
      this.phones.push(new Phone());
    }
  }

  getCoords(): number[] {
    return [Number(this.latitude), Number(this.longitude)];
  }

  static CreateBufetContacts(): Contact {
    const contact = new Contact();
    const address = new PostAddress();
    address.address = '4-й Добрынинский пер., 4, 1А корпус, 7й этаж';
    contact.postAddresses[0] = address;
    return contact;
  }

  updateDescription(e: string): void {
    this.description = e;
  }

  updateTime(e: string): void {
    this.time = e;
  }

  updateLatitude(e: string): void {
    this.latitude = e;
  }

  updateLongitutde(e: string): void {
    this.longitude = e;
  }
}
