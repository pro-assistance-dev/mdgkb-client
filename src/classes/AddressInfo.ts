import ClassHelper from '@/services/ClassHelper';

export default class AddressInfo {
  region = '';
  city = '';
  street = '';
  building = '';
  flat = '';

  regionId = '';
  districtId = '';
  cityId = '';
  streetId = '';
  buildingId = '';

  zip = 0;
  contactInfoId?: string;

  constructor(i?: AddressInfo) {
    ClassHelper.BuildClass(this, i);
  }

  selectRegion(item: string, id: string): void {
    this.region = item;
    this.regionId = id;
    this.dropCity();
  }

  setRegion(value: string): void {
    this.region = value;
  }

  setCity(value: string): void {
    this.city = value;
  }

  setStreet(value: string): void {
    this.street = value;
  }

  setBuilding(value: string): void {
    this.building = value;
  }

  setFlat(value: string): void {
    this.flat = value;
  }

  selectCity(item: string, id: string, zip?: number): void {
    this.city = item;
    this.cityId = id;
    this.zip = zip ?? 0;
    this.dropStreet();
  }

  selectStreet(item: string, id: string): void {
    this.street = item;
    this.streetId = id;
    this.dropBuilding();
  }

  selectBuilding(item: string, id: string): void {
    this.buildingId = id;
    this.building = item;
  }

  selectFlat(item: string): void {
    this.flat = item;
  }

  dropRegion(): void {
    this.region = '';
    this.regionId = '';
    this.dropCity();
  }

  dropCity(): void {
    this.city = '';
    this.cityId = '';
    this.dropStreet();
  }

  dropStreet(): void {
    this.street = '';
    this.streetId = '';
    this.dropBuilding();
  }

  dropBuilding(): void {
    this.building = '';
    this.buildingId = '';
  }

  getFullAddress(): string {
    return `${this.zip}, ${this.region}, ${this.city}, ${this.street}, ${this.building}`;
  }
}
