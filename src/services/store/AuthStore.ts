import HttpClient from '@/services/HttpClientS';
import EmailPassword from '@/services/interfaces/IEmailPassword';
import ITokens from '@/services/interfaces/ITokens';
import IWithId from '@/services/interfaces/IWithId';
import TokenService from '@/services/Token';
import { AuthInfo } from '@/services/types/AuthInfo';

class S<UserT extends IWithId> {
  async Login(): Promise<void> {
    const res = await HttpClient.Post<EmailPassword, AuthInfo<UserT>>({
      query: 'auth/login',
      payload: PHelp.AuthForm.ToEmailPassword(),
    });
    if (!res) {
      PHelp.Notification.Error('Ошибка авторизации');
      return;
    }
    PHelp.Auth.SetState(res);
  }
  async LoginAs(email: string): Promise<void> {
    const res = await HttpClient.Post<{ email: string }, AuthInfo<UserT>>({
      query: 'auth/login-as',
      payload: { email: email },
    });
    if (!res) {
      PHelp.Notification.Error('Ошибка авторизации');
      return;
    }
    PHelp.Auth.SetState(res);
  }
  async Register(): Promise<void> {
    await HttpClient.Post<EmailPassword, AuthInfo<UserT>>({ query: 'auth/register', payload: PHelp.AuthForm.ToEmailPassword() });
  }
  async RestorePassword(): Promise<void> {
    await HttpClient.Post<EmailPassword, UserT>({ query: 'auth/restore-password', payload: PHelp.AuthForm.ToEmailPassword() });
  }
  async passwordChange(): Promise<void> {
    const userId = Router.GetStringParam('userId');
    await HttpClient.Put<unknown, UserT>({
      query: 'auth/password-change',
      payload: { id: userId, email: PHelp.AuthForm.Email().email, password: PHelp.AuthForm.Password().password },
    });
  }

  async RefreshToken(): Promise<void> {
    await HttpClient.Post<any, { user: UserT; token: ITokens }>({
      query: 'auth/refresh-token',
      payload: { refreshToken: TokenService.getRefreshToken() },
    });
  }

  async CheckUuid(checkObj: { userId: string; uniqueId: string }): Promise<void> {
    await HttpClient.Get<boolean>({ query: `auth/check-uuid/${checkObj.userId}/${checkObj.uniqueId}` });
  }
}

const store: S = new S();
export default store;
