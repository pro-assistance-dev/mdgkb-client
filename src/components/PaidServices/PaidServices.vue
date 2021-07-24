<template>
  <el-affix class="affix" :offset="150" z-index="1000">
    <div class="sum-card">
      <el-card>
        <el-row>
          <el-col :span="12">
            <div class="sum">Сумма: {{ sum }} рублей.</div>
          </el-col>
          <el-col :span="2" :offset="8">
            <el-button @click="clearSelectedService()">Очистить выбор</el-button>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </el-affix>
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
import { defineComponent, ref } from 'vue';
import IPaidService from '@/interfaces/IPaidService';
import PaidService from '@/components/PaidServices/PaidService.vue';

export default defineComponent({
  name: 'PaidServices',
  components: { PaidService },
  async setup() {
    let sum = ref(0);
    const ginService = ref();
    const otoService = ref();
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

    return {
      clearSelectedService,
      ginService,
      otoService,
      sum,
      selectServiceOto,
      selectServiceGin,
      ginDiv,
      otoDiv,
    };
  },
});
</script>

<style scoped>
.sum {
  height: 100%;
  display: flex;
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
</style>
