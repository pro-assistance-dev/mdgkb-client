import { MutationTree } from 'vuex';

import ApplicationCar from '@/classes/ApplicationCar';
import Form from '@/classes/Form';
import Gate from '@/classes/Gate';
import User from '@/classes/User';
import IApplicationCar from '@/interfaces/IApplicationCar';
import IApplicationCarWithCount from '@/interfaces/IApplicationCarWithCount';
import IForm from '@/interfaces/IForm';
import IGate from '@/interfaces/IGate';
import IUser from '@/interfaces/IUser';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAllWithCount(state, item: IApplicationCarWithCount) {
    if (!item.applicationsCars) {
      state.items = [];
      return;
    }
    state.items = item.applicationsCars.map((i: IApplicationCar) => new ApplicationCar(i));
    state.count = item.count;
  },
  appendToAll(state, items: IApplicationCarWithCount) {
    if (!items.applicationsCars) {
      state.items = [];
      return;
    }
    const applicationsCars = items.applicationsCars.map((i: IApplicationCar) => new ApplicationCar(i));
    state.items.push(...applicationsCars);
    state.count = items.count;
  },
  setAll(state, items: IApplicationCar[]) {
    state.items = items.map((i: IApplicationCar) => new ApplicationCar(i));
  },
  set(state, item: IApplicationCar) {
    state.item = new ApplicationCar(item);
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: IApplicationCar) => i.id === id);
    state.items.splice(index, 1);
  },
  resetItem(state) {
    state.item = new ApplicationCar();
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
};

export default mutations;
