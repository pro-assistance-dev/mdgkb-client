import { MutationTree } from 'vuex';

import Form from '@/classes/Form';
import Gate from '@/classes/Gate';
import User from '@/classes/User';
import Visit from '@/classes/Visit';
import VisitsApplication from '@/classes/VisitsApplication';
import IForm from '@/interfaces/IForm';
import IGate from '@/interfaces/IGate';
import IUser from '@/interfaces/IUser';
import IVisitsApplication from '@/interfaces/IVisitsApplication';
import IVisitsApplicationWithCount from '@/interfaces/IVisitsApplicationsWithCount';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAllWithCount(state, item: IVisitsApplicationWithCount) {
    if (!item.visitsApplications) {
      state.items = [];
      return;
    }
    state.items = item.visitsApplications.map((i: IVisitsApplication) => new VisitsApplication(i));
    state.count = item.count;
  },
  appendToAll(state, items: IVisitsApplicationWithCount) {
    if (!items.visitsApplications) {
      state.items = [];
      return;
    }
    const visitsApplications = items.visitsApplications.map((i: IVisitsApplication) => new VisitsApplication(i));
    state.items.push(...visitsApplications);
    state.count = items.count;
  },
  setAll(state, items: IVisitsApplication[]) {
    state.items = items.map((i: IVisitsApplication) => new VisitsApplication(i));
  },
  set(state, item: IVisitsApplication) {
    state.item = new VisitsApplication(item);
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: IVisitsApplication) => i.id === id);
    state.items.splice(index, 1);
  },
  resetItem(state) {
    state.item = new VisitsApplication();
  },
  resetItems(state) {
    state.items = [];
  },
  setUser(state, user: IUser) {
    state.item.formValue.user = new User(user);
  },
  setGate(state, gate: IGate) {
    state.item.gate = new Gate(gate);
    state.item.gateId = state.item.gate.id;
  },
  setFormValue(state, form: IForm) {
    state.item.formValue = new Form(form);
  },
  setInitVisit(state) {
    state.item.visits.push(new Visit());
  },
};

export default mutations;
