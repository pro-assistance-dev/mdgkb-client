import { getStore } from '@/main';

import FaqsStore from './FaqsStore';
import PagesStore from './PagesStore';

enum Methods {
  GetAll = 'getAll',
  Get = 'get',
  FTSP = 'ftsp',
  Create = 'create',
  Update = 'update',
  Remove = 'remove',
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

import { computed, ComputedRef } from 'vue';

class StoreC {
  Faqs = () => FaqsStore();
  Pages = () => ore();
  async Dispatch(request: string, opts?: GetAllOptions | unknown) {
    await getStore().dispatch(request, opts);
  }

  Getters<T>(module: string): ComputedRef<T> {
    return computed(() => getStore().getters[module]);
  }

  Commit(request: string, data?: unknown) {
    getStore().commit(request, data);
  }

  async FTSP(module: string, opts?: GetAllOptions) {
    await Store.Dispatch(`${module}/${Methods.FTSP}`, opts);
  }
  Items(module: string, getter = 'items'): ComputedRef {
    return this.Getters(`${module}/${getter}`);
  }

  Count(module: string): ComputedRef {
    return this.Getters(`${module}/count`);
  }

  Item(module: string, getter = 'item'): ComputedRef {
    return computed(() => getStore().getters[`${module}/${getter}`]);
  }

  async GetAll(module: string, opts?: GetAllOptions) {
    await this.Dispatch(`${module}/${Methods.GetAll}`, opts);
  }

  async Get(module: string, id?: string) {
    await getStore().dispatch(`${module}/${Methods.Get}`, id);
  }

  async Update(module: string, data?: unknown) {
    await getStore().dispatch(`${module}/${Methods.Update}`, data);
  }

  async Create(module: string, data?: unknown) {
    await getStore().dispatch(`${module}/${Methods.Create}`, data);
  }

  AppendToAll(module: string, data: unknown) {
    getStore().commit(`${module}/appendToAll`, data);
  }

  async Remove(module: string, data: unknown) {
    await getStore().dispatch(`${module}/${Methods.Remove}`, data);
  }
}

const Store = new StoreC();
export default Store;
