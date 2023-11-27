import FileInfo from '@/classes/FileInfo';
import PartnerType from '@/classes/PartnerType';
import ClassHelper from '@/services/ClassHelper';

export default class Partner {
  id?: string;
  name = '';
  link = '';
  image: FileInfo = new FileInfo();
  imageId?: string;
  @ClassHelper.GetClassConstructor(PartnerType)
  partnerType?: PartnerType;
  partnerTypeId?: string;

  constructor(i?: Partner) {
    ClassHelper.BuildClass(this, i);
  }
}
