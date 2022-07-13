<template>
  <div class="page-container">
    <div id="map-svg-container">
      <Map id="map-svg" />
      <MapPopover v-if="buildingId && position && building" :position="position" :building="building" @close="closePopover"></MapPopover>
      <MapRouter />
      <div v-if="chosenGate" ref="enterPopoverRef" class="enter-popover">
        <div class="card-item enter-popover-container">
          <BaseModalButtonClose class="enter-popover-container-close" @click="closeEnterPopover" />
          <div class="enter-popover-container-header">
            <div>{{ chosenGate.name }}</div>
          </div>
          <button class="order-button" @click="$router.push({ name: 'VisitsApplicationPage', params: { gateId: chosenGate.id } })">
            Заказать пропуск
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, onMounted, PropType, Ref, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import Map from '@/assets/img/map.svg';
import BaseModalButtonClose from '@/components/Base/BaseModalButtonClose.vue';
import IBuilding from '@/interfaces/buildings/IBuilding';
import IDivision from '@/interfaces/buildings/IDivision';
import IFloor from '@/interfaces/buildings/IFloor';
import IGate from '@/interfaces/IGate';

import MapPopover from './MapPopover.vue';
import MapRouter from './MapRouter.vue';

export default defineComponent({
  name: 'MapSvg',
  components: {
    MapPopover,
    MapRouter,
    Map,
    BaseModalButtonClose,
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
    const store = useStore();
    const enterPopoverRef = ref<HTMLDivElement>();
    const gates: Ref<IGate[]> = computed(() => store.getters['gates/items']);
    const chosenGate: Ref<IGate | undefined> = ref();

    onBeforeMount(async (): Promise<void> => {
      await store.dispatch('gates/getAll');
      if (gates.value.length > 0) {
        chosenGate.value = gates.value[0];
      }
    });

    onMounted(() => {
      // decorAnimate();
      hideRoutePoints();
      toggleEnterNumbers();
      getRouteInfo();
      const shadow = document.getElementById('shadow');
      const buildingsRef = document.getElementById('buildings');
      if (!buildingsRef || !shadow) {
        return;
      }
      shadow.style.display = 'none';
      buildingsRef.childNodes.forEach((item: EventTarget) => setEventsOnBuilding(item));
      const entersRef = document.querySelectorAll('.barrier');
      entersRef.forEach((item: Element) => setEventsOnBarrier(item));
    });

    const setEventsOnBarrier = (item: Element) => {
      item.addEventListener('click', () => selectBarrier(item));
    };
    const selectBarrier = (item: Element) => {
      gates.value.forEach((el) => {
        if (el.id === item.id) {
          chosenGate.value = el;
        }
      });
      if (!enterPopoverRef.value) return;
      enterPopoverRef.value.style.display = 'unset';
      enterPopoverRef.value.style.top = item.getBoundingClientRect().y + document.documentElement.scrollTop - 100 + 'px';
      enterPopoverRef.value.style.left = item.getBoundingClientRect().x - 300 + 'px';
    };

    const closeEnterPopover = () => {
      if (!enterPopoverRef.value) return;
      enterPopoverRef.value.style.display = 'none';
    };

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
              const buildingNumber = building.id.split('-')[1];
              const numberOfBuilding = document.getElementById(`num-${buildingNumber}`);
              if (numberOfBuilding) {
                selectBuilding(numberOfBuilding, building);
                return;
              }
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

    const selectBuilding = (numberOfBuilding: HTMLElement, building: HTMLElement) => {
      removeBuildingsStyle();
      numberOfBuilding.classList.add('red-num-stable');
      building.classList.add('hover-building-stable');
      setPosition(building);
      hoverBuilding(building);
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
      item.addEventListener('click', () => selectBuilding(numberOfBuilding, building));

      numberOfBuilding.addEventListener('click', () => selectBuilding(numberOfBuilding, building));
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

    const toggleEnterNumbers = () => {
      const numbers = document.getElementById('enter-numbers');
      if (numbers) {
        if (numbers.style.display === 'none') {
          numbers.style.display = '';
        } else {
          numbers.style.display = 'none';
        }
      }
    };

    const hideRoutePoints = () => {
      const routePointsRef = document.getElementById('route-points');
      if (!routePointsRef) {
        return;
      }
      routePointsRef.style.visibility = 'hidden';
    };

    return {
      closePopover,
      building,
      buildingId,
      position,
      treeJump,
      hoverBuilding,
      enterPopoverRef,
      closeEnterPopover,
      chosenGate,
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
.barrier {
  &:hover {
    cursor: pointer;
    filter: brightness(150%);
  }
}
.enter-popover {
  display: none;
  position: absolute;
  z-index: 80;
  top: 0;
  left: 0;
  width: 250px;
  .card-item {
    padding-top: 5px;
  }
  &-container {
    box-shadow: 0px 0px 10px -2px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 14px;
    position: relative;
    &-close {
      position: absolute;
      top: 0;
      right: 0;
    }
    &-header {
      margin: 0 5px 5px 0;
    }
    .order-button {
      padding: 5px 10px;
      border-radius: 10px;
      cursor: pointer;
      background-color: #2754ec;
      border: none;
      font-weight: bold;
      width: 150px;
      color: white;
      &:hover {
        background-color: darken(#2754ec, 10%);
      }
    }
  }
}

#map-svg-container {
  max-width: 1344px;
  // margin: 0 auto;
}
.map-point {
  transition: 0.3s;
  &:hover {
    fill: #ff4d3b;
    cursor: pointer;
  }
}
</style>
