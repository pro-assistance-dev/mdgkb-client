export default interface IStreetEntranceRef {
  id?: string;
  name?: string;
  building: string;
  entrance: string;

  getBuildingNumber: () => string;
  getEntranceNumber: () => string;
}
