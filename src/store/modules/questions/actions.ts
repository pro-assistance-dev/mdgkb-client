import { ActionTree } from 'vuex';

import Question from '@/classes/Question';
import HttpClient from '@/services/HttpClient';
import getBaseActions from '@/services/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const httpClient = new HttpClient('questions');

const actions: ActionTree<State, RootState> = {
  ...getBaseActions(httpClient),
  readAnswers: async ({ commit }, userId: string): Promise<void> => {
    await httpClient.put<Question, Question>({
      query: `profile/question-answer/${userId}`,
    });
    commit('set');
  },
  publish: async ({ commit }, id: string): Promise<void> => {
    await httpClient.put<Question, Question>({
      query: `publish/${id}`,
    });
    commit('set');
  },
  changeNewStatus: async (_, question: Question): Promise<void> => {
    await httpClient.put<Question, Question>({
      query: `new/${question.id}?isNew=${question.isNew}`,
    });
  },
};

export default actions;
