import ContactInfo from '@/classes/contacts/ContactInfo';
import FileInfo from '@/classes/File/FileInfo';
import IContactInfo from '@/interfaces/contacts/IContactInfo';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IHuman from '@/interfaces/IHuman';
import StringsService from '@/services/Strings';

export default class Human implements IHuman {
  id?: string;
  name = '';
  surname = '';
  patronymic = '';
  citizenship = '';
  placeBirth = '';
  carNumber = '';
  carModel = '';
  snils = '';
  photoId?: string;
  photo: IFileInfo = new FileInfo();
  photoMiniId?: string;
  photoMini: IFileInfo = new FileInfo();
  isMale = true;
  dateBirth?: Date;
  contactInfo: IContactInfo = new ContactInfo();
  slug = '';
  postIndex = '';
  address = '';
  constructor(i?: IHuman) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.surname = i.surname;
    this.patronymic = i.patronymic;
    this.snils = i.snils;
    this.isMale = i.isMale;
    this.dateBirth = i.dateBirth;
    this.slug = i.slug;
    this.citizenship = i.citizenship;
    this.placeBirth = i.placeBirth;
    this.carNumber = i.carNumber;
    this.carModel = i.carModel;

    if (i.photo) {
      this.photo = new FileInfo(i.photo);
    }

    if (i.photoMini) {
      this.photoMini = new FileInfo(i.photoMini);
    }

    if (i.contactInfo) {
      this.contactInfo = new ContactInfo(i.contactInfo);
    }

    this.postIndex = i.postIndex;
    this.address = i.address;
  }

  getFullName(): string {
    return `${this.surname} ${this.name} ${this.patronymic}`;
  }

  getGender(full?: boolean): string {
    if (full) {
      return this.isMale ? 'Мужской' : 'Женский';
    }
    return this.isMale ? 'М' : 'Ж';
  }

  capitalizeName(): void {
    this.name = StringsService.capitalizeString(this.name);
    this.surname = StringsService.capitalizeString(this.surname);
    this.patronymic = StringsService.capitalizeString(this.patronymic);
  }

  trimName(): void {
    this.name = this.name.trim();
    this.surname = this.surname.trim();
    this.patronymic = this.patronymic.trim();
  }

  sanitizeName(): void {
    this.capitalizeName();
    this.trimName();
  }

  getFileInfos(): IFileInfo[] {
    const fileInfos: IFileInfo[] = [];
    fileInfos.push(this.photo);
    fileInfos.push(this.photoMini);
    return fileInfos;
  }

  removePhoto(): void {
    this.photo = new FileInfo();
    this.photoId = undefined;
  }
  removePhotoMini(): void {
    this.photoMini = new FileInfo();
    this.photoMiniId = undefined;
  }
}
