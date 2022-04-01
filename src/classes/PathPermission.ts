import PathPermissionRole from '@/classes/PathPermissionRole';
import IPathPermission from '@/interfaces/IPathPermission';
import IPathPermissionRole from '@/interfaces/IPathPermissionRole';
import removeFromClass from '@/mixins/removeFromClass';

export default class PathPermission implements IPathPermission {
  id?: string;
  resource = '';
  pathPermissionsRoles: IPathPermissionRole[] = [];
  pathPermissionsRolesForDelete: string[] = [];
  constructor(i?: IPathPermission) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.resource = i.resource;
    if (i.pathPermissionsRoles) {
      this.pathPermissionsRoles = i.pathPermissionsRoles.map((i: IPathPermissionRole) => new PathPermissionRole(i));
    }
  }

  setRole(added: boolean, roleId: string): void {
    if (!added) {
      return this.removeRole(roleId);
    }
    return this.addRole(roleId);
  }

  removeRole(roleId: string): void {
    const index = this.pathPermissionsRoles.findIndex((p: IPathPermissionRole) => p.roleId === roleId);
    if (index < 0) {
      return;
    }
    return removeFromClass(index, this.pathPermissionsRoles, this.pathPermissionsRolesForDelete);
  }

  addRole(roleId: string): void {
    const existingPermission = this.pathPermissionsRoles.find((p: IPathPermissionRole) => p.roleId === roleId);
    if (existingPermission) {
      return;
    }
    const pathPermissionRole = new PathPermissionRole();
    pathPermissionRole.roleId = roleId;
    pathPermissionRole.pathPermissionId = this.id;
    this.pathPermissionsRoles.push(pathPermissionRole);
  }

  checkPermissionForRole(roleId: string): boolean {
    return !!this.pathPermissionsRoles.find((pr: IPathPermissionRole) => roleId === pr.roleId);
  }
}
