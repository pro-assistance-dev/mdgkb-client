import PublicDocumentType from '@/classes/document/PublicDocumentType';
import IDocumentType from '@/interfaces/document/IDocumentType';
import IPublicDocumentType from '@/interfaces/document/IPublicDocumentType';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IEducationPublicDocumentType from '@/interfaces/IEducationPublicDocumentType';

export default class EducationPublicDocumentType implements IEducationPublicDocumentType {
  id?: string;
  publicDocumentType: IPublicDocumentType = new PublicDocumentType();
  publicDocumentTypeId?: string;

  constructor(i?: IEducationPublicDocumentType) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.publicDocumentType = i.publicDocumentType;
    if (i.publicDocumentType) {
      this.publicDocumentType = new PublicDocumentType(i.publicDocumentType);
    }
  }

  getFileInfos(): IFileInfo[] {
    const fileInfos: IFileInfo[] = [];
    this.publicDocumentType.documentTypes.forEach((d: IDocumentType) => {
      fileInfos.push(...d.getFileInfos());
    });
    return fileInfos;
  }
}
