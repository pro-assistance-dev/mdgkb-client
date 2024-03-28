import { ActionTree } from 'vuex';

// import EmailPasswordForm from '@/services/types/EmailPassword';
import HttpClient from '@/services/HttpClient';
import EmailPassword from '@/services/interfaces/IEmailPassword';
import ITokens from '@/services/interfaces/ITokens';
import IWithId from '@/services/interfaces/IWithId';
import RootState from '@/services/interfaces/types';
import TokenService from '@/services/Token';
import { AuthInfo } from '@/services/types/AuthInfo';

import State from './index';

const httpClient = new HttpClient('auth');

export default function getActions<UserT extends IWithId>(): ActionTree<State<UserT>, RootState> {
  return {
    login: async ({ commit, state }): Promise<void> => {
      commit(
        'setAuth',
        await httpClient.post<EmailPassword, AuthInfo<UserT>>({ isFormData: true, query: 'login', payload: state.form.toEmailPassword() })
      );
    },
    loginAs: async ({ commit, state }): Promise<void> => {
      commit(
        'setAuth',
        await httpClient.post<EmailPassword, AuthInfo<UserT>>({ isFormData: true, query: 'login', payload: state.form.toEmailPassword() })
      );
    },
    register: async ({ state }): Promise<void> => {
      await httpClient.post<EmailPassword, AuthInfo<UserT>>({ query: 'register', payload: state.form.toEmailPassword() });
    },
    restorePassword: async ({ state }): Promise<void> => {
      await httpClient.post<EmailPassword, UserT>({ query: 'restore-password', payload: state.form.toEmailPassword() });
    },
    passwordChange: async ({ state }): Promise<void> => {
      await httpClient.put<unknown, UserT>({
        query: 'password-change',
        payload: { id: state.auth.user.getId(), email: state.form.email.email, password: state.form.password.password },
        isFormData: true,
      });
    },
    refreshToken: async ({ commit }): Promise<void> => {
      await httpClient.post<any, { user: UserT; token: ITokens }>({
        query: 'refresh-token',
        payload: { refreshToken: TokenService.getRefreshToken() },
      });
    },
    checkUuid: async ({ commit }, checkObj: { userId: string; uniqueId: string }): Promise<void> => {
      await httpClient.get<boolean>({ query: `check-uuid/${checkObj.userId}/${checkObj.uniqueId}` });
    },
  };
}
