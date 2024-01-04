<template>
  <div id="map" ref="target"></div>
  {{ manager }}
</template>

<script setup lang="ts">
import * as Three from 'three';
import { onMounted, ref } from 'vue';

import BuildingModel from '@/classes/BuildingModel';
import Engine3D from '@/classes/Engine3D';
import FbxModel from '@/classes/FbxModel';
import MapModel from '@/classes/MapModel';
const target = ref();
const manager = ref(new BuildingModel());
const clickEvent = () => {
  console.log('clickEvent');
};
onMounted(async () => {
  const instance = Engine3D.CreateInstance(target);
  const mainObject: MapModel = (await FbxModel.AddObjectToScene('models/Moroz_map.fbx', instance.scene)) as MapModel;
  mainObject.splitChildrenToGroups();
  console.log(mainObject.children[1].children);
  mainObject.children[1].children.forEach((b: Three.Object3D) => {
    const bb = b.children[0] as BuildingModel;
    const m = new Map();
    m.set('buildingClick', clickEvent.bind(this));
    // @ts-ignore
    if (bb.bindEvents && bb.name !== 'Mesh30') {
      console.log('bind', bb);
      bb.bindEvents(m);
    }
  });

  console.log(mainObject);
});
</script>

<style lang="scss">
#map {
  width: 800px;
  width: 800px;
  position: static;
}
</style>
