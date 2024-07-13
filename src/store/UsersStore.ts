import User from '@/classes/User';
import IFavourite from '@/interfaces/IFavourite';
import BaseStore from '@/services/BaseStore';
import FavouriteService from '@/services/Favourite';
import HttpClient from '@/services/HttpClientS';

class S extends BaseStore<User> {
  emailExists = false;
  authPageEmail = '';

  constructor() {
    super(User, 'users');
  }

  async AddToUser(item: IFavourite) {
    await HttpClient.Post<IFavourite, IFavourite>({ query: `add-to-user/${item.domain}`, payload: { id: item.id } });
    if (item.domain) {
      FavouriteService.addToFavourite(item.domain, item.id);
    }
  }

  async RemoveFromUser(item: IFavourite) {
    if (item.domain) {
      FavouriteService.removeFromFavourite(item.domain, item.id);
    }
    await HttpClient.Delete<IFavourite, IFavourite>({ query: `remove-from-user/${item.domain}/${item.id}` });
  }
  async FindEmail(email: string): Promise<void> {
    const res = await HttpClient.Get<boolean>({ query: `get-by-email/${email}` });
    this.emailExists = res ?? false;
  }

  isFavourite() {
    return (domain: string, id: string) => FavouriteService.isFavourite(domain, id);
  }
}

const store: S = new S();
export default store;
