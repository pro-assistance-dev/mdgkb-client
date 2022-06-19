<template>
  <table>
    <thead>
      <th>Направления подготовки (специальность)</th>
      <th>Количество мест по целевому набору (по приказу ДЗМ)</th>
      <th>Поданные заявления по целевому набору (для абитуриентов заключивших договор с ДЗМ)</th>
      <th>Количество мест по договорам об оказании образова- тельных платных услуг (ПОУ)</th>
      <th>Поданные заявления По договорам о платных образова- тельных услугах (ПОУ)</th>
      <th>Конкурс ПОУ</th>
    </thead>
    <tr v-for="course in residencyCourses" :key="course.id">
      <td>
        {{ course.getMainSpecialization().code + ' ' + course.getMainSpecialization().name }}
      </td>
      <td>
        {{ course.freePlaces }}
      </td>
      <td>
        {{ course.residencyApplications.length }}
      </td>
      <td>
        {{ course.paidPlaces }}
      </td>
      <td>
        {{ course.residencyApplications.length }}
      </td>
      <td>
        {{ course.getPaidCompetitionIndex() }}
      </td>
    </tr>
    <tr>
      <td>Всего:</td>
      <td>{{ allFreePlaces() }}</td>
      <td>{{ allApplications() }}</td>
      <td>{{ allPaidPlaces() }}</td>
      <td>{{ allApplications() }}</td>
      <td>-</td>
    </tr>
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
    const allApplications = () =>
      props.residencyCourses.reduce((sum: number, course: IResidencyCourse) => sum + course.residencyApplications.length, 0);

    return { allFreePlaces, allPaidPlaces, allApplications };
  },
});
</script>

<style lang="scss" scoped></style>
