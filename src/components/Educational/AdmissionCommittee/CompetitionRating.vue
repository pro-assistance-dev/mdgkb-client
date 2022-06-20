<template>
  <table>
    <thead>
      <th style="text-align: center">СНИЛЛС</th>
      <th style="text-align: center">Балл общий</th>
      <th style="text-align: center">Балл вступительных испытаний</th>
      <th style="text-align: center">Балл индивидуальных достижений</th>
      <th style="text-align: center">Основное/дополнительное</th>
    </thead>
    <tbody>
      <div v-for="course in residencyCourses" :key="course.id">
        <tr v-for="application in course.residencyApplications" :key="application.id">
          <td style="text-align: center">{{ application.formValue.user.human.snils }}</td>
          <td style="text-align: center">{{ application.pointsSum() }}</td>
          <td style="text-align: center">{{ application.pointsEntrance }}</td>
          <td style="text-align: center">{{ application.pointsAchievements }}</td>
          <td style="text-align: center">-</td>
          <td style="text-align: center">-</td>
        </tr>
      </div>
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
