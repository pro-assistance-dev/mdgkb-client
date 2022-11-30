import PageSideMenu from '@/classes/PageSideMenu';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IEducationPublicDocumentType from '@/interfaces/IEducationPublicDocumentType';
import IPageSection from '@/interfaces/IPageSection';
import IPageSideMenu from '@/interfaces/IPageSideMenu';

export default class EducationPublicDocumentType implements IEducationPublicDocumentType {
  id?: string;
  publicDocumentType: IPageSideMenu = new PageSideMenu();
  publicDocumentTypeId?: string;

  constructor(i?: IEducationPublicDocumentType) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.publicDocumentType = i.publicDocumentType;
    if (i.publicDocumentType) {
      this.publicDocumentType = new PageSideMenu(i.publicDocumentType);
    }
  }

  getFileInfos(): IFileInfo[] {
    const fileInfos: IFileInfo[] = [];
    this.publicDocumentType.pageSections.forEach((d: IPageSection) => {
      fileInfos.push(...d.getFileInfos());
    });
    return fileInfos;
  }
}
