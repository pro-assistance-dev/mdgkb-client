import MedicalProfile from '@/classes/MedicalProfile';
import News from '@/classes/News';
import ClassHelper from '@/services/ClassHelper';

export default class MedicalProfileNews {
  id?: string;
  medicalProfileId?: string;
  medicalProfile?: MedicalProfile;
  news?: News;
  newsId?: string;

  constructor(i?: MedicalProfileNews) {
    ClassHelper.BuildClass(this, i);
  }
}
