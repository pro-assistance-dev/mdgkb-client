import IMenu from '@/interfaces/IMenu';

export default interface IMenusWithDeleted {
  menus: IMenu[];
  menusForDeleted: string[];
}
