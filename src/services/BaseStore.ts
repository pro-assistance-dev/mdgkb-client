import { computed, ComputedRef } from 'vue';

import Cache from '@/services/Cache';
import FileInfo from '@/services/classes/FileInfo';
import FTSP from '@/services/classes/filters/FTSP';
import HttpResponse from '@/services/classes/HttpResponse';
import { Constructable } from '@/services/ClassHelper';
import HttpClient from '@/services/HttpClient';
import IFileInfosGetter from '@/services/interfaces/IFileInfosGetter';
import { IBodyfulParams } from '@/services/interfaces/IHTTPTypes';
import ItemsWithCount from '@/services/interfaces/ItemsWithCount';
import IWithId from '@/services/interfaces/IWithId';

interface GetAllOptions {
  withCache?: boolean;
  ftsp: FTSP;
}

export default class BaseStore<T extends IWithId & IFileInfosGetter> {
  private items: T[] = [];
  private item: T;
  private count = 0;
  private cache = new Cache();
  private classConstructor: Constructable<T>;
  httpClient: HttpClient = new HttpClient();

  constructor(i: Constructable<T>, url: string) {
    this.classConstructor = i;
    this.item = new this.classConstructor();
    this.cache.name = url;
    this.httpClient.endpoint = url;
  }

  // ======= //
  // ACTIONS //
  // ======= //
  async GetAll(options?: GetAllOptions): Promise<void> {
    let res;
    if (options && options.withCache) {
      // res = await this.cache.storeGetWithCache<T[] | ItemsWithCount<T>>(get);
    } else {
      res = await this.httpClient.get<T[] | ItemsWithCount<T>>();
    }
    if (Array.isArray(res)) {
      this.SetAll(res);
    } else {
      this.SetAllWithCount(res as ItemsWithCount<T>);
    }
  }
  async Get(id: string) {
    if (!id) {
      console.warn('noFilterSetInQuery');
    }
    this.Set(await this.httpClient.get<T>({ query: id }));
  }
  async FTSP(options?: GetAllOptions) {
    const ftsp: FTSP = options?.ftsp ?? FTSP.Get();
    const f = ftsp.clearForHTTP();
    const p: IBodyfulParams<unknown> = {
      payload: { ftsp: f },
      query: 'ftsp',
    };
    const res = await this.httpClient.post<unknown, HttpResponse<T[] | ItemsWithCount<T>>>(p);
    if (!res || !res.ftsp) {
      return;
    }
    if (Array.isArray(res.data)) {
      this.SetAll(res.data);
    } else {
      this.SetAllWithCount(res.data);
    }
  }

  async Create(item: T): Promise<T | void> {
    if (!item) {
      item = this.item;
    }
    const opts: IBodyfulParams<T> = { payload: item };
    if (item.getFileInfos) {
      opts.fileInfos = item.getFileInfos();
      opts.fileInfos.forEach((f: FileInfo) => (f.url = ''));
    }
    return await this.httpClient.post<T, T>(opts);
  }

  async CreateAndSet(item: T): Promise<void> {
    const result = await this.Create(item);
    this.Set(result);
  }

  async Update(item?: T): Promise<T | void> {
    if (!item) {
      item = this.item;
    }
    const opts: IBodyfulParams<T> = { query: `${item.id}`, payload: item };
    if (item.getFileInfos) {
      opts.fileInfos = item.getFileInfos();
      opts.fileInfos.forEach((f: FileInfo) => (f.url = ''));
    }
    return await this.httpClient.put<T, T>(opts);
  }

  async UpdateAndSet(item: T): Promise<void> {
    const result = await this.Update(item);
    this.Set(result);
  }

  async UpdateAndReset(item: T): Promise<void> {
    await this.Update(item);
    this.Set();
  }

  async Remove(id: string): Promise<void> {
    await this.httpClient.delete({ query: `${id}` });
    this.RemoveItem(id);
  }

  async UpdateMany(): Promise<void> {
    await this.httpClient.put<T[], T[]>({ query: 'many', payload: this.items });
  }

  // ======= //
  // COMMITS //
  // ======= //
  SetAll(items: T[] | undefined) {
    if (!items) {
      return;
    }
    this.items = items.map((a: T) => new this.classConstructor(a));
  }
  SetAllWithCount(items?: ItemsWithCount<T>) {
    if (!items) {
      return;
    }
    this.SetAll(items.items);
    this.count = items.count;
  }
  Set(item: T | void) {
    this.item = new this.classConstructor(item);
  }
  RemoveItem(id: string) {
    const index = this.items.findIndex((i: T) => i.id === id);
    this.items.splice(index, 1);
  }
  AppendToAll(items?: []) {
    if (!items) {
      return;
    }
    const resultItems = items.map((i: T) => new this.classConstructor(i));
    this.items.push(...resultItems);
  }
  ResetState() {
    this.ResetItem();
    this.ClearItems();
    this.count = 0;
  }

  ResetItem() {
    this.item = new this.classConstructor();
  }
  ClearItems() {
    this.items = [];
  }
  UnshiftToAll(item: T) {
    this.items.unshift(new this.classConstructor(item));
  }

  // ======= //
  // GETTERS //
  // ======= //

  Items(): ComputedRef<T[]> {
    console.log('ITEMS', this.items);
    return computed(() => this.items);
  }

  Item(): T {
    return this.item;
  }

  Count(): number {
    return this.count;
  }
}
