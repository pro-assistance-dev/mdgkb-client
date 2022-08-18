<template>
  <table>
    <thead>
      <th style="text-align: center">№</th>
      <th style="text-align: center">СНИЛС</th>
      <th style="text-align: center">Балл общий</th>
      <th style="text-align: center">Балл вступительных испытаний</th>
      <th style="text-align: center">Балл индивидуальных достижений</th>
      <th style="text-align: center">Итог</th>
      <th style="text-align: center">Примечание</th>
      <th style="text-align: center">Заявление о согласии на зачисление</th>
    </thead>
    <tbody>
      <template v-for="course in filteredCourses()" :key="course.id">
        <tr>
          <td colspan="8" class="font-weight-600">
            <div class="text-align-center">
              {{ course.getMainSpecialization().code }} {{ course.getMainSpecialization().name }} - мест {{ course.paidPlaces }}
            </div>
          </td>
        </tr>
        <tr v-for="(application, j) in leaveOnlyNeededApplications(course)" :key="application.id">
          <td :class="getPassClass(course, j + 1)">
            {{ j + 1 }}
          </td>
          <td :class="getPassClass(course, j + 1)">{{ application.formValue.user.human.snils }}</td>
          <td :class="getPassClass(course, j + 1)">{{ application.pointsSum() }}</td>
          <td :class="getPassClass(course, j + 1)">{{ application.pointsEntrance }}</td>
          <td :class="getPassClass(course, j + 1)">{{ application.calculateAchievementsPoints(true) }}</td>
          <td :class="getPassClass(course, j + 1)">
            {{ course.applicationPassCompetition(j + 1) ? 'Приглашается на заключение договора' : 'В режиме ожидания' }}
          </td>
          <td :class="getPassClass(course, j + 1)">
            {{ course.applicationPassCompetition(j + 1) ? 'Заявление до 24.08.22 \n Заключение договора до 26.08.22' : '' }}
          </td>
          <td :class="getPassClass(course, j + 1)"></td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import IResidencyApplication from '@/interfaces/IResidencyApplication';
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

    const leaveOnlyNeededApplications = (course: IResidencyCourse): IResidencyApplication[] => {
      return course.getPaidApplicationsByPoint().filter((a: IResidencyApplication, appPlace: number) => {
        if (a.formValue.user.human.snils === '180-933-880-93') {
          console.log(a.formValue.user.human.snils);
        }
        if (a.main && course.applicationPassCompetition(appPlace + 1)) {
          return true;
        }
        let finded = false;
        props.residencyCourses.forEach((c: IResidencyCourse) => {
          const sameUserApplicationIndex = c.getPaidApplicationsByPoint().findIndex((application: IResidencyApplication) => {
            if (a.formValue.user.human.snils === '180-933-880-93' && c.getFullName() === '31.08.19 Педиатрия') {
              console.log(application.id !== a.id);
              console.log(application.formValue.user.human.snils, a.formValue.user.human.snils);
            }
            return (
              application.id !== a.id &&
              application.formValue.user.human.snils.replace(/\D/g, '') === a.formValue.user.human.snils.replace(/\D/g, '')
            );
          });
          if (a.formValue.user.human.snils === '180-933-880-93') {
            console.log(sameUserApplicationIndex);
          }
          if (sameUserApplicationIndex < 0) {
            return;
          }
          const sameUserApplication = c.getPaidApplicationsByPoint()[sameUserApplicationIndex];
          if (sameUserApplication.formValue.user.human.snils === '180-933-880-93') {
            console.log(sameUserApplication.formValue.user.human.snils);
          }

          if (sameUserApplication && sameUserApplication.main && c.applicationPassCompetition(sameUserApplicationIndex + 1)) {
            finded = true;
          }
        });
        return !finded;
      });
    };

    return { getPassClass, filteredCourses, leaveOnlyNeededApplications };
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

.font-weight-600 {
  font-weight: 600;
}

.text-align-center {
  text-align: center;
}
</style>
