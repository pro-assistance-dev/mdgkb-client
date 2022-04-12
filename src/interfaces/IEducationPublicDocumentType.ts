import IPublicDocumentType from '@/interfaces/document/IPublicDocumentType';
import IFileInfo from '@/interfaces/files/IFileInfo';

export default interface IEducationPublicDocumentType {
  id?: string;
  publicDocumentType: IPublicDocumentType;
  publicDocumentTypeId?: string;

  getFileInfos: () => IFileInfo[];
}
