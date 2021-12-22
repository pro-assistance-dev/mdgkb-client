import IFileInfo from '@/interfaces/files/IFileInfo';
import IPartnerType from '@/interfaces/partners/IPartnerType';

export default interface IPartner {
  id?: string;
  name: string;
  link: string;
  image?: IFileInfo;
  imageId?: string;
  partnerType?: IPartnerType;
  partnerTypeId?: string;
}
