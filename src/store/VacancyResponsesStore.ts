import Form from '@/classes/Form';
import User from '@/classes/User';
import Vacancy from '@/classes/Vacancy';
import VacancyResponse from '@/classes/VacancyResponse';
import BaseStore from '@/services/BaseStore';

class S extends BaseStore<VacancyResponse> {
  emailExists = ref(false);
  constructor() {
    super(VacancyResponse, 'vacancy-responses');
  }
  SetFormValue(form: Form) {
    this.item.formValue = new Form(form);
  }
  SetVacancy(vacancy: Vacancy) {
    // this.item.vacancy = new Vacancy(vacancy);
    this.item.vacancyId = vacancy.id;
  }
  SetUser(user: User) {
    this.item.formValue.user = new User(user);
  }
  SetEmailExists(emailExists: boolean) {
    this.emailExists.value = emailExists;
  }
  // pdf: async (_, id: string): Promise<void> => {
  //   await httpClient.get<VacancyResponse>({
  //     query: `pdf/${id}`,
  //     isBlob: true,
  //   });
  // },
  // emailExists: async ({ state, commit }, vacancyId): Promise<void> => {
  //   if (state.item.formValue.user.email.length < 3) {
  //     return;
  //   }
  //   const res = await httpClient.get<boolean>({ query: `email-exists/${state.item.formValue.user.email}/${vacancyId}` });
  //   commit('setEmailExists', res);
  // },
}

const store: S = new S();
export default store;
