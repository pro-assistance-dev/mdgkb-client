import { MutationTree } from 'vuex';

import Building from '@/classes/Building';
import Entrance from '@/classes/Entrance';
import Floor from '@/classes/Floor';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<Building, State>(Building),
  addFloor(state) {
    const floor = new Floor();
    floor.buildingId = state.item.id;
    state.item.floors.push(floor);
  },
  removeFloor(state, id: string) {
    const index = state.item.floors.findIndex((i: Floor) => i.id === id);
    state.item.floors.splice(index, 1);
  },
  addEntrance(state) {
    const e = new Entrance();
    e.number = 1;
    e.buildingId = state.item.id;
    state.item.entrances.push(e);
  },
  removeEntrance(state, id: string) {
    const index = state.item.entrances.findIndex((i: Entrance) => i.id === id);
    state.item.entrances.splice(index, 1);
  },
  setBuildingByFloorId(state, id: string) {
    const building = state.items.find((i: Building) => i.floors.some((floor: Floor) => floor.id === id));
    if (building) state.item = building;
  },
};

export default mutations;
