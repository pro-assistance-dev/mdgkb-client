<template>
  <div id="map" ref="target"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import Engine3D from '@/classes/Engine3D';
import FbxModel from '@/classes/FbxModel';
const target = ref();

onMounted(() => {
  const instance = Engine3D.CreateInstance(target);
  FbxModel.AddObjectToScene('models/Moroz_map.fbx', instance.scene);
});
</script>

<style></style>
