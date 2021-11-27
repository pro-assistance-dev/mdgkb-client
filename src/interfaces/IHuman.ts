import IContactInfo from '@/interfaces/contacts/IContactInfo';

export default interface IHuman {
  id?: string;
  name: string;
  surname: string;
  patronymic: string;
  isMale: boolean;
  dateBirth?: Date;
  slug: string;
  getFullName: () => string;

  contactInfo: IContactInfo;
}
