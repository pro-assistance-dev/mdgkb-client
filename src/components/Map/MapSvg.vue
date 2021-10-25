<template>
  <div class="page-container">
    <MapRouter />
    <div id="map-svg-container">
      <Component :is="require(`@/assets/img/map.svg`).default" id="map-svg"></Component>
      <MapPopover
        v-if="buildingId && position && building"
        :position="position"
        :building="building"
        @close="(buildingId = null), (building_element = null)"
      ></MapPopover>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref } from 'vue';

import IBuilding from '@/interfaces/buildings/IBuilding';

import MapPopover from './MapPopover.vue';
import MapRouter from './MapRouter.vue';

export default defineComponent({
  name: 'MapSvg',
  components: {
    MapPopover,
    MapRouter,
  },
  props: {
    buildings: {
      type: Array as PropType<Array<IBuilding>>,
      required: true,
    },
  },
  async setup(props) {
    let buildingId = ref('');
    let position = ref();
    let building = ref();
    let numbers = ref();

    const treeJump = (item: HTMLElement) => {
      item.classList.add('jump');
      setTimeout(function () {
        item.classList.remove('jump');
      }, 1000);
    };

    const hoverBuilding = (item: HTMLElement) => {
      // building_element.value = item;
      buildingId.value = '';
      item.classList.add('flicker');

      building.value = props.buildings.find((b) => {
        return b.number === item.id.substr(2, 2);
      });

      setTimeout(function () {
        buildingId.value = item.id;
        item.classList.remove('flicker');
      }, 500);
    };

    onMounted(() => {
      const svgMap = document.getElementById('map-svg-container')?.querySelector('svg');
      console.log(svgMap);
      if (!svgMap) return;
      const decor = svgMap.getElementById('decor');
      const buildingsRef = svgMap.getElementById('buildings');
      console.log(buildingsRef);
      if (!decor || !buildingsRef) return;
      // decor.childNodes.forEach((n) =>
      //   n.addEventListener('mouseover', function () {
      //     treeJump(n as HTMLElement);
      //   })
      // );

      buildingsRef.childNodes.forEach((item: EventTarget) => {
        const buildingId = (item as HTMLElement).id.replace('b-', '');
        const el = document.getElementById(`num-${buildingId}`);
        const b = document.getElementById((item as HTMLElement).id);

        if (el) {
          el.addEventListener('mouseover', () => {
            if (el) el.classList.add('red-num');
            if (b) b.classList.add('hover-building');
          });
        }

        item.addEventListener('mouseover', () => {
          if (el) el.classList.add('red-num');
          if (b) b.classList.add('hover-building');
        });

        item.addEventListener('mouseleave', () => {
          if (el) el.classList.remove('red-num');
          if (b) b.classList.remove('hover-building');
        });

        item.addEventListener('click', () => {
          const el = document.getElementById('map-svg-container');
          if (!el) return;
          let parentPos = el.getBoundingClientRect(),
            childrenPos = (item as HTMLElement).getBoundingClientRect(),
            relativePos = { top: 0, right: 0, bottom: 0, left: 0 };
          relativePos.top = childrenPos.top - parentPos.top;
          relativePos.right = childrenPos.right - parentPos.right;
          relativePos.bottom = childrenPos.bottom - parentPos.bottom;
          relativePos.left = childrenPos.left - parentPos.left;
          if (position && position.value !== null) {
            position.value = relativePos;
          }
          hoverBuilding(item as HTMLElement);
        });
      });
    });

    return {
      numbers,
      building,
      buildingId,
      position,
      treeJump,
      hoverBuilding,
    };
  },
});
</script>

<style scoped lang="scss">
#numbers {
  background: black;
  fill: #96989bff;
}

.red-num {
  fill: red;
  &:hover {
    cursor: pointer;
    fill: red;
  }
}

/*svg path {*/
/*  transform-origin: 25% center;*/
/*}*/

svg #buildings g {
  transition: all 1s;
}

svg #buildings g:hover {
  stroke: #646464;
  stroke-width: 2px;
  /* stroke-dasharray: 2,2; */
  stroke-linejoin: round;
  cursor: pointer;
}

.hover-building {
  stroke: #646464;
  stroke-width: 2px;
  /* stroke-dasharray: 2,2; */
  stroke-linejoin: round;
  cursor: pointer;
}

#num-background {
  fill: #ffffff;
  fill-opacity: 1;
  stroke-width: 0.647495;
}

svg #buildings g polygon,
svg #buildings g path {
  transition: all 1s;
}

svg #buildings g.flicker polygon,
svg #buildings g.flicker path {
  fill: white;
}

svg #buildings g.flicker {
  stroke: #ffffff;
}

svg #decor > g {
  transition: all 1s;
}

svg #decor > g.jump {
  transform: translate(0px, -15px);
}

#content {
  background: #333;
  color: white;
  font-weight: bold;
  padding: 4px 8px;
  font-size: 13px;
  border-radius: 4px;
}

#arrow,
#arrow::before {
  position: absolute;
  width: 8px;
  height: 8px;
  z-index: -1;
}

#arrow::before {
  content: '';
  transform: rotate(45deg);
  background: #333;
}

#content[data-popper-placement^='top'] > #arrow {
  bottom: -4px;
}

#content[data-popper-placement^='bottom'] > #arrow {
  top: -4px;
}

#content[data-popper-placement^='left'] > #arrow {
  right: -4px;
}

#content[data-popper-placement^='right'] > #arrow {
  left: -4px;
}

.page-container {
  position: relative;
}
</style>
