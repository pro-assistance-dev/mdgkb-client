import Email from '@/services/classes/Email';
import PostAddress from '@/services/classes/PostAddress';
import TelephoneNumber from '@/services/classes/TelephoneNumber';
import Website from '@/services/classes/Website';
import ClassHelper from '@/services/ClassHelper';

export default class ContactInfo {
  id?: string;
  description = '';
  time = '';
  latitude = '';
  longitude = '';
  @ClassHelper.GetClassConstructor(Email)
  emails: Email[] = [new Email()];
  @ClassHelper.GetClassConstructor(PostAddress)
  postAddresses: PostAddress[] = [new PostAddress()];
  @ClassHelper.GetClassConstructor(TelephoneNumber)
  telephoneNumbers: TelephoneNumber[] = [new TelephoneNumber()];
  @ClassHelper.GetClassConstructor(Website)
  websites: Website[] = [new Website()];
  emailsForDelete: string[] = [];
  postAddressesForDelete: string[] = [];
  telephoneNumbersForDelete: string[] = [];
  websitesForDelete: string[] = [];
  constructor(i?: ContactInfo) {
    ClassHelper.BuildClass(this, i);
  }
  addEmail(): void {
    this.emails.push(new Email());
  }
  addPostAddress(): void {
    this.postAddresses.push(new PostAddress());
  }
  addTelephoneNumber(): void {
    this.telephoneNumbers.push(new TelephoneNumber());
  }
  addWebsite(): void {
    this.websites.push(new Website());
  }
  pushFirstInfo(): void {
    if (!this.emails.length) {
      this.emails.push(new Email());
    }
    if (!this.telephoneNumbers.length) {
      this.telephoneNumbers.push(new TelephoneNumber());
    }
  }
  getCoords(): number[] {
    return [Number(this.latitude), Number(this.longitude)];
  }

  static CreateBufetContacts(): ContactInfo {
    const contactInfo = new ContactInfo();
    const address = new PostAddress();
    address.address = '4-й Добрынинский пер., 4, 1А корпус, 7й этаж';
    contactInfo.postAddresses[0] = address;
    return contactInfo;
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
