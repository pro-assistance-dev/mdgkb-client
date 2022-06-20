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
      <tr v-for="course in residencyCourses" :key="course.id">
        <td colspan="5" style="text-align: center">{{ course.getMainSpecialization().name }}</td>
        <ul>
          <li v-for="application in course.residencyApplications" :key="application.id">{{ application.id }}</li>
          <!--        <td>{{ application.formValue.user.human.snils }}</td>-->
          <!--        <td>{{// application.pointsSum() }}</td>-->
          <!--        <td>{{ application.pointsEntrance }}</td>-->
          <!--        <td>{{ application.pointsAchievements }}</td>-->
          <!--        <td>-</td>-->
          <!--        <td>-</td>-->
        </ul>
      </tr>
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
