<template>
  <table>
    <thead>
      <th style="text-align: center">№</th>
      <th style="text-align: center">СНИЛЛС</th>
      <th style="text-align: center">Балл общий</th>
      <th style="text-align: center">Балл вступительных испытаний</th>
      <th style="text-align: center">Балл индивидуальных достижений</th>
      <th style="text-align: center">Основное/дополнительное</th>
    </thead>
    <tbody>
      <template v-for="course in residencyCourses" :key="course.id">
        <tr>
          <td colspan="8" style="text-align: center">
            {{ course.getMainSpecialization().code }} {{ course.getMainSpecialization().name }}
          </td>
        </tr>
        <tr v-for="(application, j) in course.getApplicationsByPoint()" :key="application.id">
          <td style="text-align: right">{{ j + 1 }}</td>
          <td style="text-align: right">{{ application.formValue.user.human.snils }}</td>
          <td style="text-align: right">{{ application.pointsSum() }}</td>
          <td style="text-align: right">{{ application.pointsEntrance }}</td>
          <td style="text-align: right">{{ application.pointsAchievements }}</td>
          <td style="text-align: right">{{ application.main ? 'Основное' : 'Дополнительное' }}</td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import IResidencyCourse from '@/interfaces/IResidencyCourse';

export default defineComponent({
  name: 'CompetitionRating',
  props: {
    residencyCourses: {
      type: Array as PropType<IResidencyCourse[]>,
      default: () => [],
    },
  },
});
</script>

<style lang="scss" scoped></style>
