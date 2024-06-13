import { ActionTree } from 'vuex';

import DpoApplication from '@/classes/DpoApplication';
import Form from '@/classes/Form';
import ResidencyApplication from '@/classes/ResidencyApplication';
import HttpClient from '@/services/HttpClient';
import getBaseActions from '@/services/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const httpClient = new HttpClient('residency-applications');
let source: EventSource | undefined = undefined;

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<ResidencyApplication, State>('residency-applications'),
  updateForm: async (_, form: Form): Promise<void> => {
    await httpClient.put<Form, Form>({
      query: `form/${form.id}`,
      payload: form,
      fileInfos: form.getFileInfos(),
    });
  },
  typeExists: async ({ state, commit }, value: boolean): Promise<void> => {
    if (state.item.formValue.user.email.length < 3) {
      return;
    }
    const res = await httpClient.get<boolean>({ query: `type-exists/${state.item.formValue.user.email}/${value}` });
    commit('setTypeExists', res);
  },
  emailExists: async ({ state, commit }, courseId): Promise<void> => {
    if (state.item.formValue.user.email.length < 3) {
      return;
    }
    const res = await httpClient.get<boolean>({ query: `email-exists/${state.item.formValue.user.email}/${courseId}` });
    commit('setEmailExists', res);
  },

  subscribeCreate: async ({ commit }): Promise<void> => {
    const c = new HttpClient('subscribe');
    source = await c.subscribe<DpoApplication>({ query: 'residency-application-create' });
    source.onmessage = function (e) {
      commit('appendToAll', [e.data]);
    };
  },
  unsubscribeCreate: async ({ commit }): Promise<void> => {
    source?.close();
  },
  filledApplicationDownload: async (_, item: ResidencyApplication): Promise<void> => {
    await httpClient.post<ResidencyApplication, ResidencyApplication>({
      payload: item,
      query: `fill-application-template`,
      isBlob: true,
      downloadFileName: 'Заявление_ординатура_2024.docx',
    });
  },
};

export default actions;
