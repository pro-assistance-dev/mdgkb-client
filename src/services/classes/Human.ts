import Contact from '@/services/classes/Contact';
import FileInfo from '@/services/classes/FileInfo';
import ClassHelper from '@/services/ClassHelper';
import Strings from '@/services/Strings';

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
  @ClassHelper.GetClassConstructor(Contact)
  contact: Contact = new Contact();
  contactId?: string;
  slug = '';
  postIndex = '';
  address = '';

  editNameMode = false;

  constructor(i?: Human) {
    ClassHelper.BuildClass(this, i);
  }

  setEditNameMode(value: boolean): void {
    this.editNameMode = value;
  }

  getFullName(): string {
    if (!this.surname.length && !this.name.length && !this.patronymic.length) {
      return '';
    }
    return `${this.surname} ${this.name} ${this.patronymic}`;
  }

  getInitialsName(): string {
    return `${this.name.slice(0, 1)}.${this.patronymic.slice(0, 1)}. ${this.surname}`;
  }
  getGender(full?: boolean): string {
    if (full) {
      return this.isMale ? 'Мужской' : 'Женский';
    }
    return this.isMale ? 'М' : 'Ж';
  }

  capitalizeName(): void {
    this.name = Strings.CapitalizeString(this.name);
    this.surname = Strings.CapitalizeString(this.surname);
    this.patronymic = Strings.CapitalizeString(this.patronymic);
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

  setFullName(human: Human): void {
    this.surname = human.surname;
    this.name = human.name;
    this.patronymic = human.patronymic;
  }

  initContact() {
    this.contact = Contact.Create();
    this.contactId = this.contact.id;
  }
}
