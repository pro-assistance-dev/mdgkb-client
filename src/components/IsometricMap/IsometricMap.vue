<template>
  <TopSliderContainer slider-on-height="500px" title-background="#006BB4" title-color="#ffffff" :toggle="showDestinationStepper">
    <template #title>
      <span>Навигатор</span>
      <svg class="navi-icon">
        <use xlink:href="#Group 805"></use>
      </svg>
    </template>
    <IsometricMapDestinationStepper @select-node="getRoute" />
  </TopSliderContainer>
  <div style="height: 400">
    <!-- <IsometricMapBuildingInfo v-if="buildingModalOpened" @close="buildingModalOpened = false" /> -->
    <!-- <IsometricMapRouter v-if="mapRouter.interfaceOpened" :map-router="mapRouter" /> -->
    <div class="map-menu"></div>
    <div id="map" ref="target"></div>
  </div>
  <Navi />
</template>

<script setup lang="ts">
import { Object3D } from 'three';
import { computed, ComputedRef, onBeforeMount, onMounted, Ref, ref } from 'vue';

import Navi from '@/assets/svg/Map/Navi.svg';
import Engine3D from '@/classes/Engine3D';
import FbxModel from '@/classes/FbxModel';
import MapExtender from '@/classes/MapExtender';
import MapModel from '@/classes/MapModel';
import MapPainter from '@/classes/MapPainter';
import MapRoute from '@/classes/MapRoute';
import MapRouter from '@/classes/MapRouter';
import IsometricMapDestinationStepper from '@/components/IsometricMap/IsometricMapDestinationStepper.vue';
// import IsometricMapBuildingInfo from '@/components/IsometricMap/IsometricMapBuildingInfo.vue';
import TopSliderContainer from '@/components/Main/TopSliderContainer.vue';
import { CallbackFunction } from '@/interfaces/elements/Callback';
import { MapBuildingsEventsTypes } from '@/interfaces/MapEventsTypes';
import Provider from '@/services/Provider/Provider';
const target = ref();

const buildingModalOpened: Ref<boolean> = ref(false);
const showDestinationStepper = ref(false);

let mapRouter: MapRouter = new MapRouter();
let mapModel: MapModel = new MapModel();
let engine: Engine3D = new Engine3D();

const route: ComputedRef<MapRoute> = computed(() => Provider.store.getters['mapRoutes/item']);

const buildingClick = async (event: { id: string }) => {
  await Provider.store.dispatch('buildings/get', event.id);
  buildingModalOpened.value = true;
};

const getRoute = async (endNode: string) => {
  if (endNode) {
    mapRouter.endNodeName = endNode;
    showDestinationStepper.value = false;
  }
  await Provider.store.dispatch('mapRoutes/getRoute', mapRouter.getNodesForRequest());
  engine.add(MapPainter.GetLineFromPoints(mapModel.getRouteVector(route.value)));
  const mark = mapModel.getMark(mapRouter.endNodeName, false);
  engine.addAndWatch(mark);
};

const initBuildingsEventsMap = (): Map<MapBuildingsEventsTypes, CallbackFunction> => {
  const m = new Map();
  m.set(MapBuildingsEventsTypes.Click, buildingClick.bind(this));
  return m;
};

onBeforeMount(() => {
  mapRouter.selectStart('', Provider.getStringQueryParam('start'));
  mapRouter.selectEnd('', Provider.getStringQueryParam('end'));
});

onMounted(async () => {
  if (mapRouter.startNodeName) {
    showDestinationStepper.value = true;
  }
  engine.init(target);
  const model = (await FbxModel.AddObjectToScene('models/Map_v5.fbx')) as Object3D;
  mapModel = model.children[0] as MapModel;
  new MapExtender().extendObject(mapModel);
  mapModel.setup(initBuildingsEventsMap(), engine);
  engine.add(model);
  engine.fillObjects();
  const mark = mapModel.getMark(mapRouter.startNodeName, true);
  engine.addAndWatch(mark);
});

// const createRoutes = async () => {
//   const nodes = mapModel.getNodes();
//   const requestNodes = nodes.map((n: MapNode) => new MapNodeRequestObject(n));
//   await Provider.store.dispatch('mapNodes/upload', requestNodes);
// };
</script>

<style lang="scss">
.hidden {
  display: none;
}

// .title {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   background: #006BB4;
// }
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
  padding: 2px;
  background: rgba(0, 0, 0, 0.6);
}
</style>
