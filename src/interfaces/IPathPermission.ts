import IPathPermissionRole from '@/interfaces/IPathPermissionRole';

export default interface IPathPermission {
  id?: string;
  resource: string;
  guestAllow: boolean;
  pathPermissionsRoles: IPathPermissionRole[];
  pathPermissionsRolesForDelete: string[];
  setRole: (added: boolean, roleId: string) => void;
  checkPermissionForRole: (roleId: string) => boolean;
  addRole: (roleId: string) => void;
  removeRole: (roleId: string) => void;
}
