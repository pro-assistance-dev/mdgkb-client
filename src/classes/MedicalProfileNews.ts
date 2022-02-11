import MedicalProfile from '@/classes/MedicalProfile';
import News from '@/classes/news/News';
import IMedicalProfile from '@/interfaces/IMedicalProfile';
import IMedicalProfileNews from '@/interfaces/IMedicalProfileNews';
import INews from '@/interfaces/news/INews';

export default class MedicalProfileNews implements IMedicalProfileNews {
  id?: string;
  medicalProfileId?: string;
  medicalProfile?: IMedicalProfile;
  news?: INews;
  newsId?: string;

  constructor(i?: IMedicalProfileNews) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.medicalProfileId = i.medicalProfileId;
    this.newsId = i.newsId;
    if (i.medicalProfile) {
      this.medicalProfile = new MedicalProfile(i.medicalProfile);
    }
    if (i.news) {
      this.news = new News(i.news);
    }
  }
}
