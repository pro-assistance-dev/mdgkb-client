import IPathPermission from '@/interfaces/IPathPermission';

export default interface IPathPermissionRole {
  id?: string;
  pathPermission: IPathPermission;
  pathPermissionId?: string;
  role: Role;
  roleId?: string;
}
