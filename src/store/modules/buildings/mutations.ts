import { MutationTree } from 'vuex';

import Building from '@/classes/Building';
import Entrance from '@/classes/Entrance';
import Floor from '@/classes/Floor';
import IBuilding from '@/interfaces/IBuilding';
import IEntrance from '@/interfaces/IEntrance';
import IFloor from '@/interfaces/IFloor';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, buildings: IBuilding[]) {
    state.buildings = buildings.map((i: IBuilding) => new Building(i));
  },
  set(state, building: IBuilding) {
    state.building = new Building(building);
  },
  addFloor(state) {
    state.building.floors.push(new Floor({ buildingId: state.building.id, number: 0, divisions: [] }));
  },
  removeFloor(state, id: string) {
    const index = state.building.floors.findIndex((i: IFloor) => i.id === id);
    state.building.floors.splice(index, 1);
  },
  addEntrance(state) {
    state.building.entrances.push(new Entrance({ buildingId: state.building.id, number: 0 }));
  },
  removeEntrance(state, id: string) {
    const index = state.building.entrances.findIndex((i: IEntrance) => i.id === id);
    state.building.entrances.splice(index, 1);
  },
  setBuildingByFloorId(state, id: string) {
    const building = state.buildings.find((i: IBuilding) => i.floors.some((floor: IFloor) => floor.id === id));
    if (building) state.building = building;
  },
};

export default mutations;
