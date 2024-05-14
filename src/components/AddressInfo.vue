<template>
  <div class="block-line">
    <svg class="icon-map-marker">
      <use xlink:href="#map-marker"></use>
    </svg>
    <div class="item-m-p">
      <div class="item-m">
        <svg class="icon-point-brown">
          <use xlink:href="#point"></use>
        </svg>
        м. Октябрьская&nbsp;&nbsp;&nbsp;
        <svg class="icon-point-brown">
          <use xlink:href="#point"></use>
        </svg>
        м. Добрынинская
      </div>
      <div class="item-m">
        <svg class="icon-point-gray">
          <use xlink:href="#point"></use>
        </svg>
        м. Серпуховская
      </div>
      <div class="item-m">
        <a @click="mapId ? $router.push(`/map/${mapId}`) : undefined">
          {{ address }}
        </a>
      </div>
    </div>
  </div>
  <Point />
  <MapMarker />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import MapMarker from '@/assets/svg/DivisionCard/MapMarker.svg';
import Point from '@/assets/svg/DivisionCard/Point.svg';

export default defineComponent({
  name: 'AddressInfo',
  components: {
    MapMarker,
    Point,
  },
  props: {
    address: { type: String as PropType<string>, required: true },
    mapId: { type: String as PropType<string>, required: false },
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';

.block-line {
  position: relative;
  display: flex;
  justify-content: left;
  align-items: end;
}

.icon-map-marker {
  padding-right: 10px;
  margin-bottom: 2px;
  width: $icon-width;
  height: $icon-height;
  fill: $site_dark_gray;
}

.icon-point-brown {
  width: 8px;
  height: 8px;
  fill: brown;
  margin-right: 10px;
}

.icon-point-gray {
  width: 8px;
  height: 8px;
  fill: gray;
  margin-right: 10px;
}
</style>
