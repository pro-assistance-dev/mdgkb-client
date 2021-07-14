import IBuilding from "@/interfaces/buildings/IBuilding";

export default class Building implements IBuilding {
  id: string = '';
  address: string = ''
  name: string = ''
  status: string = ''
  description: string = ''

  constructor(i?: IBuilding) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.address = i.address;
    this.name = i.name;
    this.status = i.status;
    this.description = i.description
  }
}
