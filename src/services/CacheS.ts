import ClassHelper from '@/services/ClassHelper';

export default class Cache {
  name = '';

  constructor(i?: Cache) {
    ClassHelper.BuildClass(this, i);
  }

  public static Set(): void {
    // const res = { data, time: new Date() };
    // sessionStorage.setItem(this.name, JSON.stringify(res));
  }

  public static Get<DataType>(name: string, min?: number): DataType | null {
    const res = sessionStorage.getItem(name);
    if (res) {
      const storeData = JSON.parse(res);
      const now = new Date();
      const timestamp = new Date(storeData.time);
      const difference = now.getTime() - timestamp.getTime(); // difference in milliseconds
      const resultInMinutes = Math.round(difference / 60000);
      const defaultMin = 10; // min by default
      if (resultInMinutes > (min ? min : defaultMin)) {
        return null;
      }
      return storeData.data;
    } else {
      return null;
    }
  }

  async TryGet<DataType>(name: string, get: () => Promise<DataType | void>, min?: number): Promise<DataType | void | null> {
    let res;
    res = Cache.Get<DataType>(name, min);
    if (!res) {
      res = await get();
      if (res) {
        // Cache.Set<DataType>(name, res);
      }
    }
    return res;
  }
}
