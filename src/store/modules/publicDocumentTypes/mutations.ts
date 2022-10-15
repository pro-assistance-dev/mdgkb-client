import { MutationTree } from 'vuex';

import DocumentType from '@/classes/document/DocumentType';
import PublicDocumentType from '@/classes/document/PublicDocumentType';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IPublicDocumentType from '@/interfaces/IPublicDocumentType';

import { getDefaultState } from '.';
import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IPublicDocumentType[]) {
    state.items = items.map((i: IPublicDocumentType) => new PublicDocumentType(i));
  },
  set(state, item: IPublicDocumentType) {
    state.item = new PublicDocumentType(item);
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: IPublicDocumentType) => i.id === id);
    state.items.splice(index, 1);
  },
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
  addDocType(state) {
    state.item.documentTypes.push(new DocumentType());
  },
  removeDocType(state, index: number) {
    const idForDelete = state.item.documentTypes[index].id;
    if (idForDelete) {
      state.item.documentTypesForDelete.push(idForDelete);
    }
    state.item.documentTypes.splice(index, 1);
  },
  addFileInfo(state, fileInfo: IFileInfo) {
    state.fileInfos.push(fileInfo);
  },
  updateFileInfo(state, file: IFileInfo) {
    const index = state.fileInfos.findIndex((item: IFileInfo) => item.id === file.id);
    state.fileInfos.splice(index, 1);
  },
};

export default mutations;
