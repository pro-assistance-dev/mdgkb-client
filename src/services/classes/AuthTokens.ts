import ITokens from '@/services/interfaces/ITokens';

import LocalStoreKeys from '../interfaces/LocalStoreKeys';
import LocalStore from './LocalStore';

export default class AuthTokens {
  //   private accessToken?: string;
  // private  refreshToken?: string;

  set(tokenObj: ITokens) {
    this.setAccessToken(tokenObj.accessToken);
    this.setRefreshToken(tokenObj.refreshToken);
  }

  getAccessToken(): string | undefined {
    return LocalStore.Get(LocalStoreKeys.AccessToken);
  }
  getRefreshToken(): string | undefined {
    return LocalStore.Get(LocalStoreKeys.RefreshToken);
  }

  setAccessToken(token?: string) {
    // this.accessToken = token;
    LocalStore.Set(LocalStoreKeys.AccessToken, token);
  }

  setRefreshToken(token?: string) {
    // this.refreshToken = token;
    LocalStore.Set(LocalStoreKeys.RefreshToken, token);
  }

  reset() {
    // this.accessToken = undefined;
    // this.refreshToken = undefined;
    LocalStore.Remove(LocalStoreKeys.AccessToken);
    LocalStore.Remove(LocalStoreKeys.RefreshToken);
  }

  actualize() {
    this.setAccessToken(this.getAccessToken());
    this.setRefreshToken(this.getAccessToken());
  }
}
