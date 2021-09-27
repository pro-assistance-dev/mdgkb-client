import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import ICrud from '@/interfaces/shared/ICrud';

export default class Crud implements ICrud {
  storeModule = '';
  store = useStore();
  router = useRouter();

  constructor(storeModule: string) {
    this.storeModule = storeModule;
  }

  commit = <T>(commit: string, param?: T): void => {
    this.store.commit(`${this.storeModule}/${commit}`, param);
  };

  edit = async (id: string): Promise<void> => {
    await this.router.push(`/${this.storeModule}/${id}`);
  };

  create = async (): Promise<void> => {
    await this.router.push(`/${this.storeModule}/new`);
  };

  remove = async (id: string): Promise<void> => {
    await this.store.dispatch(`${this.storeModule}/delete`, id);
  };
}
