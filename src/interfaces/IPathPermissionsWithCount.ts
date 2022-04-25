import IPathPermission from './IPathPermission';

export default interface IPathPermissionsWithCount {
  pathPermissions: IPathPermission[];
  count: number;
}
