<template>
  <div id="map" ref="target"></div>
  {{ manager }}
</template>

<script setup lang="ts">
import { Object3D } from 'three';
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
  const mainObject: MapModel = (await FbxModel.AddObjectToScene('models/Map_v4.fbx', instance.scene)) as MapModel;
  mainObject.splitChildrenToGroups();
  const m = new Map();
  m.set('buildingClick', clickEvent.bind(this));
  mainObject.traverse((c: Object3D) => {
    if (c.name.includes('Building')) {
      c.children.forEach((element) => {
        if (element.name.includes('Mesh')) {
          element.bindEvents(m);
        }
      });
      console.log(c);
      // c.children[0].children[2].bindEvents(m);
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
