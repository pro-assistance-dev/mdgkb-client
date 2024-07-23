import DailyMenu from '@/classes/DailyMenu';
import BaseStore from '@/services/BaseStore';
import HttpClient from '@/services/HttpClientS';

class S extends BaseStore<DailyMenu> {
  private readonly periodItems = reactive([]);
  todayMenu = reactive(new DailyMenu());
  menusCopies = reactive([]);

  constructor() {
    super(DailyMenu, 'dayly-menus');
  }

  async GetPeriodItems(): Promise<void> {
    const items = await HttpClient.Get<DailyMenu[]>();
    this.SetPeriodItems(items);
  }

  async PDF(item: DailyMenu): Promise<void> {
    await HttpClient.Post<DailyMenu, DailyMenu>({
      query: `pdf`,
      payload: item,
      isBlob: true,
      downloadFileName: 'Меню.pdf',
    });
  }

  async GetTodayMenu(): Promise<void> {
    this.SetTodayMenu(await HttpClient.Get<DailyMenu>({ query: 'today-menu' }));
  }

  TodayMenu(): DailyMenu {
    return this.todayMenu;
  }
  PeriodItems(): DailyMenu[] {
    return this.periodItems;
  }
  MenusCopies(): DailyMenu[] {
    return this.menusCopies;
  }
  SetPeriodItems(items: void | DailyMenu[]) {
    if (!items) {
      return;
    }
    Arrays.Refill(
      this.periodItems,
      items.map((i: DailyMenu) => new DailyMenu(i))
    );
  }
  SetTodayMenu(item: void | DailyMenu) {
    if (!item) {
      return;
    }
    ClassHelper.BuildClass(this.todayMenu, item);
  }
  SetMenusCopies(items: DailyMenu[]) {
    Arrays.Refill(this.menusCopies, items);
  }
}
const store: S = new S();
export default store;
