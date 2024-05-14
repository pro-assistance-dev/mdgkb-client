import { GetterTree } from 'vuex';

import Address from '@/classes/Address';
import KladrApi from '@/classes/KladrApi';
import SocialMedia from '@/classes/SocialMedia';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  count(state): number {
    return state.count;
  },
  socialMedia(state): SocialMedia[] {
    return state.socialMedia;
  },
  addresses(state): Address[] {
    return state.addresses;
  },
  kladrAPI(state): KladrApi {
    return state.kladrAPI;
  },
};

export default getters;
