import AuthTokens from '@/services/classes/AuthTokens';
import AuthUser from '@/services/classes/AuthUser';
import IWithId from '@/services/interfaces/IWithId';
import { AuthInfo } from '@/services/types/AuthInfo';

import { Constructable } from '../ClassHelper';

class Auth {
  private isAuth = false;
  private user = new AuthUser();
  private tokens = new AuthTokens();
  private preventLogout = false;

  DeprecateLogout() {
    this.preventLogout = true;
  }
  AllowLogout() {
    this.preventLogout = false;
  }
  IsAuth(): boolean {
    return this.isAuth;
  }

  User(): AuthUser<IWithId> {
    return this.user;
  }

  GetUser<UserT extends Constructable<IWithId>>(): UserT | undefined {
    return this.user.get() as UserT;
  }

  SetUserConstructor(c: Constructable<IWithId>) {
    this.user.setUserConstructor(c);
  }

  SetState<UserT extends IWithId>(authInfo: AuthInfo<UserT>) {
    this.user.set(authInfo.user);
    this.tokens.set(authInfo.tokens);
    this.isAuth = true;
  }

  Logout() {
    if (this.preventLogout) {
      PHelp.Notification.Warning('В текущий момент Вы не можете выйти из системы');
      return;
    }
    this.user.reset();
    this.tokens.reset();
    this.isAuth = false;
  }

  Actualize() {
    this.user.actualize();
    this.tokens.actualize();
    if (this.user.get() && this.tokens.getAccessToken() && this.tokens.getRefreshToken()) {
      this.isAuth = true;
      return;
    }
    this.Logout();
  }
}

export default new Auth();
