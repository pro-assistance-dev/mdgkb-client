import FTSP from './classes/filters/FTSP';
import { getStore } from '@/main';
enum Methods {
  GetAll = 'getAll',
  Get = 'get',
  FTSP = 'ftsp',
  Create = 'create',
  Update = 'update',
}

interface GetAllOptions {
  ftsp?: FTSP;
  qid?: string;
  withCache?: boolean;
}

interface GetOptions {
  id?: FTSP;
  method?: string;
}

// import store from '../store';
import { ComputedRef, computed } from 'vue';

export default abstract class Store {
  static async dispatch(request: string, opts?: GetAllOptions) {
    await getStore().dispatch(request, opts);
  }
  static getters(module: string) {
    return computed(() => getStore().getters[module]);
  }

  static commit(request: string, data?: unknown) {
    getStore().commit(request, data);
  }
  static async FTSP(module: string, opts: GetAllOptions) {
    await Store.dispatch(`${module}/${Methods.FTSP}`, opts);
  }
  static Items(module: string, getter = 'items'): ComputedRef {
    return Store.getters(`${module}/${getter}`);
  }

  static Item(module: string, getter = 'item'): ComputedRef {
    return computed(() => getStore().getters[`${module}/${getter}`]);
  }

  static async GetAll(module: string, opts?: GetAllOptions) {
    await Store.dispatch(`${module}/${Methods.GetAll}`, opts);
  }

  static async Get(module: string, id: string) {
    await getStore().dispatch(`${module}/${Methods.Get}`, id);
  }

  static async Update(module: string, data: unknown) {
    await getStore().dispatch(`${module}/${Methods.Update}`, data);
  }
  static Set(moduleAndGetter: string, data: unknown): void {
    getStore().commit(`${moduleAndGetter}`, data);
  }
}
