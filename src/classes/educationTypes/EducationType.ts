export default class EducationType implements IEducationType {
  id?: string;

  constructor(educationType?: IEducationType) {
    if (!educationType) return;
    this.id = educationType.id;
  }
}
