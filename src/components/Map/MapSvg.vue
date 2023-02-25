<template>
  <div class="page-container">
    <div id="map-svg-container">
      <Map id="map-svg" :object-a="objectA" />
      <MapLegends @select-legend="selectLegend" />
      <div class="fixed" style="position: fixed; right: 50px; top: 135px">
        <MapSelect :show-router-button="!isShowMapRouter" @selectObject="selectObject" @openMapRouter="openMapRouter" />
        <MapPopover v-if="buildingId && position && building" :position="position" :building="building" @close="closePopover"></MapPopover>
        <MapRouter
          v-if="isShowMapRouter"
          :pre-selected-object="objectA"
          :start-point-ref="startPointRef"
          :end-point-ref="endPointRef"
          @selectObject="selectObject"
          @close="closeMapRouter"
        />
      </div>
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

import Map from '@/assets/img/map.svg';
import Division from '@/classes/Division';
import BaseModalButtonClose from '@/components/Base/BaseModalButtonClose.vue';
import MapLegends from '@/components/Map/MapLegends.vue';
import MapPopover from '@/components/Map/MapPopover.vue';
import MapRouter from '@/components/Map/MapRouter.vue';
import MapSelect from '@/components/Map/MapSelect.vue';
import IBuilding from '@/interfaces/IBuilding';
import IFloor from '@/interfaces/IFloor';
import IGate from '@/interfaces/IGate';
import IMapObject from '@/interfaces/IMapObject';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'MapSvg',
  components: {
    MapPopover,
    MapRouter,
    Map,
    BaseModalButtonClose,
    MapLegends,
    MapSelect,
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

    let selectedBuilding = '';
    let selectedEntrance = '';

    let startPointRef: Ref<Element | undefined> = ref(undefined);
    let endPointRef: Ref<Element | undefined> = ref(undefined);

    const objectA: Ref<IMapObject | undefined> = ref(undefined);
    const enterPopoverRef = ref<HTMLDivElement>();
    const gates: Ref<IGate[]> = computed(() => Provider.store.getters['gates/items']);
    const chosenGate: Ref<IGate | undefined> = ref();
    const isShowMapRouter: Ref<boolean> = ref(false);

    const closeMapRouter = () => {
      isShowMapRouter.value = false;
    };

    const openMapRouter = async (objA: IMapObject | undefined) => {
      objectA.value = objA;
      isShowMapRouter.value = true;
    };

    onBeforeMount(async (): Promise<void> => {
      await Provider.store.dispatch('gates/getAll');
      if (gates.value.length > 0) {
        chosenGate.value = gates.value[0];
      }
    });

    onMounted(() => {
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
      if (!enterPopoverRef.value) {
        return;
      }
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
        return b.number === item.id.substr(2);
      });
      buildingId.value = item.id;
      buildingId.value;
    };

    const getRouteInfo = (): void => {
      const divisionId = Provider.route().params['id'];
      props.buildings.forEach((b: IBuilding) => {
        b.floors.forEach((f: IFloor) => {
          const ddd = f.divisions?.find((d: Division) => d.id === divisionId);
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

    const selectObject = (obj: IMapObject, isStartObject: boolean): void => {
      if (!obj) {
        return;
      }
      selectedBuilding = obj.getBuildingNumber();
      selectedEntrance = obj.getEntranceNumber();
      if (obj instanceof Division) {
        const numberOfBuilding = document.getElementById(`num-${selectedBuilding}`);
        const building = document.getElementById(`b-${selectedBuilding}`);
        if (numberOfBuilding && building) {
          selectBuilding(numberOfBuilding, building);
        }
      }
      objectA.value = obj;
      setSelectedMapPoint(isStartObject);
      setPointsRef(isStartObject);
    };

    // Show chosen pointer on map
    const setSelectedMapPoint = (isStartObject: boolean) => {
      const mapPointsContainer = document.getElementById('map-points');
      if (!mapPointsContainer) {
        return;
      }
      const point = mapPointsContainer.querySelector(`[data-building='${selectedBuilding}'][data-entrance='${selectedEntrance}']`);
      const flagContainer = document.getElementById('flag');
      if (!point || !flagContainer) {
        return;
      }
      const flag = (point as HTMLElement).cloneNode(true);
      (flag as HTMLElement).classList.remove('map-point');
      flagContainer.querySelector(`${isStartObject ? '#a' : '#b'}-flag`)?.remove();
      (flag as HTMLElement).style.fill = isStartObject ? '#f3911c' : '#006bb5';
      (flag as HTMLElement).id = isStartObject ? 'a-flag' : 'b-flag';
      flagContainer.appendChild(flag);
    };

    const setPointsRef = (isStartObj: boolean): void => {
      const routePointsRef = document.getElementById('route-points');
      if (!routePointsRef) {
        console.log('id route-points не найден');
        return;
      }
      const routesArrayRef = Array.from(routePointsRef.children);
      const r = routesArrayRef.find((el) => {
        return el.getAttribute('data-building') === selectedBuilding && el.getAttribute('data-entrance') === selectedEntrance;
      });
      if (isStartObj) {
        startPointRef.value = r;
      } else {
        endPointRef.value = r;
      }
    };

    const selectLegend = (legendClass: string): void => {
      const legends = document.getElementsByClassName(legendClass);
      for (const legend of legends) {
        legend.classList.add('jump');
        setTimeout(() => {
          legend.classList.remove('jump', 'jump-transform');
          legend.classList.add('remove-jump');
        }, 1000);
        setTimeout(() => legend.classList.remove('remove-jump'), 2000);
      }
    };

    return {
      startPointRef,
      endPointRef,
      selectLegend,
      selectObject,
      objectA,
      closePopover,
      building,
      buildingId,
      position,
      // treeJump,
      hoverBuilding,
      enterPopoverRef,
      closeEnterPopover,
      chosenGate,
      closeMapRouter,
      isShowMapRouter,
      openMapRouter,
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

.jump {
  transition: all ease-in-out 1s;
  transform-origin: 0 1%;
  margin-bottom: 4px;
  padding-bottom: 4px;
  filter: brightness(180%);
}

.jump-transform {
  transition: all ease-in-out 1s;
  transform: translate(0px, -4px);
}

.remove-jump {
  transition: all ease-in-out 1s;
  //transform: translate(0px, 0px);
  filter: brightness(100%);
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
