<template>
  <table>
    <thead>
      <th>ФИО</th>
      <th>Специальность</th>
      <th>Целевое/ДПОУ (договор)</th>
      <th>Дата принятия заявления</th>
      <th>Заявление по специальности приоритетное/дополнительное</th>
      <th style="text-align: center">Балл общий</th>
      <th style="text-align: center">Балл вступительных испытаний</th>
      <th style="text-align: center">Балл индивидуальных достижений</th>
      <th style="text-align: center">Заявление о согласии на поступление</th>
    </thead>
    <tbody>
      <tr v-for="application in residencyApplications()" :key="application.id">
        <td>
          {{ application.formValue.user.human.getFullName() }}
        </td>
        <td>
          {{ application.residencyCourse.getMainSpecialization().name }}
        </td>
        <td>{{ application.paid ? 'Договор' : 'Целевое' }}</td>
        <td style="text-align: center">
          {{ $dateTimeFormatter.format(application.formValue.approvingDate) }}
        </td>
        <td>{{ application.main ? 'Приоритетное' : 'Дополнительное' }}</td>
        <td style="text-align: center">{{ application.pointsSum() }}</td>
        <td style="text-align: center">{{ application.pointsEntrance }}</td>
        <td style="text-align: center">{{ application.calculateAchievementsPoints(true) }}</td>
        <td style="text-align: center">-</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import IResidencyApplication from '@/interfaces/IResidencyApplication';
import IResidencyCourse from '@/interfaces/IResidencyCourse';

export default defineComponent({
  name: 'CompetitionApplicationsTable',
  props: {
    residencyCourses: {
      type: Array as PropType<IResidencyCourse[]>,
      default: () => [],
    },
  },
  setup(props) {
    const residencyApplications = (): IResidencyApplication[] => {
      const applications: IResidencyApplication[] = [];
      props.residencyCourses.forEach((rc: IResidencyCourse) => applications.push(...rc.getAcceptedApplications()));
      return applications;
    };

    return { residencyApplications };
  },
});
</script>

<style lang="scss" scoped></style>
