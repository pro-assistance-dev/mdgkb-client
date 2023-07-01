import ClassHelper from '@/services/ClassHelper';

export default class KladrApi {
  regionId = '';
  districtId = '';
  cityId = '';
  streetId = '';
  buildingId = '';
  query = '';

  constructor(i?: KladrApi) {
    ClassHelper.BuildClass(this, i);
  }

  setRegionId(item: string): void {
    this.regionId = item;
  }

  setCityId(item: string): void {
    this.cityId = item;
  }

  setStreetId(item: string): void {
    this.streetId = item;
  }

  setBuildingId(item: string): void {
    this.buildingId = item;
  }

  dropRegion(): void {
    this.regionId = '';
    this.dropCity();
  }

  dropCity(): void {
    this.cityId = '';
    this.dropStreet();
  }

  dropStreet(): void {
    this.streetId = '';
    this.dropBuilding();
  }

  dropBuilding(): void {
    this.buildingId = '';
  }
}
