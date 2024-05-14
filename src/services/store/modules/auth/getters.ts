import { GetterTree } from 'vuex';

import Auth from '@/services/classes/Auth';
import AuthForm from '@/services/classes/AuthForm';
import AuthModal from '@/services/classes/AuthModal';
import IWithId from '@/services/interfaces/IWithId';
import RootState from '@/services/interfaces/types';

import State from './index';

export default function getGetters<UserT extends IWithId>(): GetterTree<State<UserT>, RootState> {
  return {
    auth(state): Auth<UserT> {
      return state.auth;
    },
    modal(state): AuthModal {
      return state.modal;
    },
    form(state): AuthForm {
      return state.form;
    },
  };
}
