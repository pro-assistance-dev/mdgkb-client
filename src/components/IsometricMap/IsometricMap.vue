<template>
  <IsometricMapDestinationStepper @select-node="getRoute" />
  <PModalWindow :show="buildingModalOpened" :closable="true" @close="close">
    <IsometricMapBuildingInfo />
  </PModalWindow>
  <!-- <IsometricMapRouter v-if="mapRouter.interfaceOpened" :map-router="mapRouter" /> -->
  <!-- <div class="map-menu"></div> -->
  <div id="map" ref="target" class="map-layer" />
  <Navi />
</template>

<script setup lang="ts">
import { Object3D } from 'three';

import Navi from '@/assets/svg/Map/Navi.svg';
import Engine3D from '@/classes/Engine3D';
import FbxModel from '@/classes/FbxModel';
import MapExtender from '@/classes/MapExtender';
import MapModel from '@/classes/MapModel';
import MapPainter from '@/classes/MapPainter';
import MapRoute from '@/classes/MapRoute';
import MapRouter from '@/classes/MapRouter';
import IsometricMapDestinationStepper from '@/components/IsometricMap/IsometricMapDestinationStepper.vue';
import { CallbackFunction } from '@/interfaces/elements/Callback';
import { MapBuildingsEventsTypes } from '@/interfaces/MapEventsTypes';
import Router from '@/services/Router';

const target = ref();
const buildingModalOpened: Ref<boolean> = ref(false);
const engine: Engine3D = new Engine3D();
const mapRouter: MapRouter = new MapRouter(engine);
let mapModel: MapModel = new MapModel();
const route: ComputedRef<MapRoute> = Store.Item('mapRoutes');

const buildingClick = async (event: { id: string }) => {
  await Store.Get('buildings', event.id);

  buildingModalOpened.value = true;
  engine.active = false;
};

const close = async () => {
  buildingModalOpened.value = false;
  setTimeout(() => {
    engine.active = true;
  }, 100);
};

const getRoute = async (endNode: string) => {
  mapRouter.drop();
  if (endNode) {
    mapRouter.endNodeName = endNode;
  }
  await Store.Dispatch('mapRoutes/getRoute', mapRouter.getNodesForRequest());
  mapRouter.add(
    MapPainter.GetLineFromPoints(mapModel.getRouteVector(route.value)),
    mapModel.getMark(mapRouter.endNodeName, false, 0x0aa249),
    mapModel.getRouteVector(route.value)
  );
};

const initBuildingsEventsMap = (): Map<MapBuildingsEventsTypes, CallbackFunction> => {
  const m = new Map();
  m.set(MapBuildingsEventsTypes.Click, buildingClick.bind(this));
  return m;
};

onBeforeMount(() => {
  mapRouter.selectStart('', Router.GetStringQueryParam('start'));
  mapRouter.selectEnd('', Router.GetStringQueryParam('end'));
});

onBeforeUnmount(() => {
  document.body.style.cursor = 'auto';
});
onMounted(async () => {
  engine.init(target);
  const model = (await FbxModel.AddObjectToScene('/models/Map_v5_4_uuid.fbx')) as Object3D;

  mapModel = model.children[0] as MapModel;
  new MapExtender().extendObject(mapModel);
  mapModel.setup(initBuildingsEventsMap(), engine);

  engine.add(model);
  engine.fillObjects();

  const mark = mapModel.getMark(mapRouter.startNodeName, true, 0x006bb4);
  engine.add(mark);
  await getRoute(mapRouter.endNodeName);
});
/*
 * Const createRoutes = async () => {
 *   const nodes = mapModel.getNodes();
 *   const requestNodes = nodes.map((n: MapNode) => new MapNodeRequestObject(n));
 *   await Provider.store.dispatch('mapNodes/upload', requestNodes);
 * };
 */
</script>

<style lang="scss">
.hidden {
  display: none;
}

.map-layer {
  z-index: 100;
}
.map-menu {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  display: flex;
  justify-content: right;
  align-items: center;
  height: 20px;
  margin-top: 60px;
}

#map {
  width: 800px;
  width: 800px;
  position: static;
}

.navi-icon {
  width: 44px;
  height: 44px;
}
.label {
  color: black;
  font-family: sans-serif;
  font-size: 16px;
  background: #ffffff;
  border-radius: 50px;
  border: 1px solid;
  padding: 0 10px;
}
</style>
