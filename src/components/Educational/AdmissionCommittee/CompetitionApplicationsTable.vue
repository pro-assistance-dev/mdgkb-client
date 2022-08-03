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
      <th style="text-align: center">Статус заявления</th>
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
        <td style="text-align: center">
          <TableFormStatus :form="application.formValue" />
          <!--          {{ application.formValue.formStatus.name }}-->
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import TableFormStatus from '@/components/FormConstructor/TableFormStatus.vue';
import IResidencyApplication from '@/interfaces/IResidencyApplication';
import IResidencyCourse from '@/interfaces/IResidencyCourse';

export default defineComponent({
  name: 'CompetitionApplicationsTable',
  components: { TableFormStatus },
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
      return applications.sort((a: IResidencyApplication, b: IResidencyApplication) => {
        const timeA = a.formValue?.approvingDate?.getTime();
        const timeB = b.formValue?.approvingDate?.getTime();
        if (timeA && timeB) {
          return timeA - timeB;
        }
        return -1;
      });
    };

    return { residencyApplications };
  },
});
</script>

<style lang="scss" scoped></style>
