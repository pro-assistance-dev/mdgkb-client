<template>
  <div>
    <div class="route-window">
      <div class="route-window-line">
        <div class="route-window-title">Задайте точки для построения маршрута:</div>
        <div class="button-field">
          <BaseModalButtonClose @click.prevent="mapRouter.close()" />
        </div>
      </div>
      <div class="map-router-container-item">
        <div>
          <el-button @click="mapRouter.openSelectStartInterface()">Выберете точку отправки</el-button>
          <el-button @click="mapRouter.openSelectEndInterface()">Выберете точку отправки</el-button>
        </div>
        <!-- <RemoteSearch -->
        <!--   v-if="mapRouter.searchCanOpen()" -->
        <!--   key-value="mapObject" -->
        <!--   placeholder="Введите отправную точку" -->
        <!--   max-width="100%" -->
        <!--   @select="(e) => mapRouter.selectSearch(e)" -->
        <!-- /> -->
        <!-- <button class="a-btn" @click="clickPointButton(true)">Откуда</button> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

import MapRouter from '@/classes/MapRouter';
import BaseModalButtonClose from '@/components/Base/BaseModalButtonClose.vue';
// import RemoteSearch from '@/components/RemoteSearch.vue';
// const emit = defineEmits(['close', 'selectOnMapMode', 'selectStartNode', 'selectEndNode']);

const props = defineProps({
  mapRouter: { type: MapRouter, required: true },
});

// const selectStart = (objectName: string, nodeName: string) => {
//   props.mapRouter.selectStart()
// };
//
// const selectEnd = (objectName: string, nodeName: string) => {
//   props.mapRouter.selectEnd()
//   emit('selectEndNode', nodeName);
// };
//
// const selectSearch = (event: SearchElement) => {
//   if (props.mapRouter.selectedStartMod) {
//     selectStart(event.label, event.value);
//     return;
//   }
//   selectEnd(event.label, event.value);
// };
//
// const close = () => {
//   resetSelectMods();
//   emit('close');
// };
</script>

<style scoped lang="scss">
@import '@/assets/styles/base-style.scss';
.map-router-container {
  display: flex;
  flex-direction: column;
  &-item {
    margin-bottom: 0;
    display: flex;
    button {
      width: 85px;
      border-radius: 20px;
      border: none;
      cursor: pointer;
      margin-left: 10px;
      color: white;
    }
    .a-btn {
      background-color: #f3911c;
      &:hover {
        background-color: darken(#f3911c, 10%);
      }
    }
    .b-btn {
      background-color: #006bb5;
      &:hover {
        background-color: darken(#006bb5, 10%);
      }
    }
  }
}
:deep(.select-d .el-input__inner) {
  border-radius: 20px;
  background: #0aa249;
}
:deep(.select-d .el-input__inner) {
  color: #ffffff;
}

:deep(.select-d .el-input__inner::placeholder) {
  color: #ffffff;
}

:deep(.el-select .el-input .el-select__caret) {
  color: #ffffff;
  font-size: 15px;
  font-weight: bold;
  margin-right: 5px;
}

:deep(.route-button .el-input__inner) {
  border-radius: 20px;
  background: #ffffff;
}
:deep(.route-button .el-input__inner) {
  color: $site_dark_gray;
}

:deep(.route-button .select-d .el-input__inner::placeholder) {
  color: $site_dark_gray;
}

:deep(.route-button .el-select .el-input .el-select__caret) {
  color: $site_dark_gray;
  font-size: 15px;
  font-weight: bold;
  margin-right: 5px;
}

:deep(.el-button) {
  // letter-spacing: 1.1px;
  background-color: #ffffff;
  color: #133dcc;
  border-color: #133dcc;
  margin-left: 10px;
}

:deep(.el-button:hover) {
  background-color: #133dcc;
  color: white;
  border-color: white;
}

.select-division {
  margin-top: 10px;
}

.description-point {
  width: 100%;
  height: 70px;
  margin-top: 10px;
  border: 1px solid rgb(black, 0.2);
  border-radius: $border-radius;
  background: $base-background;
}

.route-window {
  width: 100%;
  // border: 1px solid rgb(black, 0.2);
  border: 1px solid lighten(#133dcc, 30%);
  border-radius: $border-radius;
  background: $base-background;
  margin-top: 10px;
  // padding-bottom: 15px;
}

.route-window-title {
  // text-transform: uppercase;
  margin: 10px 16px;
  // color: $site_gray;
  color: lighten(#133dcc, 20%);
  font-size: 14px;
}

.map-router-container-item {
  margin: 0 15px 15px 20px;
}

.route-window-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button-field {
  margin-right: 8px;
}

.icon-change {
  width: 15px;
  height: 15px;
  fill: #ffffff;
  stroke: $site_gray;
  margin-right: 50px;
}

.icon-change:hover {
  fill: #ffffff;
  stroke: $site_dark_gray;
}
</style>
