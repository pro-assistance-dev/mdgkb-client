<template>
  <el-container direction="vertical">
    <h1 style="text-align: center">{{ division.name }}</h1>
    <el-card>
      <template #header>Общая информация</template>
      <div v-html="division.info"></div>
    </el-card>
    <el-card v-if="division.doctors.length">
      <template #header>Врачебный состав</template>
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
    </el-card>
    <el-card>
      <template #header>Госпитализации</template>
      <div></div>
    </el-card>
    <el-card v-if="division.schedule.name">
      <template #header>{{ division.schedule.name }}</template>
      <div>
        <ul>
          <li v-for="item in division.schedule.scheduleItems" :key="item">
            {{ item.getTime(item.startTime) }}-{{ item.getTime(item.endTime) }}: {{ item.name }}
          </li>
        </ul>
      </div>
    </el-card>
    <el-card v-if="division.timetable.length">
      <template #header>График работы</template>
      <div>
        <ul>
          <li v-for="item in division.timetable.timetableDays" :key="item">
            {{ item.getTime(item.startTime) }}-{{ item.getTime(item.endTime) }}: {{ item.name }}
          </li>
        </ul>
      </div>
    </el-card>
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
import { defineComponent, onMounted, onUnmounted, PropType, ref } from 'vue';

import DoctorInfoCard from '@/components/DoctorInfoCard.vue';
import ImageGallery from '@/components/ImageGallery.vue';
import { ginDiv } from '@/components/PaidServices/ginDiv';
import { otoDiv } from '@/components/PaidServices/otoDiv';
import IDivision from '@/interfaces/buildings/IDivision';

export default defineComponent({
  name: 'AboutInfo',
  components: { DoctorInfoCard, ImageGallery },
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
      ginService,
      otoService,
      sum,
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
