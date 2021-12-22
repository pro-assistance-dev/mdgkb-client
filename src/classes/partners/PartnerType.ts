import IPartnerType from '@/interfaces/partners/IPartnerType';

export default class PartnerType implements IPartnerType {
  id?: string;
  name = '';
  slug = '';
  showImage = false;

  constructor(partnerType?: IPartnerType) {
    if (!partnerType) {
      return;
    }
    this.id = partnerType.id;
    this.name = partnerType.name;
    this.slug = partnerType.slug;
    this.showImage = partnerType.showImage;
  }
}
