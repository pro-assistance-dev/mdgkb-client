<template>
  <div v-if="mount">
    <div class="select-division">
      <el-select
        v-model="selectedObjectId"
        class="select-d"
        filterable
        placeholder="Выберите вход, парковку, здание или отделение"
        style="width: 380px"
        @change="selectObject"
      >
        <template v-for="building in buildings.filter((b) => b.floors.length && b.getFloorsWithDivisions().length > 0)" :key="building">
          <div class="item-box">
            <div class="el-select-dropdown__item" style="cursor: default; text-transform: uppercase; color: #a1a7bd">
              Строение {{ building.number }}
            </div>
            <template v-for="floor in building.getFloorsWithDivisions()" :key="floor.id">
              <div class="el-select-dropdown__item" style="padding-left: 40px; cursor: default; text-transform: uppercase; color: #a1a7bd">
                Этаж {{ floor.number }}
              </div>
              <el-option v-for="division in floor.divisions" :key="division.id" :value="division.id" :label="division.name">
                <span class="el-select-dropdown__item" style="padding-left: 80px; font-size: 14px; color: #343d5c">{{
                  division.name
                }}</span>
              </el-option>
            </template>
          </div>
        </template>
        <div class="item-box">
          <el-option v-for="gate in gates" :key="gate.id" :label="gate.name" :value="gate.id">
            <span class="el-select-dropdown__item" style="padding-left: 80px; font-size: 14px; color: #343d5c">{{ gate.name }}</span>
          </el-option>
        </div>
        <!--        <div class="item-box">-->
        <!--          <el-option-group>-->
        <!--            <el-option v-for="park in parkings" :key="park.value" :label="park.label">-->
        <!--              <span class="el-select-dropdown__item" style="padding-left: 80px; font-size: 14px; color: #343d5c">{{ park.label }}</span>-->
        <!--            </el-option>-->
        <!--          </el-option-group>-->
        <!--        </div>-->
      </el-select>
      <!-- <div class="button-box">
        <button v-if="showRouterButton" class="route-b" @click="$emit('openMapRouter', selectedObject)">Маршрут</button>
        <button v-else class="route-b-2" @click="$emit('openMapRouter', selectedObject)">Маршрут</button>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import Building from '@/classes/Building';
import Division from '@/classes/Division';
import Floor from '@/classes/Floor';
import Gate from '@/classes/Gate';
import IMapObject from '@/interfaces/IMapObject';
import FilterQuery from '@/services/classes/filters/FilterQuery';
import DivisionsFiltersLib from '@/libs/filters/DivisionsFiltersLib';
import DivisionsSortsLib from '@/libs/sorts/DivisionsSortsLib';
import Provider from '@/services/Provider/Provider';
const emit = defineEmits(['openMapRouter', 'selectObject']);
const buildings = computed(() => Provider.store.getters['buildings/items']);
const gates: Ref<Gate[]> = computed(() => Provider.store.getters['gates/items']);

const parkings: Ref<IOption[]> = ref([
  { value: '1', label: 'Парковка A' },
  { value: '2', label: 'Парковка B' },
  { value: '3', label: 'Парковка C' },
  { value: '4', label: 'Парковка D' },
]);
const selectedObjectId: Ref<string> = ref('');
const selectedObject: Ref<IMapObject | undefined> = ref();
const mount = ref(false);

const selectObject = (id: string) => {
  buildings.value.forEach((b: Building) => {
    b.floors.forEach((f: Floor) => {
      const obj = f.divisions.find((d: Division) => d.id === id);
      if (obj) {
        selectedObject.value = obj;
      }
    });
  });
  if (!selectedObject.value) {
    selectedObject.value = gates.value.find((e: Gate) => e.id === id);
  }

  emit('selectObject', selectedObject.value, true);
};

onMounted(async () => {
  const filterQuery = new FilterQuery();
  filterQuery.filterModels.push(DivisionsFiltersLib.onlyDivisions());
  filterQuery.sortModels.push(DivisionsSortsLib.byName());
  await Provider.store.dispatch('divisions/getAll', { filterQuery });
  await Provider.store.dispatch('entrances/getAll');
  mount.value = true;
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';

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
  border-radius: $border-radius;
  background: $base-background;
}

.route-window {
  width: 100%;
  border: 1px solid rgb(black, 0.2);
  border-radius: $border-radius;
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
  border-radius: $border-radius;
  margin: 10px 20px;
}
</style>
