<template>
  <div v-if="mount">
    <div v-if="mount" class="route-window">
      <div class="route-window-line">
        <div class="route-window-title">Задайте точки для построения маршрута:</div>
        <div class="button-field">
          <BaseModalButtonClose @click.prevent="close" />
        </div>
      </div>
      <div class="map-router-container-item">
        <el-select
          v-model="selectAId"
          class="route-button"
          filterable
          placeholder=" "
          style="width: 365px"
          @change="selectObject(selectAId, true)"
        >
          <el-option v-for="item in selectItems.filter((el) => el.id !== selectBId)" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
        <button class="a-btn" @click="clickPointButton(true)">Откуда</button>
      </div>
      <div class="map-router-container-item">
        <el-select
          v-model="selectBId"
          class="route-button"
          filterable
          placeholder=" "
          style="width: 365px"
          @change="selectObject(selectBId, false)"
        >
          <el-option v-for="item in selectItems.filter((el) => el.id !== selectAId)" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
        <button class="b-btn" @click="clickPointButton(false)">Куда</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import cloneDeep from 'lodash/cloneDeep';
import { computed, defineComponent, onMounted, PropType, Ref, ref } from 'vue';

import MapPoint from '@/classes/MapPoint';
import BaseModalButtonClose from '@/components/Base/BaseModalButtonClose.vue';
import IBuilding from '@/interfaces/IBuilding';
import IEntrance from '@/interfaces/IEntrance';
import IFloor from '@/interfaces/IFloor';
import IGate from '@/interfaces/IGate';
import IMapObject from '@/interfaces/IMapObject';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'MapRouter',
  components: {
    BaseModalButtonClose,
  },
  props: {
    preSelectedObject: {
      type: Object as PropType<IMapObject>,
      required: true,
    },
    startPointRef: {
      type: Object as PropType<Element | undefined>,
      required: true,
    },
    endPointRef: {
      type: Object as PropType<Element | undefined>,
      required: true,
    },
  },
  emits: ['close', 'selectObject'],
  setup(props, { emit }) {
    const entrances = computed(() => Provider.store.getters['entrances/items']);
    const buildings = computed(() => Provider.store.getters['buildings/buildings']);
    const gates: Ref<IGate[]> = computed(() => Provider.store.getters['gates/items']);

    const selectItems: Ref<IMapObject[]> = ref([]);
    const selectAId: Ref<string> = ref('');
    const selectBId: Ref<string> = ref('');
    const clickedPointA: Ref<boolean> = ref(true);
    const mount = ref(false);

    const selectObject = async (id: string, isStartObject: boolean) => {
      clickedPointA.value = true;
      const selectedObj = selectItems.value.find((item: IMapObject) => item?.id === id);
      await emit('selectObject', selectedObj, isStartObject);
      await buildRoute();
    };

    const buildRoute = async (): Promise<void> => {
      const routePointsRef = document.getElementById('route-points');
      if (!routePointsRef) {
        console.log('id route-points не найден');
        return;
      }
      const routesArrayRef = Array.from(routePointsRef.children);
      if (!props.startPointRef || !props.endPointRef) {
        console.log('заданное строение не найдено');
        return;
      }
      const findPointById = (id: string): Element | undefined => {
        return routesArrayRef.find((el) => el.getAttribute('id') === id);
      };
      let shortestRoute: (Element | null)[] = [];

      const findShortestRoute = (currentPoint: Element, neighbors: string | null, route?: (Element | null)[]): void => {
        if (!currentPoint) {
          console.log(`Указанной точки не существует`);
          return;
        }
        if (!neighbors) {
          console.log('Нет соседних точек, проверить свг');
          return;
        }
        let newRoute: (Element | null)[] = [];
        if (route) {
          newRoute = cloneDeep(route);
        }
        newRoute.push(currentPoint);
        if (
          currentPoint.getAttribute('data-building') === props.endPointRef?.getAttribute('data-building') &&
          currentPoint.getAttribute('data-entrance') === props.endPointRef?.getAttribute('data-entrance')
        ) {
          if (shortestRoute.length > newRoute.length || shortestRoute.length == 0) {
            shortestRoute = cloneDeep(newRoute);
          }
          return;
        }
        if (shortestRoute.length && route && route.length > shortestRoute.length) {
          return;
        }
        const neighborsIdArray = neighbors.split(',');
        for (const id of neighborsIdArray) {
          if (!newRoute.find((el) => el?.getAttribute('id') === id)) {
            const neighborRef = findPointById(id);
            if (!neighborRef) {
              console.log(`Указанного id (${id}) точки не существует`);
              return;
            }
            findShortestRoute(neighborRef, neighborRef.getAttribute('data-neighbors'), cloneDeep(newRoute));
          }
        }
      };
      findShortestRoute(props.startPointRef, props.startPointRef.getAttribute('data-neighbors'));

      const routeRef = document.getElementById('route');
      if (routeRef) {
        routeRef.remove();
      }
      const newRouteRef = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      newRouteRef.setAttribute('id', 'route');
      newRouteRef.style.visibility = 'visible';
      routePointsRef?.append(newRouteRef);

      shortestRoute.forEach((point, index) => {
        const nextPoint = shortestRoute[index + 1];
        if (!nextPoint || !point) {
          return;
        }
        const cx1 = point?.getAttribute('cx');
        const cy1 = point?.getAttribute('cy');
        const cx2 = nextPoint?.getAttribute('cx');
        const cy2 = nextPoint?.getAttribute('cy');
        if (!cx1 || !cy1 || !cx2 || !cy2) {
          return;
        }
        const newLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        newLine.classList.add('red-line');
        newLine.setAttribute('x1', `${Math.abs(Number(cx1))}`);
        newLine.setAttribute('y1', `${Math.abs(Number(cy1))}`);
        newLine.setAttribute('x2', `${Math.abs(Number(cx2))}`);
        newLine.setAttribute('y2', `${Math.abs(Number(cy2))}`);
        newLine.setAttribute('stroke', '#ff4d3b');
        newLine.style.strokeWidth = '5px';
        newRouteRef.appendChild(newLine);
      });
      ElMessage({ message: 'Маршрут построен', type: 'success' });
    };

    const closeShadow = () => {
      const shadow = document.getElementById('shadow');
      if (!shadow) return;
      shadow.style.display = 'none';
    };

    const clickPointButton = (clickedToStart: boolean) => {
      clickedPointA.value = clickedToStart;
      const shadow = document.getElementById('shadow');
      if (!shadow) {
        return;
      }
      shadow.style.display = shadow.style.display === 'none' ? 'unset' : 'none';
    };

    const selectMapPoint = async (item: EventTarget): Promise<void> => {
      const point = new MapPoint(item);
      await emit('selectObject', point, clickedPointA.value);
      updateSelectValue(point.getBuildingNumber(), point.getEntranceNumber());
      closeShadow();
      await buildRoute();
    };

    const updateSelectValue = (building: string, entrance: string) => {
      const res =
        gates.value.find((el: IGate) => el.getBuildingNumber() === building && el.getEntranceNumber() === entrance) ||
        entrances.value.find((el: IEntrance) => String(el.building?.number) === building && String(el.number) === entrance);
      if (!res) {
        return;
      }
      if (clickedPointA.value) {
        selectAId.value = res.id;
      } else {
        selectBId.value = res.id;
      }
    };

    onMounted(async () => {
      await Provider.store.dispatch('entrances/getAll');
      if (props.preSelectedObject && props.preSelectedObject.id) {
        selectAId.value = props.preSelectedObject.id;
      }
      selectItems.value.push(...gates.value);
      buildings.value.forEach((b: IBuilding) => b.floors.forEach((f: IFloor) => selectItems.value.push(...f.divisions)));
      selectItems.value.push(...entrances.value);
      const mapPointsRef = document.getElementById('map-points');
      if (!mapPointsRef) {
        return;
      }
      mapPointsRef.childNodes.forEach((item: EventTarget) => item.addEventListener('click', () => selectMapPoint(item)));
      mount.value = true;
    });

    const close = () => {
      emit('close');
      const flagContainer = document.getElementById('flag');
      if (flagContainer) {
        flagContainer.querySelector('#b-flag')?.remove();
        flagContainer.querySelector('#a-flag')?.remove();
      }
      let elements = document.getElementsByClassName('red-line');
      while (elements.length > 0) {
        elements[0].parentNode?.removeChild(elements[0]);
      }
    };

    return {
      close,
      selectItems,
      clickPointButton,
      buildRoute,
      selectAId,
      selectBId,
      mount,
      selectObject,
      closeShadow,
    };
  },
});
</script>

<style scoped lang="scss">
@import '@/assets/styles/elements/base-style.scss';
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
  border-radius: $normal-border-radius;
  background: $base-background;
}

.route-window {
  width: 100%;
  // border: 1px solid rgb(black, 0.2);
  border: 1px solid lighten(#133dcc, 30%);
  border-radius: $normal-border-radius;
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
