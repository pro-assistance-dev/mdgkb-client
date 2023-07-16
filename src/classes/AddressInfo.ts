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

  setRegion(item: string, id: string): void {
    this.region = item;
    this.regionId = id;
    this.dropCity();
  }

  setCity(item: string, id: string, zip?: number): void {
    this.city = item;
    this.cityId = id;
    this.zip = zip ?? 0;
    this.dropStreet();
  }

  setStreet(item: string, id: string): void {
    this.street = item;
    this.streetId = id;
    this.dropBuilding();
  }

  setBuilding(item: string, id: string): void {
    this.buildingId = id;
    this.building = item;
  }

  setFlat(item: string, id: string): void {
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
