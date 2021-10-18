export default class Diplom implements IDiplom {
  id?: string;

  name: string;

  diplomNumber: string;

  diplomDate: string;

  constructor(diplom?: IDiplom) {
    if (!diplom) return;
    this.id = diplom.id;

    this.name = diplom.name;

    this.diplomNumber = diplom.diplomNumber;

    this.diplomDate = diplom.diplomDate;
  }
}
