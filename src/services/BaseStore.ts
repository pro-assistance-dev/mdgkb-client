import Cache from '@/services/CacheS';
import FileInfo from '@/services/classes/FileInfo';
import FTSP from '@/services/classes/filters/FTSP';
import HttpResponse from '@/services/classes/HttpResponse';
import { Constructable } from '@/services/ClassHelper';
import HttpClient from '@/services/HttpClientS';
import IFileInfosGetter from '@/services/interfaces/IFileInfosGetter';
import { IBodyfulParams } from '@/services/interfaces/IHTTPTypes';
import ItemsWithCount from '@/services/interfaces/ItemsWithCount';
import IWithId from '@/services/interfaces/IWithId';

interface GetAllOptions {
  withCache?: boolean;
  ftsp: FTSP;
}

export default class BaseStore<T extends IWithId & IFileInfosGetter> {
  protected readonly items: T[] = reactive([]);
  protected readonly item: T;
  protected count = ref(0);
  protected classConstructor: Constructable<T>;
  protected url = '';

  constructor(i: Constructable<T>, url: string) {
    this.classConstructor = i;
    this.item = reactive(new this.classConstructor());
    this.url = url;
  }

  Set(item: T | void) {
    Object.assign(this.item, new this.classConstructor(item));
  }

  Item(): T {
    return this.item;
  }

  // ======= //
  // ACTIONS //
  // ======= //
  protected getUrl(query?: string): string {
    if (!query) {
      return this.url;
    }
    return `${this.url}/${query}`;
  }

  async GetAll(options?: GetAllOptions): Promise<void> {
    let res;
    const get = HttpClient.Get<T[] | ItemsWithCount<T>>;
    if (options && options.withCache) {
      res = await Cache.TryGet<T[] | ItemsWithCount<T>>(this.getUrl(), get);
    } else {
      res = await get({ query: this.getUrl() });
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
    this.Set(await HttpClient.Get<T>({ query: this.getUrl(id) }));
  }
  async FTSP(options?: GetAllOptions) {
    const ftsp: FTSP = options?.ftsp ?? FTSP.Get();
    const f = ftsp.clearForHTTP();
    const p: IBodyfulParams<unknown> = {
      payload: { ftsp: f },
      query: this.getUrl('ftsp'),
    };
    const res = await HttpClient.Post<unknown, HttpResponse<T[] | ItemsWithCount<T>>>(p);
    if (!res || !res.ftsp) {
      return;
    }
    if (Array.isArray(res.data)) {
      this.SetAll(res.data);
    } else {
      if (f.p.append) {
        this.AppendToAll(res.data?.items);
        return;
      }
      this.SetAllWithCount(res.data);
    }
  }

  async Create(item?: T): Promise<T | void> {
    const param = item ?? this.item;
    const opts: IBodyfulParams<T> = { payload: param, query: this.getUrl() };
    if (param.getFileInfos) {
      opts.fileInfos = param.getFileInfos();
      opts.fileInfos.forEach((f: FileInfo) => (f.url = ''));
    }
    return await HttpClient.Post<T, T>(opts);
  }

  async CreateAndSet(item: T): Promise<void> {
    const result = await this.Create(item);
    this.Set(result);
  }

  async Update(item?: T): Promise<T | void> {
    const param = item ?? this.item;
    const opts: IBodyfulParams<T> = { query: this.getUrl(`${param.id}`), payload: item };
    if (param.getFileInfos) {
      opts.fileInfos = param.getFileInfos();
      opts.fileInfos.forEach((f: FileInfo) => (f.url = ''));
    }
    return await HttpClient.Put<T, T>(opts);
  }

  async UpdateAndSet(item: T): Promise<void> {
    const result = await this.Update(item);
    this.Set(result);
  }

  async UpdateAndReset(item?: T): Promise<void> {
    await this.Update(item ?? this.item);
    this.Set();
  }

  async Remove(id: string): Promise<void> {
    await HttpClient.Delete({ query: this.getUrl(`${id}`) });
    this.RemoveItem(id);
  }

  async UpdateMany(): Promise<void> {
    await HttpClient.Put<T[], T[]>({ query: this.getUrl('many'), payload: this.items });
  }

  // ======= //
  // COMMITS //
  // ======= //
  SetAll(items: T[] | undefined) {
    if (!items) {
      return;
    }
    this.items.splice(0, this.items.length);
    this.items.push(...items.map((a: T) => new this.classConstructor(a)));
  }

  SetAllWithCount(items?: ItemsWithCount<T>) {
    if (!items) {
      return;
    }
    this.SetAll(items.items);
    this.count.value = items.count;
  }

  RemoveItem(id: string) {
    const index = this.items.findIndex((i: T) => i.id === id);
    this.items.splice(index, 1);
  }
  AppendToAll(items?: T[] | undefined) {
    if (!items) {
      return;
    }
    const resultItems = items.map((i: T) => new this.classConstructor(i));
    this.items.push(...resultItems);
  }
  ResetState() {
    this.ResetItem();
    this.ClearItems();
    this.count.value = 0;
  }

  ResetItem() {
    ClassHelper.BuildClass(this.item, new this.classConstructor());
  }

  ClearItems() {
    this.items.splice(0, this.items.length);
  }
  UnshiftToAll(item: T) {
    this.items.unshift(new this.classConstructor(item));
  }

  // ======= //
  // GETTERS //
  // ======= //

  Items(): T[] {
    return this.items;
  }

  Count(): Ref<number> {
    return this.count;
  }
}
