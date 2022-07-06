<template>
  <table>
    <thead>
      <th>Направления подготовки (специальность)</th>
      <th style="text-align: center">Количество мест по целевому набору (по приказу ДЗМ)</th>
      <th style="text-align: center">Поданные заявления по целевому набору (для абитуриентов заключивших договор с ДЗМ)</th>
      <th style="text-align: center">Количество мест по договорам об оказании образова- тельных платных услуг (ПОУ)</th>
      <th style="text-align: center">Поданные заявления По договорам о платных образова- тельных услугах (ПОУ)</th>
      <th style="text-align: center">Конкурс ПОУ</th>
    </thead>
    <tbody>
      <tr v-for="course in residencyCourses" :key="course.id">
        <td>
          {{ course.getMainSpecialization().code + ' ' + course.getMainSpecialization().name }}
        </td>
        <td style="text-align: center">
          {{ course.freePlaces }}
        </td>
        <td style="text-align: center">
          {{ course.getFreeApplications().length }}
        </td>
        <td style="text-align: center">
          {{ course.paidPlaces }}
        </td>
        <td style="text-align: center">
          {{ course.getPaidApplications().length }}
        </td>
        <td style="text-align: center">
          {{ course.getPaidCompetitionIndex() }}
        </td>
      </tr>
      <tr class="font-weight-600">
        <td>Всего:</td>
        <td style="text-align: center">{{ allFreePlaces() }}</td>
        <td style="text-align: center">{{ allFreeApplications() }}</td>
        <td style="text-align: center">{{ allPaidPlaces() }}</td>
        <td style="text-align: center">{{ allPaidApplications() }}</td>
        <td style="text-align: center">-</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import IResidencyCourse from '@/interfaces/IResidencyCourse';

export default defineComponent({
  name: 'CompetitionPlacesTable',
  props: {
    residencyCourses: {
      type: Array as PropType<IResidencyCourse[]>,
      default: () => [],
    },
  },
  setup(props) {
    const allFreePlaces = () => props.residencyCourses.reduce((sum: number, course: IResidencyCourse) => sum + course.freePlaces, 0);
    const allPaidPlaces = () => props.residencyCourses.reduce((sum: number, course: IResidencyCourse) => sum + course.paidPlaces, 0);
    const allFreeApplications = () =>
      props.residencyCourses.reduce((sum: number, course: IResidencyCourse) => sum + course.getFreeApplications().length, 0);
    const allPaidApplications = () =>
      props.residencyCourses.reduce((sum: number, course: IResidencyCourse) => sum + course.getPaidApplications().length, 0);

    return { allFreePlaces, allPaidPlaces, allFreeApplications, allPaidApplications };
  },
});
</script>

<style lang="scss" scoped>
.font-weight-600 {
  font-weight: 600;
}
</style>
