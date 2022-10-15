import PublicDocumentType from '@/classes/document/PublicDocumentType';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IDocumentType from '@/interfaces/IDocumentType';
import IEducationPublicDocumentType from '@/interfaces/IEducationPublicDocumentType';
import IPublicDocumentType from '@/interfaces/IPublicDocumentType';

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
