import ClassHelper from '@/services/ClassHelper';

export default class AddressInfo {
  region = '';
  city = '';
  street = '';
  building = '';
  flat = '';
  zip = 0;
  contactInfoId?: string;

  constructor(i?: AddressInfo) {
    ClassHelper.BuildClass(this, i);
  }

  setRegion(item: string): void {
    this.region = item;
    this.dropCity();
  }

  setCity(item: string, zip?: number): void {
    this.city = item;
    this.zip = zip ?? 0;
    this.dropStreet();
  }

  setStreet(item: string): void {
    this.street = item;
    this.dropBuilding();
  }

  setBuilding(item: string): void {
    this.building = item;
  }

  setFlat(item: string): void {
    this.flat = item;
  }

  dropRegion(): void {
    this.region = '';
    this.dropCity();
  }

  dropCity(): void {
    this.city = '';
    this.dropStreet();
  }

  dropStreet(): void {
    this.street = '';
    this.dropBuilding();
  }

  dropBuilding(): void {
    this.building = '';
  }

  getFullAddress(): string {
    return `${this.zip}, ${this.region}, ${this.city}, ${this.street}, ${this.building}`;
  }
}
