<template>
  <div id="map" ref="target"></div>
  {{ manager }}
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import BuildingModel from '@/classes/BuildingModel';
import Engine3D from '@/classes/Engine3D';
import FbxModel from '@/classes/FbxModel';
const target = ref();
const manager = ref(new BuildingModel());
onMounted(async () => {
  const instance = Engine3D.CreateInstance(target);
  console.log(1);
  await FbxModel.AddObjectToScene('models/Map_v5.fbx', instance.scene);
  manager.value = instance.getManager();
  console.log(manager.value);
});
</script>

<style lang="scss">
#map {
  width: 800px;
  width: 800px;
  position: static;
}
</style>
