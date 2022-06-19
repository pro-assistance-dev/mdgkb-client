<template>
  <table>
    <thead>
      <th>ФИО</th>
      <th>Специальность</th>
      <th>Целевое/ДПОУ (договор)</th>
      <th>Дата заявления</th>
      <th>Заявление по специальности приоритетное/дополнительное</th>
      <th>Балл общий</th>
      <th>Балл вступительных испытаний</th>
      <th>Балл индивидуальных достижений</th>
      <th>Заявление о согласии на поступление</th>
    </thead>
    <tr v-for="application in residencyApplications()" :key="application.id">
      <td>
        {{ application.formValue.user.human.getFullName() }}
      </td>
      <td>
        {{ application.residencyCourse.getMainSpecialization().name }}
      </td>
      <td>-</td>
      <td>
        {{ $dateTimeFormatter.format(application.formValue.createdAt) }}
      </td>
      <td>-</td>
      <td>{{ application.pointsSum() }}</td>
      <td>{{ application.pointsEntrance }}</td>
      <td>{{ application.pointsAchievements }}</td>
      <td>-</td>
    </tr>
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
      props.residencyCourses.forEach((rc: IResidencyCourse) => applications.push(...rc.residencyApplications));
      return applications;
    };

    return { residencyApplications };
  },
});
</script>

<style lang="scss" scoped></style>
