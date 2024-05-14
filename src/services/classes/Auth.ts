import AuthTokens from '@/services/classes/AuthTokens';
import AuthUser from '@/services/classes/AuthUser';
import IWithId from '@/services/interfaces/IWithId';
import { AuthInfo } from '@/services/types/AuthInfo';

import { Constructable } from '../ClassHelper';

export default class Auth<UserT extends IWithId> {
  isAuth = false;
  user = new AuthUser();
  tokens = new AuthTokens();

  constructor(userConstructor: Constructable<UserT>) {
    this.user.setUserConstructor(userConstructor);
  }
  setState(authInfo: AuthInfo<UserT>) {
    this.user.set(authInfo.user);
    this.tokens.set(authInfo.tokens);
    this.isAuth = true;
  }

  logout() {
    this.user.reset();
    this.tokens.reset();
    this.isAuth = false;
  }

  actualize() {
    this.user.actualize();
    this.tokens.actualize();
    if (this.user.get() && this.tokens.getAccessToken() && this.tokens.getRefreshToken()) {
      this.isAuth = true;
      return;
    }
    this.logout();
  }
}
