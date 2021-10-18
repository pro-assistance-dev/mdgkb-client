import IContactInfo from '@/interfaces/contacts/IContactInfo';

export default interface IVacancyResponse {
  id?: string;
  vacancyId?: string;
  responseDate: Date;
  coverLetter: string;
  viewed: boolean;
  sended: boolean;

  contactInfo: IContactInfo;
}
