import { ActionTree } from 'vuex';

import IFileInfo from '@/interfaces/files/IFileInfo';
import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import IDivision from '@/interfaces/IDivision';
import IDivisionComment from '@/interfaces/IDivisionComment';
import IDivisionImage from '@/interfaces/IDivisionImage';
import IDivisionsWithCount from '@/interfaces/IDivisionsWithCount';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('divisions');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }, filterQuery?: IFilterQuery): Promise<void> => {
    const item = await httpClient.get<IDivisionsWithCount>({ query: filterQuery ? filterQuery.toUrl() : '' });
    if (filterQuery) {
      filterQuery.setAllLoaded(item ? item.divisions.length : 0);
    }
    if (filterQuery && filterQuery.pagination.append) {
      commit('appendToAll', item);
      return;
    }
    commit('setAll', item);
  },
  get: async ({ commit }, filterQuery: IFilterQuery) => {
    commit('set', await httpClient.get<IDivision>({ query: `get${filterQuery.toUrl()}` }));
  },
  create: async ({ commit }, division: IDivision): Promise<void> => {
    const fileInfos: IFileInfo[] = [];
    division.divisionImages.forEach((image: IDivisionImage) => {
      if (image.fileInfo) fileInfos.push(image.fileInfo);
    });
    await httpClient.post<IDivision, IDivision>({ payload: division, fileInfos: fileInfos, isFormData: true });
    commit('set');
  },
  update: async ({ commit }, division: IDivision): Promise<void> => {
    const fileInfos: IFileInfo[] = [];
    if (division.divisionImages) {
      division.divisionImages.forEach((image: IDivisionImage) => {
        if (image.fileInfo) fileInfos.push(image.fileInfo);
      });
    }
    await httpClient.put<IDivision, IDivision>({ query: `${division.id}`, payload: division, fileInfos: fileInfos, isFormData: true });
    commit('set');
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
  removeComment: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `comment/${id}` });
    commit('removeComment', id);
  },
  createComment: async ({ commit }, comment: IDivisionComment): Promise<void> => {
    const res = await httpClient.post<IDivisionComment, IDivisionComment>({ query: `comment`, payload: comment });
    commit('setComment', res);
  },
  updateComment: async ({ commit }, newComment: IDivisionComment): Promise<void> => {
    await httpClient.put({ query: `comment/${newComment.id}`, payload: newComment });
    commit('updateComment', newComment.comment.id);
  },
  deleteComment: async ({ commit }, comment: IDivisionComment): Promise<void> => {
    await httpClient.delete({ query: `comment/${comment.id}` });
    commit('deleteCommentFromNews', comment);
  },
};

export default actions;
