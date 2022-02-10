<template>
  <el-space v-if="mount" direction="vertical" alignment="start" style="margin-bottom: 20px">
    <el-select v-model="divisionAId" filterable placeholder="точка А" style="width: 500px" @change="divisionAChangeHandler">
      <el-option v-for="item in divisions.filter((el) => el.id !== divisionBId)" :key="item.id" :label="item.name" :value="item.id">
      </el-option>
    </el-select>
    <el-select v-model="divisionBId" filterable placeholder="точка Б" style="width: 500px" @change="divisionBChangeHandler">
      <el-option v-for="item in divisions.filter((el) => el.id !== divisionAId)" :key="item.id" :label="item.name" :value="item.id">
      </el-option>
    </el-select>
    <el-button :loading="loading" @click="buildRoute">Построить маршрут</el-button>
    <!-- <el-button @click="toggleEnterNumbers">Показать нумерацию</el-button> -->
  </el-space>
</template>

<script lang="ts">
import { ElNotification } from 'element-plus';
import cloneDeep from 'lodash/cloneDeep';
import { computed, defineComponent, onMounted, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import IDivision from '@/interfaces/buildings/IDivision';

export default defineComponent({
  name: 'MapRouter',

  setup() {
    const store = useStore();
    const divisions = computed(() => store.getters['divisions/divisions'].filter((division: IDivision) => division.entrance));
    const divisionAId: Ref<string> = ref('');
    const divisionA: Ref<IDivision | undefined> = ref();
    const divisionBId: Ref<string> = ref('');
    const divisionB: Ref<IDivision | undefined> = ref();
    const mount = ref(false);
    const loading = computed(() => store.getters['map/loading']);

    const divisionAChangeHandler = (id: string) => {
      // divisionA.value = store.getters['divisions/divisionById'](id);
      divisionA.value = divisions.value.find((item: IDivision) => item.id === id);
    };
    const divisionBChangeHandler = (id: string) => {
      // divisionB.value = store.getters['divisions/divisionById'](id);
      divisionB.value = divisions.value.find((item: IDivision) => item.id === id);
    };

    const buildRoute = async (): Promise<void> => {
      if (!divisionA.value || !divisionB.value) {
        console.log('Не все точки указаны');
        return;
      }
      const routePointsRef = document.getElementById('route-points');
      if (!routePointsRef) {
        console.log('id route-points не найден');
        return;
      }

      const routesArrayRef = Array.from(routePointsRef.children);
      const startPointRef = routesArrayRef.find((el) => {
        return (
          (el.getAttribute('data-building') === divisionA.value?.entrance?.building?.number &&
            el.getAttribute('data-entrance') === String(divisionA.value?.entrance?.number)) ||
          el.getAttribute('data-building') === divisionA.value?.id
        );
      });
      const endPointRef = routesArrayRef.find((el) => {
        return (
          (el.getAttribute('data-building') === divisionB.value?.entrance?.building?.number &&
            el.getAttribute('data-entrance') === String(divisionB.value?.entrance?.number)) ||
          el.getAttribute('data-building') === divisionB.value?.id
        );
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
          (currentPoint.getAttribute('data-building') === divisionB.value?.entrance?.building?.number &&
            currentPoint.getAttribute('data-entrance') === String(divisionB.value?.entrance?.number)) ||
          currentPoint.getAttribute('data-building') === divisionB.value?.id
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
      const newRouteRef = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      newRouteRef.setAttribute('id', 'route');
      newRouteRef.style.visibility = 'visible';
      routePointsRef?.append(newRouteRef);

      shortestRoute.forEach((point, index) => {
        const newLine = document.createElementNS('http://www.w3.org/2000/svg', 'path');
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
        newLine.setAttribute(
          'd',
          // 'M' + cx1 + ',' + cy1 + 'l' + cx2 + ',' + cy2
          'M' + Math.abs(Number(cx1)) + ',' + Math.abs(Number(cy1)) + 'L' + Math.abs(Number(cx2)) + ',' + Math.abs(Number(cy2))
        );
        newLine.style.stroke = '#FF0000';
        newLine.style.strokeWidth = '5px';
        newRouteRef.appendChild(newLine);
      });
      store.commit('map/setLoading', false);
      const oldFlag = document.getElementById('end-flag');
      if (oldFlag) {
        oldFlag.remove();
      }
      const flag = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      flag.setAttribute('id', 'end-flag');
      const x = endPointRef.getAttribute('cx');
      const y = endPointRef.getAttribute('cy');
      if (!x || !y) {
        return;
      }
      flag.style.stroke = '#FF0000';
      flag.style.fill = '#FF0000';
      flag.style.strokeWidth = '2px';
      flag.setAttribute(
        'd',
        // 'M' + cx1 + ',' + cy1 + 'l' + cx2 + ',' + cy2
        'M' + Math.abs(Number(x) + 10) + ',' + Math.abs(Number(y)) + 'v -40 l 20 10 l -20 10'
      );
      const map = document.getElementById('map-svg');
      map?.appendChild(flag);

      ElNotification({
        title: 'Маршрут построен',
        dangerouslyUseHTMLString: true,
        message: `
          <p>
          <b>Откуда:</b>
          ${divisionA.value.address ? divisionA.value.address : divisionA.value.name}
          </p>
          <p>
          <b>Куда:</b>
          ${divisionB.value.address ? divisionB.value.address : divisionB.value.name}
          </p>
        `,
        duration: 3000,
        position: 'bottom-left',
        type: 'success',
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

    onMounted(async () => {
      await store.dispatch('divisions/getAll');
      const streetEnter1 = { id: 'main-enter-1', name: 'Вход на территорию больницы' };
      const streetEnter2 = { id: 'main-enter-2', name: 'Вход для пациентов, записанных на прием в КДЦ' };
      const streetEnter3 = { id: 'main-enter-3', name: 'Вход для пациентов за экстренной медицинской помощью' };
      divisions.value.unshift(streetEnter1, streetEnter2, streetEnter3);
      toggleEnterNumbers();
      hideRoutePoints();
      mount.value = true;
    });

    return {
      divisions,
      buildRoute,
      toggleEnterNumbers,
      divisionAId,
      divisionBId,
      mount,
      divisionAChangeHandler,
      divisionBChangeHandler,
      loading,
    };
  },
});
</script>
