import FileInfo from '@/classes/File/FileInfo';
import PartnerType from '@/classes/PartnerType';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IPartner from '@/interfaces/partners/IPartner';
import IPartnerType from '@/interfaces/partners/IPartnerType';

export default class Partner implements IPartner {
  id?: string;
  name = '';
  link = '';
  image: IFileInfo = new FileInfo();
  imageId?: string;
  partnerType?: IPartnerType;
  partnerTypeId?: string;

  constructor(partner?: IPartner) {
    if (!partner) {
      return;
    }
    this.id = partner.id;
    this.name = partner.name;
    this.link = partner.link;
    this.imageId = partner.imageId;
    this.partnerTypeId = partner.partnerTypeId;
    if (partner.image) {
      this.image = new FileInfo(partner.image);
    }
    if (partner.partnerType) {
      this.partnerType = new PartnerType(partner.partnerType);
    }
  }
}
