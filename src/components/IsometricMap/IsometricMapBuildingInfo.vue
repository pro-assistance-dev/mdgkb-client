<template>
  <div class="building-modal-container">
    <div class="header">
      <div class="left">
        <StringItem :string="'ЗДАНИЕ ' + building.name" width="auto" justifyContent="left" />
        <StringItem
          v-if="building.floors.length > 0"
          :string="'ЭТАЖЕЙ ' + building.floors.length"
          width="auto"
          justifyContent="left"
          margin="20px 0 0 0"
        />
      </div>
      <div class="right">
        <div class="building-number">{{ building.number }}</div>
      </div>
    </div>
    <PInput v-model="filterString" placeholder="Найти" margin="20px 0" />
    <div class="scroll-container">
      <div v-for="floor in building.getFloorsWithDivisions(filterString)" :key="floor.id">
        <div class="el-select-dropdown__item" style="padding-left: 40px; cursor: default; text-transform: uppercase; color: #a1a7bd">
          Этаж {{ floor.number }}
        </div>
        <div
          v-for="division in floor.findDivisions(filterString)"
          :key="division.id"
          :value="division.id"
          :label="division.name"
          @click="Router.To('/divisions/' + division.id)"
        >
          <span class="el-select-dropdown__item" style="padding-left: 80px; font-size: 14px; color: #343d5c">{{ division.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Building from '@/classes/Building';
const emit = defineEmits(['close']);
const filterString: Ref<string> = ref('');

const building: ComputedRef<Building> = Store.Item('buildings');
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';

.building-modal-container {
  border: 1px solid rgb(black, 0.2);
  border-radius: $border-radius;
  width: 100%;
  z-index: 1000;
  padding: 30px;
  box-sizing: border-box;
}

.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.building-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border: 1px solid rgb(black, 0.2);
  border-radius: 15px;
  font-weight: bold;
  color: #f30012;
}

.button-field {
  position: absolute;
  top: 0;
  right: 8px;
}

.scroll-container {
  width: 100%;
  height: 400px;
  overflow-y: auto;
}
</style>
