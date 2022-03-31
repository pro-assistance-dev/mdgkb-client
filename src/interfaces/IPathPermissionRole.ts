import IPathPermission from '@/interfaces/IPathPermission';
import IRole from '@/interfaces/IRole';

export default interface IPathPermissionRole {
  id?: string;
  pathPermission: IPathPermission;
  pathPermissionId?: string;
  role: IRole;
  roleId?: string;
}
