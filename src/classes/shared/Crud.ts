import ICrud from '@/interfaces/shared/ICrud';

// import router from '../../router';

export default class Crud implements ICrud {
  storeModule = '';
  // route = '';
  // router?: Router;

  constructor(storeModule: string, route: string) {
    this.storeModule = storeModule;

    // console.log(store);
    // this.route = route;
    // this.router = router;
  }

  commit = <T>(commit: string, param?: T): void => {
    // if (!this.store) {
    //   return;
    // }
    // store.commit(`${this.storeModule}/${commit}`, param);
  };

  edit = async (id: string): Promise<void> => {
    // if (!this.router) {
    //   return;
    // }
    // await this.router.push(`/${this.storeModule}/${id}`);
  };

  create = async (): Promise<void> => {
    // if (!this.router) {
    //   return;
    // }
    // await this.router.push(`/${this.storeModule}/new`);
  };

  remove = async (id: string): Promise<void> => {
    // console.log(this.store);
    // if (!this.store) {
    //   return;
    // }
    // await this.store.dispatch(`${this.storeModule}/remove`, id);
  };
}
