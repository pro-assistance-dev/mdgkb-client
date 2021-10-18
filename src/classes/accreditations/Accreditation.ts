export default class Accreditation implements IAccreditation {
  id?: string;

  specialization: string;

  startDate: string;

  endDate: string;

  document: string;

  constructor(accreditation?: IAccreditation) {
    if (!accreditation) return;
    this.id = accreditation.id;

    this.specialization = accreditation.specialization;

    this.startDate = accreditation.startDate;

    this.endDate = accreditation.endDate;

    this.document = accreditation.document;
  }
}
