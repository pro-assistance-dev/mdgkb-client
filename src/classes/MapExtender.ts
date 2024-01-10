import { Object3D } from 'three';

import BuildingModel from '@/classes/BuildingModel';
import MapModel from '@/classes/MapModel';
import MapNode from '@/classes/MapNode';
import IObjectExtender from '@/interfaces/IObjectExtender';
import { MapGroupsTypes } from '@/interfaces/MapGroupsTypes';
import { MapModelsTypes } from '@/interfaces/MapModelsTypes';

export default class MapExtender {
  extendersMap = MapExtender.InitExtendersMap();

  private static InitExtendersMap(): Map<MapGroupsTypes | MapModelsTypes, IObjectExtender> {
    const m = new Map();

    m.set(MapModelsTypes.Map, new MapModel());
    m.set(MapModelsTypes.Building, new BuildingModel());
    m.set(MapModelsTypes.Node, new MapNode());
    return m;
  }

  extendObject(mapForExtend: MapModel) {
    // console.log(mapForExtend);
    let extender = this.extendersMap.get(MapModelsTypes.Map);
    extender?.extendObject(mapForExtend);

    extender = this.extendersMap.get(MapModelsTypes.Building);
    const buildings = mapForExtend.getBuildings();

    buildings.forEach((c: Object3D) => {
      extender?.extendObject(c);
    });

    extender = this.extendersMap.get(MapModelsTypes.Node);
    const nodes = mapForExtend.getNodes();

    nodes.forEach((c: Object3D) => {
      extender?.extendObject(c);
    });
  }
}
