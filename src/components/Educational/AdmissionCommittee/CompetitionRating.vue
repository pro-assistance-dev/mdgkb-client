<template>
  <table>
    <thead>
      <th style="text-align: center">№</th>
      <th style="text-align: center">СНИЛЛС</th>
      <th style="text-align: center">Балл общий</th>
      <th style="text-align: center">Балл вступительных испытаний</th>
      <th style="text-align: center">Балл индивидуальных достижений</th>
      <th style="text-align: center">Основное/дополнительное</th>
      <th style="text-align: center">Целевое/ДПОУ (договор)</th>
    </thead>
    <!-- <tbody> -->
    <!--   <template v-for="course in residencyCourses" :key="course.id"> -->
    <!--     <tr> -->
    <!--       <td colspan="8" class="font-weight-600"> -->
    <!--         <div class="text-align-center">{{ course.getMainSpecialization().code }} {{ course.getMainSpecialization().name }}</div> -->
    <!--       </td> -->
    <!--     </tr> -->
    <!--     <tr v-for="(application, j) in course.getApplicationsByPoint()" :key="application.id"> -->
    <!--       <td style="text-align: center">{{ j + 1 }}</td> -->
    <!--       <td style="text-align: center">{{ application.formValue.user.human.snils }}</td> -->
    <!--       <td style="text-align: center">{{ application.getPointsSum() }}</td> -->
    <!--       <td style="text-align: center">{{ application.pointsEntrance }}</td> -->
    <!--       <td style="text-align: center">{{ application.calculateAchievementsPoints(true) }}</td> -->
    <!--       <td style="text-align: center">{{ application.main ? 'Основное' : 'Дополнительное' }}</td> -->
    <!--       <td style="text-align: center">{{ application.paid ? 'Договор' : 'Целевое' }}</td> -->
    <!--     </tr> -->
    <!--   </template> -->
    <!-- </tbody> -->
  </table>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import ResidencyCourse from '@/classes/ResidencyCourse';

export default defineComponent({
  name: 'CompetitionRating',
  props: {
    residencyCourses: {
      type: Array as PropType<ResidencyCourse[]>,
      default: () => [],
    },
  },
});
</script>

<style lang="scss" scoped>
.text-align-center {
  text-align: center;
}

.font-weight-600 {
  font-weight: 600;
}
</style>
