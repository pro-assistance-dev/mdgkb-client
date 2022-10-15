import IFileInfo from '@/interfaces/files/IFileInfo';
import IPublicDocumentType from '@/interfaces/IPublicDocumentType';

export default interface IEducationPublicDocumentType {
  id?: string;
  publicDocumentType: IPublicDocumentType;
  publicDocumentTypeId?: string;

  getFileInfos: () => IFileInfo[];
}
