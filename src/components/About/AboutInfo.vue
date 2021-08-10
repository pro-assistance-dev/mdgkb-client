<template>
  <div v-if="sum > 0" :class="{ fixed: scrollOffset >= 90 }">
    <el-card style="max-width: 1344px; margin: 0 auto">
      <div class="sum-card">
        <div class="sum">Сумма: {{ sum }} рублей.</div>
        <h2 v-if="scrollOffset >= 150" style="margin: 0">Выбранные платные услуги</h2>
        <el-button @click="clearSelectedService()">Очистить выбор</el-button>
      </div>
    </el-card>
  </div>

  <el-container direction="vertical">
    <h1 style="text-align: center">{{ division.name }}</h1>
    <el-card>
      <template #header>Общая информация</template>
      <div v-html="division.info"></div>
    </el-card>
    <el-card v-if="division.doctors.length">
      <template #header>Врачи</template>
      <div v-for="item in division.doctors" :key="item.id" class="doctors-wrapper">
        <DoctorInfoCard :doctor="item" :division="division" />
      </div>
    </el-card>
    <el-card>
      <template #header>Фото + 3D экскурсия</template>
      <div></div>
    </el-card>
    <el-card>
      <template #header>Специализация</template>
      <div></div>
    </el-card>
    <el-card>
      <template #header>Нозологии</template>
      <div></div>
    </el-card>
    <el-card>
      <template #header>Услуги-прайс</template>
      <el-collapse v-if="division.name === 'Гинекологическое отделение'" accordion>
        <PaidService ref="ginService" v-model:services="ginDiv" :title="'Открыть список'" @selectService="selectServiceGin" />
      </el-collapse>
      <el-collapse v-if="division.name === 'Оториноларингологическое отделение'" accordion>
        <PaidService
          v-if="division.name === 'Оториноларингологическое отделение'"
          ref="otoService"
          v-model:services="otoDiv"
          :title="'Оториноларингологическое отделение'"
          @selectService="selectServiceOto"
        />
      </el-collapse>
    </el-card>
    <el-card>
      <template #header>Врачебный состав</template>
      <div></div>
    </el-card>
    <el-card>
      <template #header>Госпитализации</template>
      <div></div>
    </el-card>
    <el-card>
      <template #header>Распорядок дня</template>
      <div></div>
    </el-card>
    <el-card>
      <template #header>Контакты</template>
      <div v-if="division.phone">Телефон: {{ division.phone }}</div>
      <div v-if="division.email">Email: {{ division.email }}</div>
      <div v-if="division.address">Адрес: {{ division.address }}</div>
    </el-card>
  </el-container>
</template>

<script lang="ts">
import IDivision from '@/interfaces/buildings/IDivision';
import { defineComponent, onMounted, onUnmounted, PropType, ref } from 'vue';
import IPaidService from '@/interfaces/IPaidService';
import { ginDiv } from '@/components/PaidServices/ginDiv';
import { otoDiv } from '@/components/PaidServices/otoDiv';
import PaidService from '@/components/PaidServices/PaidService.vue';
import DoctorInfoCard from '@/components/DoctorInfoCard.vue';

export default defineComponent({
  name: 'AboutInfo',
  components: { PaidService, DoctorInfoCard },
  props: {
    division: {
      type: Object as PropType<IDivision>,
      required: true,
    },
  },
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
      if (ginService.value) ginService.value.clearSelection();
      if (otoService.value) otoService.value.clearSelection();
      sum.value = 0;
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

<style scoped>
.el-card {
  border-radius: 15px;
  color: #4a4a4a;
  margin-bottom: 10px;
  font-size: 14px;
  /* width: 800px; */
}

:deep(.el-card__header) {
  font-weight: 400;
  text-transform: uppercase;
  font-size: 0.8rem;
}

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
.doctors-wrapper {
  display: flex;
  flex-wrap: wrap;
}
</style>
