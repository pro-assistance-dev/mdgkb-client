<template>
  <div v-if="mount">
    <div class="select-division">
      <el-select
        v-model="selectAId"
        class="select-d"
        filterable
        placeholder="Выберите вход, парковку, здание или отделение"
        style="width: 380px"
        @change="selectAChangeHandler"
      >
        <el-option-group>
          <el-option v-for="streetEntrance in streetEntrances" :key="streetEntrance.id" :label="streetEntrance.name" />
        </el-option-group>
        <el-option-group>
          <el-option v-for="park in parkings" :key="park.value" :label="park.label" />
        </el-option-group>
        <el-option-group />
        <template v-for="building in buildings.filter((b) => b.floors.length && b.getFloorsWithDivisions().length > 0)" :key="building">
          <div class="item-box">
            <div class="el-select-dropdown__item" style="cursor: default; text-transform: uppercase; color:#A1A7BD">Строение {{ building.number }}</div>
            <template v-for="floor in building.getFloorsWithDivisions()" :key="floor.id">
              <div class="el-select-dropdown__item" style="padding-left: 40px; cursor: default; text-transform: uppercase; color:#A1A7BD">Этаж {{ floor.number }}</div>
              <el-option v-for="division in floor.divisions" :key="division.id" :value="division.id" :label="division.name">
                <span class="el-select-dropdown__item" style="padding-left: 80px; font-size: 14px; color:#343D5C">{{ division.name }}</span>
              </el-option>
            </template>
          </div>
        </template>
      </el-select>
      <div class="button-box">
        <button v-if="showRouterButton" class="route-b" @click="$emit('openMapRouter', selectA)">Маршрут</button>
        <button v-else class="route-b-2" @click="$emit('openMapRouter', selectA)">Маршрут</button>
      </div>
    </div>
  </div>
  <!-- <el-button @click="toggleEnterNumbers">Показать нумерацию</el-button> -->
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import cloneDeep from 'lodash/cloneDeep';
import { computed, defineComponent, onMounted, PropType, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import FilterQuery from '@/classes/filters/FilterQuery';
import IBuilding from '@/interfaces/IBuilding';
import IDivision from '@/interfaces/IDivision';
import IEntrance from '@/interfaces/IEntrance';
import IFloor from '@/interfaces/IFloor';
import IOptionGroup from '@/interfaces/IOptionGroup';
import IStreetEntranceRef from '@/interfaces/IStreetEntranceRef';
import IOption from '@/interfaces/schema/IOption';
import DivisionsFiltersLib from '@/services/Provider/libs/filters/DivisionsFiltersLib';
import DivisionsSortsLib from '@/services/Provider/libs/sorts/DivisionsSortsLib';

export default defineComponent({
  name: 'MapRouter',
  components: {
    // Change,
  },
  props: {
    showRouterButton: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
  },
  emits: ['openMapRouter', 'selectDivision'],
  setup(_, { emit }) {
    const store = useStore();
    const entrances = computed(() => store.getters['entrances/items']);
    // const divisions = computed(() =>
    //   store.getters['divisions/divisions'].filter((division: IDivision) => division.entrance && !division.isCenter)
    // );
    const buildings = computed(() => store.getters['buildings/buildings']);
    const streetEntrances: Ref<IStreetEntranceRef[]> = ref([
      { id: 'main-enter-1', name: 'Вход на территорию больницы', building: 'main-enter', entrance: '1' },
      { id: 'main-enter-2', name: 'Вход для пациентов, записанных на прием в КДЦ', building: 'main-enter', entrance: '2' },
      { id: 'main-enter-3', name: 'Вход для пациентов за экстренной медицинской помощью', building: 'main-enter', entrance: '3' },
    ]);
    const parkings: Ref<IOption[]> = ref([
      { value: '1', label: 'Парковка A' },
      { value: '2', label: 'Парковка B' },
      { value: '3', label: 'Парковка C' },
      { value: '4', label: 'Парковка D' },
    ]);
    const selectItems: Ref<(IDivision | IEntrance | IStreetEntranceRef)[]> = ref([]);
    const selectItemsGroups: Ref<IOptionGroup[]> = ref([]);
    let selectADataBuilding = '';
    let selectBDataBuilding = '';
    let selectADataEntrance = '';
    let selectBDataEntrance = '';
    const selectAId: Ref<string> = ref('');
    const selectA: Ref<IDivision | IEntrance | IStreetEntranceRef | undefined> = ref();
    const selectBId: Ref<string> = ref('');
    const selectB: Ref<IDivision | IEntrance | IStreetEntranceRef | undefined> = ref();
    const clickedPointA: Ref<boolean> = ref(true);
    const mount = ref(false);
    const loading = computed(() => store.getters['map/loading']);
    const svgns = 'http://www.w3.org/2000/svg';

    const selectAChangeHandler = (id: string) => {
      console.log(id);

      // selectA.value = store.getters['divisions/divisionById'](id);
      clickedPointA.value = true;
      buildings.value.forEach((b: IBuilding) => {
        b.floors.forEach((f: IFloor) => {
          const obj = f.divisions.find((d: IDivision) => d.id === id);
          if (obj) {
            selectA.value = obj;
          }
        });
      });

      emit('selectDivision', selectA.value);
      if (selectA.value?.constructor.name === 'Division') {
        selectADataBuilding = String((selectA.value as IDivision)?.entrance?.building?.number);
        selectADataEntrance = String((selectA.value as IDivision)?.entrance?.number);
      } else if (selectA.value?.constructor.name === 'Entrance') {
        selectADataBuilding = String((selectA.value as IEntrance)?.building?.number);
        selectADataEntrance = String((selectA.value as IEntrance)?.number);
      } else {
        selectADataBuilding = (selectA.value as IStreetEntranceRef)?.building;
        selectADataEntrance = (selectA.value as IStreetEntranceRef)?.entrance;
      }
      const mapPointsContainer = document.getElementById('map-points');
      if (!mapPointsContainer) return;
      const point = mapPointsContainer.querySelector(`[data-building='${selectADataBuilding}'][data-entrance='${selectADataEntrance}']`);
      if (!point) return;
      setSelectedMapPoint(point);
      buildRoute();
    };
    const selectBChangeHandler = (id: string) => {
      // selectB.value = store.getters['divisions/divisionById'](id);
      clickedPointA.value = false;
      selectB.value = selectItems.value.find((item: IDivision | IEntrance | IStreetEntranceRef) => item.id === id);
      if (selectB.value?.constructor.name === 'Division') {
        selectBDataBuilding = String((selectB.value as IDivision)?.entrance?.building?.number);
        selectBDataEntrance = String((selectB.value as IDivision)?.entrance?.number);
      } else if (selectB.value?.constructor.name === 'Entrance') {
        selectBDataBuilding = String((selectB.value as IEntrance)?.building?.number);
        selectBDataEntrance = String((selectB.value as IEntrance)?.number);
      } else {
        selectBDataBuilding = (selectB.value as IStreetEntranceRef)?.building;
        selectBDataEntrance = (selectB.value as IStreetEntranceRef)?.entrance;
      }
      const mapPointsContainer = document.getElementById('map-points');
      if (!mapPointsContainer) return;
      const point = mapPointsContainer.querySelector(`[data-building='${selectBDataBuilding}'][data-entrance='${selectBDataEntrance}']`);
      if (!point) return;
      setSelectedMapPoint(point);
      buildRoute();
    };

    const buildRoute = async (): Promise<void> => {
      const routePointsRef = document.getElementById('route-points');
      if (!routePointsRef) {
        console.log('id route-points не найден');
        return;
      }

      const routesArrayRef = Array.from(routePointsRef.children);
      const startPointRef = routesArrayRef.find((el) => {
        return el.getAttribute('data-building') === selectADataBuilding && el.getAttribute('data-entrance') === selectADataEntrance;
      });
      const endPointRef = routesArrayRef.find((el) => {
        return el.getAttribute('data-building') === selectBDataBuilding && el.getAttribute('data-entrance') === selectBDataEntrance;
      });
      if (!startPointRef || !endPointRef) {
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
          currentPoint.getAttribute('data-building') === selectBDataBuilding &&
          currentPoint.getAttribute('data-entrance') === selectBDataEntrance
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
      findShortestRoute(startPointRef, startPointRef.getAttribute('data-neighbors'));

      const routeRef = document.getElementById('route');
      if (routeRef) {
        routeRef.remove();
      }
      const newRouteRef = document.createElementNS(svgns, 'g');
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
        newLine.setAttribute('x1', `${Math.abs(Number(cx1))}`);
        newLine.setAttribute('y1', `${Math.abs(Number(cy1))}`);
        newLine.setAttribute('x2', `${Math.abs(Number(cx2))}`);
        newLine.setAttribute('y2', `${Math.abs(Number(cy2))}`);
        newLine.setAttribute('stroke', '#ff4d3b');
        newLine.style.strokeWidth = '5px';
        newRouteRef.appendChild(newLine);
      });
      store.commit('map/setLoading', false);
      ElMessage({ message: 'Маршрут построен', type: 'success' });
    };
    const closeShadow = () => {
      const shadow = document.getElementById('shadow');
      if (!shadow) return;
      shadow.style.display = 'none';
    };

    const highlightEnters = () => {
      const shadow = document.getElementById('shadow');
      if (!shadow) return;
      if (shadow.style.display === 'none') {
        shadow.style.display = 'unset';
      } else {
        shadow.style.display = 'none';
      }
    };

    const clickButtonA = () => {
      clickedPointA.value = true;
      highlightEnters();
    };
    const clickButtonB = () => {
      clickedPointA.value = false;
      highlightEnters();
    };

    const setEventsOnMapPoint = (item: EventTarget): void => {
      item.addEventListener('click', () => selectMapPoint(item));
    };

    const selectMapPoint = (item: EventTarget): void => {
      const itemDataBuilding = (item as HTMLElement).getAttribute('data-building');
      const itemDataEntrance = (item as HTMLElement).getAttribute('data-entrance');
      if (!itemDataBuilding || !itemDataEntrance) return;
      if (clickedPointA.value) {
        selectADataBuilding = itemDataBuilding;
        selectADataEntrance = itemDataEntrance;
      } else {
        selectBDataBuilding = itemDataBuilding;
        selectBDataEntrance = itemDataEntrance;
      }
      updateSelectValue(itemDataBuilding, itemDataEntrance);
      setSelectedMapPoint(item);
      if (!selectA.value) {
        ElMessage({ message: 'Пожалуйста, выберите точку маршрута А', type: 'success' });
        clickedPointA.value = true;
        return;
      } else if (!selectB.value) {
        ElMessage({ message: 'Пожалуйста, выберите точку маршрута B', type: 'success' });
        clickedPointA.value = false;
        return;
      }
      closeShadow();
      buildRoute();
    };

    // Show chosen pointer on map
    const setSelectedMapPoint = (item: EventTarget) => {
      const flagContainer = document.getElementById('flag');
      if (!flagContainer) return;
      const flag = (item as HTMLElement).cloneNode(true);
      (flag as HTMLElement).classList.remove('map-point');
      if (clickedPointA.value) {
        flagContainer.querySelector('#a-flag')?.remove();
        (flag as HTMLElement).style.fill = '#f3911c';
        (flag as HTMLElement).id = 'a-flag';
      } else {
        flagContainer.querySelector('#b-flag')?.remove();
        (flag as HTMLElement).style.fill = '#006bb5';
        (flag as HTMLElement).id = 'b-flag';
      }
      flagContainer.appendChild(flag);
    };

    const updateSelectValue = (building: string, entrance: string) => {
      const res =
        streetEntrances.value.find((el: IStreetEntranceRef) => el.building === building && el.entrance === entrance) ||
        entrances.value.find((el: IEntrance) => String(el.building?.number) === building && String(el.number) === entrance);
      if (!res) return;
      if (clickedPointA.value) {
        selectA.value = res;
        selectAId.value = res.id;
      } else {
        selectB.value = res;
        selectBId.value = res.id;
      }
    };

    onMounted(async () => {
      const fq = new FilterQuery();
      fq.filterModels.push(DivisionsFiltersLib.onlyDivisions());
      fq.sortModels.push(DivisionsSortsLib.byName());
      await store.dispatch('divisions/getAll', fq);
      await store.dispatch('entrances/getAll');
      // selectItems.value = streetEntrances.value.concat(divisions.value, entrances.value);
      // selectItemsGroups.value.push({ label: '', options: divisions.value });
      const mapPointsRef = document.getElementById('map-points');
      if (!mapPointsRef) return;
      mapPointsRef.childNodes.forEach((item: EventTarget) => setEventsOnMapPoint(item));
      mount.value = true;
    });

    return {
      buildings,
      parkings,
      streetEntrances,
      selectA,
      selectItemsGroups,
      selectItems,
      clickButtonA,
      clickButtonB,
      buildRoute,
      selectAId,
      selectBId,
      mount,
      selectAChangeHandler,
      selectBChangeHandler,
      loading,
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

.route-b {
  width: 110px;
  height: 40px;
  text-decoration: none;
  display: inline-block;
  border: none;
  border-radius: 20px;
  background-color: #133dcc;
  color: #ffffff;
  border-color: #133dcc;
  cursor: pointer;
}

.route-b:hover {
  background-color: lighten(#133dcc, 10%);
  color: white;
  border-color: white;
}

.route-b:active {
  background-color: lighten(#133dcc, 10%);
  color: white;
  border-color: white;
}

.route-b-2 {
  width: 110px;
  height: 40px;
  text-decoration: none;
  display: inline-block;
  border: 1px solid lighten(#133dcc, 20%);
  border-radius: 20px;
  background-color: #ffffff;
  color: lighten(#133dcc, 20%);
}

.select-division {
  display: flex;
  margin: 10px 0;
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
  border: 1px solid rgb(black, 0.2);
  border-radius: $normal-border-radius;
  background: $base-background;
  margin-top: 10px;
  padding-bottom: 15px;
}

.route-window-title {
  text-transform: uppercase;
  margin: 10px 16px;
  color: $site_gray;
}

.map-router-container-item {
  margin-left: 20px;
}

.choice {
  display: flex;
  align-items: center;
  justify-content: right;
  height: 20px;
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

.button-box {
  width: 110px;
  margin: 0 0 0 10px;
}

.item-box {
  width: calc(100% - 40px);
  border: 1px solid rgb(black, 0.2);
  border-radius: $normal-border-radius;
  margin: 10px 20px;
}
</style>
