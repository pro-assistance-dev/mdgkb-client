<template>
  <div style="height: 400">
    <!-- <IsometricMapBuildingInfo v-if="buildingModalOpened" @close="buildingModalOpened = false" /> -->
    <!-- <IsometricMapRouter /> -->
    <div id="map" ref="target"></div>
  </div>
</template>

<script setup lang="ts">
import { Object3D } from 'three';
import { onMounted, Ref, ref } from 'vue';

import Engine3D from '@/classes/Engine3D';
import FbxModel from '@/classes/FbxModel';
import MapExtender from '@/classes/MapExtender';
import MapModel from '@/classes/MapModel';
// import IsometricMapBuildingInfo from '@/components/IsometricMap/IsometricMapBuildingInfo.vue';
// import IsometricMapRouter from '@/components/IsometricMap/IsometricMapRouter.vue';
import { CallbackFunction } from '@/interfaces/elements/Callback';
import { MapBuildingsEventsTypes } from '@/interfaces/MapEventsTypes';
import Provider from '@/services/Provider/Provider';

const target = ref();
const buildingModalOpened: Ref<boolean> = ref(false);
const routerModalOpened: Ref<boolean> = ref(true);

const buildingClick = async (event: { id: string }) => {
  console.log('clic');
  await Provider.store.dispatch('buildings/get', event.id);
  buildingModalOpened.value = true;
};

const getRoute = async () => {
  await Provider.store.dispatch('mapRoutes/get', event.id);
};

const initBuildingsEventsMap = (): Map<MapBuildingsEventsTypes, CallbackFunction> => {
  const m = new Map();
  m.set(MapBuildingsEventsTypes.Click, buildingClick.bind(this));
  return m;
};

onMounted(async () => {
  const instance = Engine3D.CreateInstance(target);


  const model = (await FbxModel.AddObjectToScene('models/Map_v5.fbx', instance.scene)) as Object3D;
  const mainObject = model.children[0] as MapModel;
  new MapExtender().extendObject(mainObject);
  mainObject.bindEvents(initBuildingsEventsMap());
  instance.fillObjects();
  await buildRoutes(mainObject);
});

const buildRoutes = async (mainObject: MapModel) => {
  const nodes = mainObject.getNodes();
  // await  Provider.store.dispatch('mapNodes/upload', nodes)
};
</script>

<style lang="scss">
#map {
  width: 800px;
  width: 800px;
  position: static;
}
</style>
