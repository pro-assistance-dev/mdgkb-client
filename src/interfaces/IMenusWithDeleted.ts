import Menu from '@/services/classes/Menu';

export default interface IMenusWithDeleted {
  menus: Menu[];
  menusForDeleted: string[];
}
