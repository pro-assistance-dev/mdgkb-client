import IMedicalProfile from '@/interfaces/IMedicalProfile';
import INews from '@/interfaces/news/INews';

export default interface IMedicalProfileNews {
  id?: string;
  medicalProfileId?: string;
  medicalProfile?: IMedicalProfile;
  newsId?: string;
  news?: INews;
}
