import IContactInfo from '@/interfaces/contacts/IContactInfo';
import IFileInfo from '@/interfaces/files/IFileInfo';

export default interface IHuman {
  id?: string;
  name: string;
  surname: string;
  patronymic: string;
  snils: string;
  isMale: boolean;
  citizenship: string;
  placeBirth: string;
  carNumber: string;
  carModel: string;
  dateBirth: Date;
  slug: string;
  getFullName: () => string;
  getGender: (full?: boolean) => string;

  photoId?: string;
  photo: IFileInfo;

  photoMiniId?: string;
  photoMini: IFileInfo;

  contactInfo: IContactInfo;
  sanitizeName: () => void;

  postIndex: string;
  address: string;
}
