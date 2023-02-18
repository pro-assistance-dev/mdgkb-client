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
    const floor = new Floor();
    floor.buildingId = state.building.id;
    state.building.floors.push(floor);
  },
  removeFloor(state, id: string) {
    const index = state.building.floors.findIndex((i: IFloor) => i.id === id);
    state.building.floors.splice(index, 1);
  },
  addEntrance(state) {
    const e = new Entrance();
    e.number = 1;
    e.buildingId = state.building.id;
    state.building.entrances.push(e);
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
