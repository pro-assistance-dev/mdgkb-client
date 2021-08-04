<template>
  <div class="spacer" v-if="scrollOffset >= 90">&nbsp;</div>
  <div :class="{ fixed: scrollOffset >= 90 }">
    <el-card style="max-width: 1344px; margin: 0 auto">
      <div class="sum-card">
        <div class="sum">Сумма: {{ sum }} рублей.</div>
        <h2 v-if="scrollOffset >= 150" style="margin: 0">Платные услуги</h2>
        <el-button @click="clearSelectedService()">Очистить выбор</el-button>
      </div>
    </el-card>
  </div>
  <div class="paid-services">
    <h1>Платные услуги</h1>

    <el-collapse accordion>
      <PaidService ref="ginService" :title="'Гинекологическое отделение'" @selectService="selectServiceGin" v-model:services="ginDiv" />
      <PaidService
        ref="otoService"
        :title="'Оториноларингологическое отделение'"
        @selectService="selectServiceOto"
        v-model:services="otoDiv"
      />
    </el-collapse>
  </div>
</template>

<script lang="ts">
import { ginDiv } from '@/components/PaidServices/ginDiv';
import { otoDiv } from '@/components/PaidServices/otoDiv';
import { defineComponent, onMounted, onUnmounted, ref } from 'vue';
import IPaidService from '@/interfaces/IPaidService';
import PaidService from '@/components/PaidServices/PaidService.vue';

export default defineComponent({
  name: 'PaidServices',
  components: { PaidService },
  setup() {
    let sum = ref(0);
    const ginService = ref();
    const otoService = ref();
    const scrollOffset = ref(0);
    const previousOffset = ref(0);
    const rememberedOffset = ref(0);
    let selectedServiceGin: IPaidService[] = [];
    let selectedServiceOto: IPaidService[] = [];

    const calcSum = () => {
      sum.value = 0;
      selectedServiceGin.forEach((s) => (sum.value = Number(s.price) + sum.value));
      selectedServiceOto.forEach((s) => (sum.value = Number(s.price) + sum.value));
    };

    const selectServiceGin = (services: IPaidService[]) => {
      selectedServiceGin = services;
      calcSum();
    };

    const selectServiceOto = (services: IPaidService[]) => {
      selectedServiceOto = services;
      calcSum();
    };
    const clearSelectedService = () => {
      ginService.value.clearSelection();
      otoService.value.clearSelection();
    };

    const handleScroll = () => {
      if (scrollOffset.value > previousOffset.value && rememberedOffset.value != 0) {
        rememberedOffset.value = 0;
      }
      previousOffset.value = scrollOffset.value;
      scrollOffset.value = window.scrollY;
    };

    onMounted(() => window.addEventListener('scroll', handleScroll));
    onUnmounted(() => window.removeEventListener('scroll', handleScroll));

    return {
      clearSelectedService,
      ginService,
      otoService,
      sum,
      selectServiceOto,
      selectServiceGin,
      ginDiv,
      otoDiv,
      scrollOffset,
      previousOffset,
      rememberedOffset,
    };
  },
});
</script>

<style lang="scss" scoped>
.sum {
  height: 100%;
  display: flex;
  align-items: center;
}

.sum-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.affix {
  width: 100%;
  .sum-card {
    text-align: center;
  }
}

.paid-services {
  text-align: center;
  margin-bottom: 400px;
}

.fixed {
  position: fixed;
  top: 57px;
  left: 0;
  width: 100%;
  z-index: 100;
}

.spacer {
  width: 100%;
  height: 80px;
}
</style>
