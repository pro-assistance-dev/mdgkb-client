<template>
  <table>
    <thead>
      <th style="text-align: center">№</th>
      <th style="text-align: center">ФИО</th>
      <th style="text-align: center">Балл общий</th>
      <th style="text-align: center">Основное/дополнительное</th>
    </thead>
    <tbody>
      <template v-for="course in filteredCourses()" :key="course.id">
        <tr>
          <td colspan="8" class="font-weight-600">
            <div class="text-align-center">{{ course.getMainSpecialization().code }} {{ course.getMainSpecialization().name }}</div>
          </td>
        </tr>
        <tr v-for="(application, j) in course.getPaidApplicationsByPoint()" :key="application.id">
          <td :class="getPassClass(course, j + 1)">
            {{ j + 1 }}
          </td>
          <td :class="getPassClass(course, j + 1)">{{ application.formValue.user.human.getFullName() }}</td>
          <td :class="getPassClass(course, j + 1)">{{ application.pointsSum() }}</td>
          <td :class="getPassClass(course, j + 1)">{{ application.main ? 'Основное' : 'Дополнительное' }}</td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import IResidencyCourse from '@/interfaces/IResidencyCourse';

export default defineComponent({
  name: 'CompetitionTable',
  props: {
    residencyCourses: {
      type: Array as PropType<IResidencyCourse[]>,
      default: () => [],
    },
  },
  setup(props) {
    const getPassClass = (course: IResidencyCourse, applicationPlace: number): Record<string, boolean> => {
      return {
        pass: course.applicationPassCompetition(applicationPlace),
        'not-pass': !course.applicationPassCompetition(applicationPlace),
      };
    };

    const filteredCourses = (): IResidencyCourse[] => {
      return props.residencyCourses.filter((c) => c.paidAcceptedApplicationsExists());
    };

    return { getPassClass, filteredCourses };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/colors.scss';
.pass {
  background-color: $green-table;
  text-align: right;
}
.not-pass {
  background-color: $red-table;
  text-align: right;
}
</style>
