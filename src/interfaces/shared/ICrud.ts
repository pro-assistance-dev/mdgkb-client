import { Router } from 'vue-router';
import { Store } from 'vuex';

export default interface ICrud {
  storeModule: string;
  router: Router;
  store: Store<unknown>;

  edit: (id: string) => void;
  create: () => void;
  remove: (id: string) => Promise<void>;

  commit: <T>(commit: string, param?: T) => void;
}
