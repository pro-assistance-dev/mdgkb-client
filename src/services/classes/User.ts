import IWithId from '@/services/interfaces/IWithId';
import TokenService from '@/services/Token';

export default class User<TUser extends IWithId> {
  private user: TUser | undefined;

  get(): TUser | undefined {
    return this.user;
  }

  getId(): string | undefined {
    return this.getUser()?.id;
  }

  set(user: TUser): void {
    this.user = user;
  }
}
