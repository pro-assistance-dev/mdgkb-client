import IVacancy from '@/interfaces/vacancies/IVacancy';

export default class Vacancy implements IVacancy {
  id?;
  title = '';
  description = '';
  specialization = '';
  salary = '';

  constructor(vacancy?: IVacancy) {
    if (!vacancy) {
      return;
    }
    this.id = vacancy.id;
    this.title = vacancy.title;
    this.description = vacancy.description;
    this.specialization = vacancy.specialization;
    this.salary = vacancy.salary;
  }
}
