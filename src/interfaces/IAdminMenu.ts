export default interface IAdminMenu {
  name: string;
  to: string;
  icon?: string;
  showTo?: string[];
  children?: IAdminMenu[];
  tableName?: string;
  count?: number;
}
