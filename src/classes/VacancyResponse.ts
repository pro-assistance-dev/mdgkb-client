import ContactInfo from '@/classes/contacts/ContactInfo';
import IContactInfo from '@/interfaces/contacts/IContactInfo';
import IVacancyResponse from '@/interfaces/vacancyResponse/IVacancyResponse';

export default class VacancyResponse implements IVacancyResponse {
  id?: string;
  vacancyId?: string;
  coverLetter = '';
  responseDate: Date = new Date();
  viewed = false;
  contactInfo: IContactInfo = new ContactInfo();
  sended = false;

  constructor(vacancyResponse?: IVacancyResponse) {
    if (!vacancyResponse) return;
    this.id = vacancyResponse.id;
    this.vacancyId = vacancyResponse.vacancyId;
    this.coverLetter = vacancyResponse.coverLetter;
    this.responseDate = vacancyResponse.responseDate;
    this.viewed = vacancyResponse.viewed;
    if (vacancyResponse) {
      this.contactInfo = new ContactInfo(vacancyResponse.contactInfo);
    }
  }
}
