import { MutationTree } from 'vuex';

import IWithId from '@/services/interfaces/IWithId';
import { AuthInfo } from '@/services/types/AuthInfo';

import State from './index';

export default function getMutations<UserT extends IWithId>(): MutationTree<State<UserT>> {
  return {
    setAuth(state, authInfo: AuthInfo<UserT>) {
      state.auth.setState(authInfo);
    },
  };
}
