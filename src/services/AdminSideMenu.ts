import IAdminMenu from '../interfaces/IAdminMenu';

class AdminSideMenuC {
  private menu: IAdminMenu[] = [];
  private path = '';
  private isOpen = true;
  filterString = '';

  Set(menu: IAdminMenu[]): void {
    this.menu = menu;
  }

  Get(): IAdminMenu[] {
    if (!this.filterString) {
      return this.menu;
    }
    return this.filterMenu();
  }

  private filterMenu(): IAdminMenu[] {
    return this.menu.filter((m: IAdminMenu) => {
      return Strings.SearchIn(m.name, this.filterString) || m.children.some((c: IAdminMenu) => Strings.SearchIn(c.name, this.filterString));
    });
  }

  IsOpen(): boolean {
    return this.isOpen;
  }

  Toggle(): void {
    this.isOpen = !this.isOpen;
  }
  SetPath(path: string): void {
    this.path = path;
  }

  GetPath(): string {
    return this.path;
  }
  SetFilter(str: string): void {
    this.filterString = str;
  }

  GetChildren(menu: IAdminMenu): IAdminMenu {
    if (!this.filterString) {
      return menu.children;
    }
    return menu.children.filter((c: IAdminMenu) => Strings.SearchIn(c.name, this.filterString));
  }
}

export default new AdminSideMenuC();
