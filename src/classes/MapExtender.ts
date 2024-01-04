import * as Three from 'three';
import { Object3D } from 'three';

import IObjectExtender from '@/interfaces/IObjectExtender';
import { MapGroupsTypes } from '@/interfaces/MapGroupsTypes';
import { MapModelsTypes } from '@/interfaces/MapModelsTypes';

import BuildingModel from './BuildingModel';
import MapModel from './MapModel';

export default class MapExtender {
  extendersMap = MapExtender.InitExtendersMap();

  private static InitExtendersMap(): Map<MapGroupsTypes | MapModelsTypes, IObjectExtender> {
    const m = new Map();

    m.set(MapModelsTypes.Map, new MapModel());
    m.set(MapModelsTypes.Building, new BuildingModel());
    return m;
  }

  extendObject(mapForExtend: Three.Object3D) {
    console.log(mapForExtend);

    const buildingsGroup = mapForExtend.children.find((c: Three.Object3D) => c.name === MapGroupsTypes.Buildings);
    let extender = this.extendersMap.get(MapModelsTypes.Building);

    buildingsGroup?.children.forEach((c: Object3D) => {
      extender?.extendObject(c);
    });

    extender = this.extendersMap.get(MapModelsTypes.Map);
    extender?.extendObject(mapForExtend);
  }
}
