import IPathPermissionRole from '@/interfaces/IPathPermissionRole';

export default interface IPathPermission {
  id?: string;
  resource: string;
  pathPermissionRoles: IPathPermissionRole[];
}
