<template>
  <div class="legend">
    <div v-for="legend in legends" :key="legend.href" class="legend-item" @click="selectLegend(legend.href)">
      <svg class="legend-icon" :class="`icon-${legend.href}`">
        <use :xlink:href="'#' + legend.href"></use>
      </svg>
      <span class="legend-text" v-html="legend.label"></span>
      <svg v-for="icon in legend.icons" :key="icon" class="legend-icon" :class="`icon-${icon}`" @click.stop="selectLegend(icon)">
        <use :xlink:href="'#' + icon"></use>
      </svg>
    </div>
  </div>
  <LegendIcons />
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';

import LegendIcons from '@/assets/svg/Map/LegendIcons.svg';

export default defineComponent({
  name: 'MapLegends',
  components: {
    LegendIcons,
  },
  emits: ['selectLegend'],
  setup(_, { emit }) {
    const selectedLegend: Ref<string> = ref('');
    const legends = [
      { href: 'barrier', label: 'КПП' },
      { href: 'pedestrian', label: 'Проходная' },
      { href: 'pi', label: 'Пункт выдачи ТСР (1 этаж)' },
      { href: 'parking', label: 'Парковка', icons: ['ai', 'ci'] },
      { href: 'ambulance', label: 'Служебная парковка', icons: ['bi', 'di'] },
      { href: 'entrance', label: 'Вход в здание' },
      { href: 'atm', label: 'Банкомат' },
      { href: 'swing', label: 'Детская площадка' },
      { href: 'art', label: 'Арт-объект' },
      { href: 'chapel', label: `Храм Покрова Пресвятой&nbsp;Богородицы` },
    ];

    const selectLegend = (legend: string) => {
      console.log(legend);
      emit('selectLegend', legend);
    };
    return {
      selectLegend,
      legends,
    };
  },
});
</script>

<style scoped lang="scss">
@import '@/assets/styles/elements/base-style.scss';
* {
  padding: 0px;
  margin: 0px;
}
.hidden {
  display: none;
}

.legend {
  position: absolute;
  left: 0;
  bottom: 20px;
}

.legend-item {
  display: flex;
  justify-content: left;
  align-items: center;
  margin: 5px;
}

.legend-icon {
  &:hover {
    cursor: pointer;
    filter: brightness(140%);
  }
}

.legend-text {
  max-width: 170px;
  font-size: 12px;
  color: $site_dark_gray;
  margin-left: 10px;
}

.icon-ai {
  width: 26px;
  height: 26px;
  fill: #026cb5;
  margin: 0 5px;
}
.icon-bi {
  width: 26px;
  height: 26px;
  fill: #026cb5;
  margin: 0 5px;
}
.icon-ci {
  width: 26px;
  height: 26px;
  fill: #026cb5;
  margin: 0 5px;
}
.icon-di {
  width: 26px;
  height: 26px;
  fill: #026cb5;
  margin: 0 5px;
}

.icon-ambulance {
  width: 26px;
  height: 26px;
  fill: #601c1c;
}

.icon-art {
  width: 26px;
  height: 26px;
  fill: #601c1c;
}

.icon-atm {
  width: 26px;
  height: 26px;
  fill: #601c1c;
}
.icon-barrier {
  width: 26px;
  height: 26px;
  fill: #601c1c;
}
.icon-chapel {
  width: 26px;
  height: 26px;
  fill: #601c1c;
}
.icon-parking {
  width: 26px;
  height: 26px;
  fill: #601c1c;
}
.icon-pedestrian {
  width: 26px;
  height: 26px;
  fill: #601c1c;
}
.icon-pi {
  width: 26px;
  height: 26px;
  fill: #601c1c;
}
.icon-swing {
  width: 26px;
  height: 26px;
  fill: #601c1c;
}

.icon-entrance {
  width: 26px;
  height: 26px;
  fill: #000000;
}
</style>
