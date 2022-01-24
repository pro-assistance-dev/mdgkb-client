<template>
  <div class="page-container">
    <MapRouter />
    <div id="map-svg-container">
      <Component :is="require(`@/assets/img/map.svg`).default" id="map-svg"></Component>
      <MapPopover v-if="buildingId && position && building" :position="position" :building="building" @close="closePopover"></MapPopover>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref } from 'vue';
import { useRoute } from 'vue-router';

import IBuilding from '@/interfaces/buildings/IBuilding';
import IDivision from '@/interfaces/buildings/IDivision';
import IFloor from '@/interfaces/buildings/IFloor';

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
    const route = useRoute();
    let buildingId = ref('');
    let position = ref();
    let building = ref();

    onMounted(() => {
      // decorAnimate();
      getRouteInfo();
      const buildingsRef = document.getElementById('buildings');
      if (!buildingsRef) {
        return;
      }
      buildingsRef.childNodes.forEach((item: EventTarget) => setEventsOnBuilding(item));
    });

    const hoverBuilding = (item: HTMLElement) => {
      buildingId.value = '';
      item.classList.add('flicker');
      building.value = props.buildings.find((b) => {
        return b.number === item.id.substr(2, 2);
      });
      buildingId.value = item.id;
      buildingId.value;
    };

    const getRouteInfo = (): void => {
      const divisionId = route.params['id'];
      props.buildings.forEach((b: IBuilding) => {
        b.floors.forEach((f: IFloor) => {
          const ddd = f.divisions?.find((d: IDivision) => d.id === divisionId);
          if (ddd) {
            buildingId.value = b.id;
            const building = document.getElementById(`b-${b.number}`);
            if (building) {
              setPosition(building as HTMLElement);
              hoverBuilding(building as HTMLElement);
              return;
            }
          }
        });
      });
    };

    const closePopover = () => {
      buildingId.value = '';
      removeBuildingsStyle();
    };

    const setPosition = (item: HTMLElement) => {
      const el = document.getElementById('map-svg-container');
      if (!el) {
        return;
      }
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
    };

    const removeBuildingsStyle = () => {
      Array.from(document.querySelectorAll('.red-num-stable')).forEach((el) => el.classList.remove('red-num-stable'));
      Array.from(document.querySelectorAll('.hover-building-stable')).forEach((el) => el.classList.remove('hover-building-stable'));
      Array.from(document.querySelectorAll('.flicker')).forEach((el) => el.classList.remove('flicker'));
    };

    const selectBuilding = (item: EventTarget, numberOfBuilding: HTMLElement, building: HTMLElement) => {
      removeBuildingsStyle();
      numberOfBuilding.classList.add('red-num-stable');
      building.classList.add('hover-building-stable');
      setPosition(item as HTMLElement);
      hoverBuilding(item as HTMLElement);
    };

    const hoverBuildingEvent = (numberOfBuilding: HTMLElement, building: HTMLElement) => {
      building.classList.add('hover-building');
      if (!numberOfBuilding.classList.contains('red-num-stable')) {
        numberOfBuilding.classList.add('blue-num');
      }
    };

    const setEventsOnBuilding = (item: EventTarget): void => {
      const buildingId = (item as HTMLElement).id.replace('b-', '');
      const numberOfBuilding = document.getElementById(`num-${buildingId}`);
      const building = document.getElementById((item as HTMLElement).id);

      if (buildingId.includes('g') || !numberOfBuilding || !building) {
        return;
      }
      item.addEventListener('mouseover', () => hoverBuildingEvent(numberOfBuilding, building));
      item.addEventListener('click', () => selectBuilding(item, numberOfBuilding, building));

      numberOfBuilding.addEventListener('click', () => selectBuilding(item, numberOfBuilding, building));
      numberOfBuilding.addEventListener('mouseover', () => hoverBuildingEvent(numberOfBuilding, building));

      item.addEventListener('mouseleave', () => {
        building.classList.remove('hover-building');
        numberOfBuilding.classList.remove('blue-num');
      });
    };

    const decorAnimate = (): void => {
      const decor = document.getElementById('decor');
      if (!decor) {
        return;
      }
      decor.childNodes.forEach((n) =>
        n.addEventListener('mouseover', () => {
          treeJump(n as HTMLElement);
        })
      );
    };

    const treeJump = (item: HTMLElement) => {
      item.classList.add('jump');
      setTimeout(function () {
        item.classList.remove('jump');
      }, 1000);
    };

    return {
      closePopover,
      building,
      buildingId,
      position,
      treeJump,
      hoverBuilding,
    };
  },
});
</script>

<style lang="scss">
#numbers {
  background: black;
  fill: #96989bff;
}

.blue-num {
  fill: #01bcee;
  &:hover {
    cursor: pointer;
    fill: #01bcee;
  }
}

.red-num-stable {
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
  //stroke: #646464;
  //stroke-width: 2px;
  /* stroke-dasharray: 2,2; */
  //stroke-linejoin: round;
  //cursor: pointer;
}

.hover-building {
  stroke: #646464;
  stroke-width: 2px;
  /* stroke-dasharray: 2,2; */
  stroke-linejoin: round;
  cursor: pointer;
}

.hover-building-stable {
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
