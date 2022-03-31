import PathPermissionRole from '@/classes/PathPermissionRole';
import IPathPermission from '@/interfaces/IPathPermission';
import IPathPermissionRole from '@/interfaces/IPathPermissionRole';

export default class PathPermission implements IPathPermission {
  id?: string;
  resource = '';
  pathPermissionRoles: IPathPermissionRole[] = [];

  constructor(i?: IPathPermission) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.resource = i.resource;
    if (i.pathPermissionRoles) {
      this.pathPermissionRoles = i.pathPermissionRoles.map((i: IPathPermissionRole) => new PathPermissionRole(i));
    }
  }
}
