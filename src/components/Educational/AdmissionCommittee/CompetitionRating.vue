<template>
  <table>
    <thead>
      <th>СНИЛЛС</th>
      <th>Балл общий</th>
      <th>Балл вступительных испытаний</th>
      <th>Балл индивидуальных достижений</th>
      <th>Основное/дополнительное</th>
    </thead>
    <div v-for="course in residencyCourses" :key="course.id">
      <tr v-for="application in course.residencyApplications" :key="application.id">
        <td>{{ application.formValue.user.human.snils }}</td>
        <td>{{ application.pointsSum() }}</td>
        <td>{{ application.pointsEntrance }}</td>
        <td>{{ application.pointsAchievements }}</td>
        <td>-</td>
        <td>-</td>
      </tr>
    </div>
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
