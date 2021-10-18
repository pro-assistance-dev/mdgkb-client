export default class Specialization implements ISpecialization {
  id?: string;

  constructor(specialization?: ISpecialization) {
    if (!specialization) return;
    this.id = specialization.id;
  }
}
