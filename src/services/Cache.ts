import ClassHelper from '@/services/ClassHelper';

export default class Cache {
  name = '';

  constructor(i?: Cache) {
    ClassHelper.BuildClass(this, i);
  }

  public cache<DataType>(data: DataType): void {
    const res = { data, time: new Date() };
    // sessionStorage.setItem(this.name, JSON.stringify(res));
  }

  getFromCache<DataType>(min?: number): DataType | null {
    const res = sessionStorage.getItem(this.name);
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

  async storeGetWithCache<DataType>(get: () => Promise<DataType | void>, min?: number): Promise<DataType | void | null> {
    let res;
    res = this.getFromCache<DataType>(min);
    if (!res) {
      res = await get();
      if (res) {
        this.cache<DataType>(res);
      }
    }
    return res;
  }
}
