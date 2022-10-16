<template>
  <div class="contact-h3">
    <div class="item-m-g">
      <svg class="icon-map-marker">
        <use xlink:href="#map-marker"></use>
      </svg>
    </div>
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
@import '@/assets/styles/elements/division-info.scss';

// test block
.test {
  width: 290px;
  height: 290px;
  background: #c4c4c4;
}

.division-name {
  margin: 0px;
}
</style>
