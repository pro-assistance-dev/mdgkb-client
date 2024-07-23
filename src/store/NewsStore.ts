import EventApplication from '@/classes/EventApplication';
import News from '@/classes/News';
import NewsLike from '@/classes/NewsLike';
import NewsToTag from '@/classes/NewsToTag';
import Tag from '@/classes/Tag';
import INewsWithCount from '@/interfaces/INewsWithCount';
import BaseStore from '@/services/BaseStore';
import HttpClient from '@/services/HttpClientS';

class S extends BaseStore<News> {
  private readonly main = reactive(new News());
  private readonly subMain1 = reactive(new News());
  private readonly subMain2 = reactive(new News());
  // private filteredNews = [];
  private filterTags: Tag[] = [];
  // private allNewsLoaded = false;
  // private calendarNews = [new News()];
  // private calendarMeta = undefined;
  // private eventMode = false;
  // private eventApplication = new EventApplication();

  constructor() {
    super(News, 'news');
  }

  Main(): News {
    return this.main as News;
  }
  SubMain1(): News {
    return this.subMain1 as News;
  }

  SubMain2(): News {
    return this.subMain2 as News;
  }
  async GetMain(fill?: boolean): Promise<void> {
    const items = await HttpClient.Get<INewsWithCount>({ query: this.getUrl('main') });
    if (!items) {
      return;
    }
    if (fill) {
      this.SetMainOrFill(items);
    } else {
      this.SetMain(items);
    }
  }

  MainPageRecentNewsList(): News[] {
    // return (
    const a = this.items.slice(0, 5);
    console.log(a);
    return reactive(a) as News[];

    // .filter((item: News) => item.id !== this.main.id && item.id !== this.subMain1.id && item.id !== this.subMain2.id)
    //     .slice(0, 5)
    // );
  }

  async GetSubMain(fill?: boolean): Promise<void> {
    const items = await HttpClient.Get<INewsWithCount>({ query: this.getUrl('submain') });
    if (!items) {
      return;
    }
    if (fill) {
      this.SetSubMainOrFill(items);
    } else {
      this.SetSubMain(items);
    }
  }

  async GetByMonth(): Promise<void> {
    const items = await HttpClient.Get<INewsWithCount>();
    if (!items) {
      return;
    }
    this.SetCalendarNews(items);
  }

  async CreateLike(newsLike: NewsLike): Promise<void> {
    await HttpClient.Post<NewsLike, NewsLike>({ query: this.getUrl(`like`), payload: newsLike });
  }

  async DeleteLike(newsLike: NewsLike): Promise<void> {
    await HttpClient.Delete({ query: this.getUrl(`like/${newsLike.id}`) });
  }

  async addFilterTag(): Promise<void> {
    this.SetFilteredNews();
  }

  async removeFilterTag(id: string): Promise<void> {
    this.RemoveFilterTag(id);
    this.SetFilteredNews();
  }

  async resetFilterTags(): Promise<void> {
    this.ResetFilterTags();
    this.SetFilteredNews();
  }

  async sendEventApplications(eventApplication: EventApplication): Promise<void> {
    await HttpClient.Post<EventApplication, EventApplication>({ query: `event/application`, payload: eventApplication });
  }

  async GetSuggestionNews(id: string): Promise<void> {
    const res = await HttpClient.Get<News[]>({ query: this.getUrl(`get-suggestion/${id}`) });
    if (!res) {
      return;
    }
    this.SetAll(res);
  }

  // sendToTg: async (_, message: string): Promise<void>  {
  //   if (!process.env.VUE_APP_TG_TOKEN || process.env.VUE_APP_TG_CHAT_ID) {
  //     console.log('env tg');
  //   }
  //   await axiosInstance({
  //     url: `Https://api.telegram.org/bot${process.env.VUE_APP_TG_TOKEN}/sendMessage?chat_id=${process.env.VUE_APP_TG_CHAT_ID}&text=${message}&parse_mode=HTML`,
  //     method: 'post',
  //   });
  // }

  //commits
  SetMain(items: INewsWithCount) {
    Object.assign(this.main, new this.classConstructor(items.items[0]));
  }
  SetMainOrFill(items: INewsWithCount) {
    const main = new News(items.items[0]);
    if (!main.id) {
      const item = this.items.filter((item: News) => item.id !== this.subMain1.id && item.id !== this.subMain2.id)[0];
      Object.assign(this.main, new this.classConstructor(item));
    } else {
      Object.assign(this.main, new this.classConstructor(main));
    }
  }
  SetSubMain1(items: INewsWithCount) {
    Object.assign(this.subMain1, new this.classConstructor(items.items[0]));
  }
  SetSubMain2(items: INewsWithCount) {
    Object.assign(this.subMain2, new this.classConstructor(items.items[0]));
  }
  SetSubMain(items: INewsWithCount) {
    Object.assign(this.subMain1, new this.classConstructor(items.items[0]));
    Object.assign(this.subMain2, new this.classConstructor(items.items[1]));
  }

  SetSubMainOrFill(items: INewsWithCount) {
    const subMain1 = new News(items.items[0]);
    if (!subMain1.id) {
      const item = this.items.filter((item: News) => item.id !== this.main.id && item.id !== this.subMain1.id)[0];
      Object.assign(this.subMain1, new this.classConstructor(item));
    } else {
      Object.assign(this.subMain1, new this.classConstructor(items.items[0]));
      Object.assign(this.subMain1, subMain1);
    }

    const subMain2 = new News(items.items[1]);
    if (!subMain2.id) {
      const item = this.items.filter((item: News) => item.id !== this.main.id && item.id !== this.subMain1.id)[0];
      Object.assign(this.subMain2, new this.classConstructor(item));
    } else {
      Object.assign(this.subMain2, new this.classConstructor(items.items[1]));
    }
  }

  SetCalendarNews(items: INewsWithCount) {
    if (!items) {
      return;
    }
    // this.calendarNews = items.items.map((i: News) => new News(i));
  }

  RemoveFilterTag(id: string) {
    const index = this.filterTags.findIndex((i: Tag) => i.id === id);
    this.filterTags.splice(index, 1);
    this.ClearItems();
  }

  ResetFilterTags() {
    this.filterTags = [];
    this.ClearItems();
  }

  SetFilteredNews() {
    if (!this.filterTags.length) {
      return;
    }
    const filteredNews = this.items.filter((newsItem: News) => {
      return this.filterTags.every((tag) => {
        return newsItem.newsToTags.some((newsToTag: NewsToTag) => {
          return newsToTag.tagId === tag.id;
        });
      });
    });
    if (filteredNews.length) {
      this.SetAll(filteredNews);
    }
    // this.params =
  }

  UpdateCalendarMeta() {
    // this.calendarMeta = meta;
  }

  // SetEventMode( eventMode: boolean) {
  //   this.eventMode = eventMode;
  //   this.params.events = eventMode;
  //   this.items = [];
  // }
}

const store: S = new S();
export default store;
