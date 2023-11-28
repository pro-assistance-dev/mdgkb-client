import ClassHelper from '@/services/ClassHelper';

export default class PartnerType {
  id?: string;
  name = '';
  slug = '';
  showImage = false;

  constructor(i?: PartnerType) {
    ClassHelper.BuildClass(this, i);
  }
}
