<template>
  <div id="map" ref="target"></div>
</template>

<script setup lang="ts">
import { Object3D } from 'three';
import { onMounted, ref } from 'vue';
import { computed, ComputedRef } from 'vue';

import Building from '@/classes/Building';
import Engine3D from '@/classes/Engine3D';
import FbxModel from '@/classes/FbxModel';
import MapExtender from '@/classes/MapExtender';
import MapModel from '@/classes/MapModel';
import { CallbackFunction } from '@/interfaces/elements/Callback';
import { MapBuildingsEventsTypes } from '@/interfaces/MapEventsTypes';
import Provider from '@/services/Provider/Provider';
const target = ref();

const building: ComputedRef<Building> = computed<Building>(() => Provider.store.getters['buildings/item']);
const buildingClick = async (event: { id: string }) => {
  await Provider.store.dispatch('buildings/get', event.id);
};

const initBuildingsEventsMap = (): Map<MapBuildingsEventsTypes, CallbackFunction> => {
  const m = new Map();
  m.set(MapBuildingsEventsTypes.Click, buildingClick.bind(this));
  return m;
};

onMounted(async () => {
  const instance = Engine3D.CreateInstance(target);
  const model = (await FbxModel.AddObjectToScene('models/Map_v4.fbx', instance.scene)) as Object3D;
  const mainObject = model.children[0] as MapModel;
  new MapExtender().extendObject(mainObject);
  mainObject.bindEvents(initBuildingsEventsMap());
  instance.fillObjects();
});
const buildRoutes = async (mainObject: MapModel) => {
  const nodes = mainObject.getNodes();
  console.log(nodes);
  // Provider.store.dispatch
};
</script>

<style lang="scss">
#map {
  width: 800px;
  width: 800px;
  position: static;
}
</style>
