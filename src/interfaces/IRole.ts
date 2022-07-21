import { RoleName } from '@/interfaces/RoleName';

export default interface IRole {
  id?: string;
  name: RoleName;
  label: string;
  startPage: string;
}
