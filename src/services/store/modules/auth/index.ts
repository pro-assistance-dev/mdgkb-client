import { Module } from 'vuex';

import Auth from '@/services/classes/Auth';
import AuthForm from '@/services/classes/AuthForm';
import AuthModal from '@/services/classes/AuthModal';
import { Constructable } from '@/services/ClassHelper';
import IWithId from '@/services/interfaces/IWithId';
import RootState from '@/services/interfaces/types';

import getActions from './actions';
import getGetters from './getters';
import getMutations from './mutations';

export default interface State<UserT extends IWithId> {
  auth: Auth<UserT>;
  modal: AuthModal;
  form: AuthForm;
}

export const getDefaultState = <UserT extends IWithId>(userConstructor: Constructable<UserT>): State<UserT> => {
  return {
    auth: new Auth(userConstructor),
    modal: new AuthModal(),
    form: new AuthForm(),
  };
};

const namespaced = true;

export const authStateConstructor = <UserT extends IWithId>(userConstructor: Constructable<UserT>): Module<State<UserT>, RootState> => {
  return {
    namespaced,
    state: getDefaultState(userConstructor),
    getters: getGetters(),
    actions: getActions(),
    mutations: getMutations(),
  };
};
