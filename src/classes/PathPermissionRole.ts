import PathPermission from '@/classes/PathPermission';
import IPathPermission from '@/interfaces/IPathPermission';
import IPathPermissionRole from '@/interfaces/IPathPermissionRole';
import Role from '@/services/classes/Role';

export default class PathPermissionRole implements IPathPermissionRole {
  id?: string;
  resource = '';
  pathPermission: IPathPermission = new PathPermission();
  pathPermissionId?: string;
  role: Role = new Role();
  roleId?: string;

  constructor(i?: IPathPermissionRole) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.pathPermissionId = i.pathPermissionId;
    if (i.pathPermission) {
      this.pathPermission = new PathPermission(i.pathPermission);
    }
    this.roleId = i.roleId;
    if (i.role) {
      this.role = new Role(i.role);
    }
  }
}
