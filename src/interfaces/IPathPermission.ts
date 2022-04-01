import IPathPermissionRole from '@/interfaces/IPathPermissionRole';

export default interface IPathPermission {
  id?: string;
  resource: string;
  pathPermissionsRoles: IPathPermissionRole[];
  pathPermissionsRolesForDelete: string[];
  setRole: (added: boolean, roleId: string) => void;
  checkPermissionForRole: (roleId: string) => boolean;
}
