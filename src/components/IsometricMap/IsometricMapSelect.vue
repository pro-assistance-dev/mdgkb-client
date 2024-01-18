<template>
  <div class="select-window">
    <StringItem string="Выберите точку назначения:" margin="10px" font-size="18px" />
    <template v-for="building in buildings.filter((b) => b.floors.length && b.getFloorsWithDivisions().length > 0)" :key="building">
      <div class="item-box">
        <div style="cursor: default; text-transform: uppercase; color: #a1a7bd">Строение {{ building.number }}</div>
        <template v-for="floor in building.getFloorsWithDivisions()" :key="floor.id">
          <div style="padding-left: 40px; cursor: default; text-transform: uppercase; color: #a1a7bd">Этаж {{ floor.number }}</div>
          <el-option v-for="division in floor.divisions" :key="division.id" :value="division.id" :label="division.name">
            <span style="padding-left: 80px; font-size: 14px; color: #343d5c">{{ division.name }}</span>
          </el-option>
        </template>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineEmits, onMounted, Ref, ref } from 'vue';

import Building from '@/classes/Building';
import Division from '@/classes/Division';
import Floor from '@/classes/Floor';
import Gate from '@/classes/Gate';
import StringItem from '@/components/Base/StringItem.vue';
import IMapObject from '@/interfaces/IMapObject';
import IOption from '@/interfaces/schema/IOption';
import FilterQuery from '@/services/classes/filters/FilterQuery';
import DivisionsFiltersLib from '@/services/Provider/libs/filters/DivisionsFiltersLib';
import DivisionsSortsLib from '@/services/Provider/libs/sorts/DivisionsSortsLib';
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
  console.log('массив зданий');
  console.log(buildings);
  mount.value = true;
});
</script>

<style scoped lang="scss">
@import '@/assets/styles/elements/base-style.scss';

.select-window {
  position: absolute;
  z-index: 10;
  left: 50%;
  top: 200px;
  transform: translateX(-50%);
  min-width: 280px;
  max-width: 900px;
  min-height: 300px;
  max-height: 768px;
  overflow-y: auto;
  background: #ffffff;
  border: 1px solid #838385;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
}

.item-box {
  width: calc(100% - 40px);
  border: 1px solid rgb(black, 0.2);
  border-radius: $normal-border-radius;
  margin: 10px 20px;
}
</style>
