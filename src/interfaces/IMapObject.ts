export default interface IMapObject {
  id?: string;
  getBuildingNumber: () => string;
  getEntranceNumber: () => string;
}
