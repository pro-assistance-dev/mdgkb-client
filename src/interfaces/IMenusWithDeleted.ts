import Menu from '@/classes/Menu';

export default interface IMenusWithDeleted {
  menus: Menu[];
  menusForDeleted: string[];
}
