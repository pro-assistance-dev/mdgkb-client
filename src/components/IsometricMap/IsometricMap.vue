<template>
  <div style="height: 400">
    <!-- <IsometricMapBuildingInfo v-if="buildingModalOpened" @close="buildingModalOpened = false" /> -->
    <IsometricMapRouter @select-start-node="selectStartNode" @select-end-node="selectEndNode" />
    <div id="map" ref="target"></div>
  </div>
</template>

<script setup lang="ts">
import { Object3D } from 'three';
import { computed, ComputedRef, onMounted, Ref, ref } from 'vue';

import Engine3D from '@/classes/Engine3D';
import FbxModel from '@/classes/FbxModel';
import MapExtender from '@/classes/MapExtender';
import MapModel from '@/classes/MapModel';
import MapRoute from '@/classes/MapRoute';
// import IsometricMapBuildingInfo from '@/components/IsometricMap/IsometricMapBuildingInfo.vue';
import IsometricMapRouter from '@/components/IsometricMap/IsometricMapRouter.vue';
import { CallbackFunction } from '@/interfaces/elements/Callback';
import { MapBuildingsEventsTypes } from '@/interfaces/MapEventsTypes';
import Provider from '@/services/Provider/Provider';
const target = ref();
const buildingModalOpened: Ref<boolean> = ref(false);
const routerModalOpened: Ref<boolean> = ref(true);

const mapModel: Ref<MapModel> = ref(new MapModel());
const engine: Ref<Engine3D> = ref(new Engine3D());

const selectedStartName: Ref<string> = ref('');
const selectedEndName: Ref<string> = ref('');

const route: ComputedRef<MapRoute> = computed(() => Provider.store.getters['mapRoutes/item']);

const buildingClick = async (event: { id: string }) => {
  await Provider.store.dispatch('buildings/get', event.id);
  buildingModalOpened.value = true;
};

const getRoute = async () => {
  await Provider.store.dispatch('mapRoutes/getRoute', { startNodeId: selectedStartName.value, endNodeId: selectedEndName.value });
  engine.value.buildLineFromPoints(mapModel.value.getRouteVector(route.value));
};

const initBuildingsEventsMap = (): Map<MapBuildingsEventsTypes, CallbackFunction> => {
  const m = new Map();
  m.set(MapBuildingsEventsTypes.Click, buildingClick.bind(this));
  return m;
};

const mapSetup = (mapObject: MapModel) => {
  mapModel.value = mapObject;
  new MapExtender().extendObject(mapModel.value);
  mapModel.value.bindEvents(initBuildingsEventsMap());
  mapModel.value.fillNodesNeighbors();
};

onMounted(async () => {
  engine.value = Engine3D.CreateInstance(target);
  const model = (await FbxModel.AddObjectToScene('models/Map_v5.fbx', engine.value.scene)) as Object3D;
  mapSetup(model.children[0] as MapModel);
  engine.value.fillObjects();
});

// const createRoutes() => {
//   // const nodes = mainObject.getNodes();
//   // const requestNodes = nodes.map((n: MapNode) => new MapNodeRequestObject(n));
//   // await Provider.store.dispatch('mapNodes/upload', requestNodes);
// }

const selectStartNode = async (nodeName: string) => {
  selectedStartName.value = nodeName;
  await buildRoute();
};

const selectEndNode = async (nodeName: string) => {
  selectedEndName.value = nodeName;
  await buildRoute();
};

const buildRoute = async () => {
  if (!selectedStartName.value || !selectedEndName.value) {
    return;
  }
  await getRoute();
};
</script>

<style lang="scss">
#map {
  width: 800px;
  width: 800px;
  position: static;
}
</style>
