import IContactInfo from '@/interfaces/contacts/IContactInfo';
import IFileInfo from '@/interfaces/files/IFileInfo';

export default interface IHuman {
  id?: string;
  name: string;
  surname: string;
  patronymic: string;
  isMale: boolean;
  dateBirth?: Date;
  slug: string;
  getFullName: () => string;

  photoId?: string;
  photo: IFileInfo;

  contactInfo: IContactInfo;
  sanitizeName: () => void;
}
