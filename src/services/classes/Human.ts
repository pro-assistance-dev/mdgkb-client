import FileInfo from '@/classes/FileInfo';
import ContactInfo from '@/services/classes/ContactInfo';
import ClassHelper from '@/services/ClassHelper';
import StringsService from '@/services/Strings';

export default class Human {
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
  photo: FileInfo = new FileInfo();
  photoMiniId?: string;
  photoMini: FileInfo = new FileInfo();
  isMale = true;
  dateBirth = new Date();
  @ClassHelper.GetClassConstructor(ContactInfo)
  contactInfo: ContactInfo = new ContactInfo();
  slug = '';
  postIndex = '';
  address = '';

  constructor(i?: Human) {
    ClassHelper.BuildClass(this, i);
  }

  getFullName(): string {
    if (!this.surname.length && !this.name.length && !this.patronymic.length) {
      return '';
    }
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
    this.trimName();
    this.capitalizeName();
  }

  getFileInfos(): FileInfo[] {
    const fileInfos: FileInfo[] = [];
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
