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
      <template #header>Врачебный состав</template>
      <div class="doctors-wrapper">
        <DoctorInfoCard v-for="item in division.doctors" :key="item.id" :doctor="item" :division="division" />
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
      <div v-for="paidService in division.divisionPaidServices" :key="paidService.id">
        {{ paidService.paidService.name }}
      </div>
    </el-card>
    <el-card>
      <template #header>Госпитализации</template>
      <div></div>
    </el-card>
    <el-card>
      <template #header>Правила посещения</template>
      <div v-if="division.showCommonVisitingRules">
        <ul>
          <h4>Общие правила посещения</h4>
          <template v-for="item in commonVisitingRules" :key="item.id">
            <div v-if="!item.isListItem">{{ item.text }}</div>
            <li v-else>{{ item.text }}</li>
          </template>
        </ul>
      </div>
      <div v-if="division.visitingRules.length">
        <ul>
          <h4>Правила посещения отеделения</h4>
          <template v-for="item in division.visitingRules" :key="item.id">
            <div v-if="!item.isListItem">{{ item.text }}</div>
            <li v-else>{{ item.text }}</li>
          </template>
        </ul>
      </div>
    </el-card>
    <el-card v-if="division.schedule.name">
      <template #header>{{ division.schedule.name }}</template>
      <div>
        <ul>
          <li v-for="item in division.schedule.scheduleItems" :key="item" :class="{ nowPeriod: item.isNow() }">
            {{ item.getPeriodWithName() }}
          </li>
        </ul>
      </div>
    </el-card>
    <Timetable :timetable="division.timetable" :around-the-clock="aroundTheClock" />
    <el-card>
      <template #header>Контакты</template>
      <div v-if="division.phone">Телефон: {{ division.phone }}</div>
      <div v-if="division.email">Email: {{ division.email }}</div>
      <div v-if="division.address">Адрес: {{ division.address }}</div>
    </el-card>
    <ImageGallery :images="division.divisionImages" />
  </el-container>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onMounted, onUnmounted, PropType, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import DoctorInfoCard from '@/components/DoctorInfoCard.vue';
import ImageGallery from '@/components/ImageGallery.vue';
import Timetable from '@/components/Timetable.vue';
import IDivision from '@/interfaces/buildings/IDivision';
import IVisitingRule from '@/interfaces/IVisitingRule';

export default defineComponent({
  name: 'AboutInfo',
  components: { DoctorInfoCard, ImageGallery, Timetable },
  props: {
    division: {
      type: Object as PropType<IDivision>,
      required: true,
    },
  },
  setup() {
    const store = useStore();
    let sum = ref(0);
    const ginService = ref();
    const otoService = ref();
    const scrollOffset = ref(0);
    const previousOffset = ref(0);
    const rememberedOffset = ref(0);
    const aroundTheClock: Ref = ref(true);
    const commonVisitingRules: ComputedRef<IVisitingRule[]> = computed(() => store.getters['visitingRules/items']);

    const calcSum = () => {
      sum.value = 0;
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
      scrollOffset,
      previousOffset,
      rememberedOffset,
      aroundTheClock,
      commonVisitingRules,
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

.nowPeriod {
  color: red;
}
h4 {
  margin-bottom: 0;
}
</style>
