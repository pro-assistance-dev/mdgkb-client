import { v4 as uuidv4 } from 'uuid';

import CustomSection from '@/classes/CustomSection';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IPageImage from '@/interfaces/page/IPageImage';
import ContactInfo from '@/services/classes/ContactInfo';
import PageComment from '@/services/classes/page/PageComment';
import PageDocument from '@/services/classes/page/PageDocument';
import PageImage from '@/services/classes/page/PageImage';
import PageSection from '@/services/classes/page/PageSection';
import PageSideMenu from '@/services/classes/page/PageSideMenu';
import Role from '@/services/classes/Role';
import ClassHelper from '@/services/ClassHelper';

export default class Page {
  id?: string;
  title = '';
  content = '';
  slug = '';
  pagesGroup = 'Без группы';
  link = '';
  withComments = false;
  showContacts = false;
  collaps = false;
  showContent = false;
  @ClassHelper.GetClassConstructor(PageImage)
  pageImages: PageImage[] = [];
  pageImagesForDelete: string[] = [];
  pageImagesNames: string[] = [];
  @ClassHelper.GetClassConstructor(PageSideMenu)
  pageSideMenus: PageSideMenu[] = [];
  pageSideMenusForDelete: string[] = [];
  @ClassHelper.GetClassConstructor(PageSection)
  pageSections: PageSection[] = [];
  pageSectionsForDelete: string[] = [];
  @ClassHelper.GetClassConstructor(PageDocument)
  pageDocuments: PageDocument[] = [];
  @ClassHelper.GetClassConstructor(PageComment)
  pageComments: PageComment[] = [];
  contactInfo: ContactInfo = new ContactInfo();
  contactInfoId?: string;
  role: Role = new Role();
  roleId?: string;

  constructor(i?: Page) {
    ClassHelper.BuildClass(this, i);
  }

  getLink(): string {
    if (this.slug !== '') {
      return `/pages/${this.slug}`;
    }
    return '404';
  }

  getFileInfos(): IFileInfo[] {
    const fileInfos: IFileInfo[] = [];
    this.pageSideMenus.forEach((item: PageSideMenu) => {
      fileInfos.push(...item.getFileInfos());
    });
    this.pageDocuments.forEach((pageDocument: PageDocument) => {
      if (pageDocument.document.scan) {
        fileInfos.push(pageDocument.document.scan);
      }
    });
    this.pageImages.forEach((pageImage: IPageImage) => {
      if (pageImage.fileInfo) {
        fileInfos.push(pageImage.fileInfo);
      }
    });
    return fileInfos;
  }

  addSideMenu(): string {
    const menu = new PageSideMenu();
    menu.order = this.pageSideMenus.length + 1;
    menu.name = `Новое меню ${menu.order}`;
    menu.id = uuidv4();
    this.pageSideMenus.push(menu);
    return menu.id;
  }

  selectSideMenu(value: string, isId: boolean): void {
    if (!value && this.pageSideMenus.length > 0) {
      this.pageSideMenus[0].selected = true;
      return;
    }
    this.pageSideMenus.forEach((m: PageSideMenu) => {
      if (isId) {
        m.selected = m.id === value;
      } else {
        m.selected = m.slug === value;
      }
    });
  }

  getSelectedSideMenu(): PageSideMenu {
    const selectedMenu = this.pageSideMenus.find((m: PageSideMenu) => m.selected);
    return selectedMenu ? selectedMenu : new PageSideMenu();
  }

  addCustomSectionsToSideMenu(customSections: CustomSection[]): void {
    customSections.forEach((c: CustomSection) => {
      const menu = new PageSideMenu();
      menu.id = c.id;
      menu.name = c.name;
      if (typeof c.order !== 'undefined') {
        this.pageSideMenus.splice(c.order, 0, menu);
      } else {
        this.pageSideMenus.push(menu);
      }
    });
  }

  getPageSideMenus(): PageSideMenu[] {
    if (this.showContacts && !this.pageSideMenus.find((el) => el.id === 'contacts')) {
      const contactSideMenu = new PageSideMenu();
      contactSideMenu.id = 'contacts';
      contactSideMenu.name = 'Контакты';
      this.pageSideMenus.push(contactSideMenu);
    }
    return this.pageSideMenus;
  }
}
