export default interface IAdminMenu {
  title: string;
  to: string;
  icon?: string;
  showTo?: string[];
  children?: IAdminMenu[];
  tableName?: string;
  count?: number;
}
