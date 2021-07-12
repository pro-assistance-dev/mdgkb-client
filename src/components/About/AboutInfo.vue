<template>
  <div>
    <h1 style="text-align: center">{{ division.name }}</h1>
    <el-card>
      <template #header>Общая информация</template>
      <div v-html="division.info"></div>
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
      <div></div>
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
      <div v-if="division.phone">Телефон: {{division.phone}}</div>
      <div v-if="division.email">Email: {{division.email}}</div>
      <div v-if="division.address">Адрес: {{division.address}}</div>
    </el-card>
  </div>
</template>

<script lang="ts">
import IDivision from '@/interfaces/divisions/IDivision';
import {PropType} from 'vue'

export default {
  name: 'AboutInfo',
  props: {
    division: {
      type: Object as PropType<IDivision>,
      required: true,
    },
  },
};
</script>

<style scoped>
.el-card {
  border-radius: 15px;
  color: #4a4a4a;
  margin: 10px;
  font-size: 14px;
  /* width: 800px; */
}

:deep(.el-card__header) {
  font-weight: 400;
  text-transform: uppercase;
  font-size: 0.8rem;
}
</style>
