export default class EducationalInstitution implements IEducationalInstitution {
  id?: string;

  constructor(educationalInstitution?: IEducationalInstitution) {
    if (!educationalInstitution) return;
    this.id = educationalInstitution.id;
  }
}
