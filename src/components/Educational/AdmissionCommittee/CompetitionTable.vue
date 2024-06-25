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
          <td :class="getPassClass(course, j + 1)">{{ application.getPointsSum() }}</td>
          <td :class="getPassClass(course, j + 1)">{{ application.pointsEntrance }}</td>
          <td :class="getPassClass(course, j + 1)">{{ application.calculateAchievementsPoints(true) }}</td>
          <td :class="getPassClass(course, j + 1)">
            {{ course.applicationPassCompetition(j + 1) ? 'Приглашается на заключение договора' : 'В режиме ожидания' }}
          </td>
          <td :class="getPassClass(course, j + 1)">
            {{ course.applicationPassCompetition(j + 1) ? 'Заявление до 24.08.24 \n Заключение договора до 26.08.24' : '' }}
          </td>
          <td :class="getPassClass(course, j + 1)"></td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import ResidencyApplication from '@/classes/ResidencyApplication';
import ResidencyCourse from '@/classes/ResidencyCourse';

const props = defineProps({
  residencyCourses: {
    type: Array as PropType<ResidencyCourse[]>,
    default: () => [],
  },
});

const getPassClass = (course: ResidencyCourse, applicationPlace: number): Record<string, boolean> => {
  return {
    pass: course.applicationPassCompetition(applicationPlace),
    'not-pass': !course.applicationPassCompetition(applicationPlace),
  };
};

const filteredCourses = (): ResidencyCourse[] => {
  return props.residencyCourses.filter((c) => c.paidAcceptedApplicationsExists());
};

const leaveOnlyNeededApplications = (course: ResidencyCourse): ResidencyApplication[] => {
  return course.getPaidApplicationsByPoint().filter((a: ResidencyApplication, appPlace: number) => {
    if (a.main && course.applicationPassCompetition(appPlace + 1)) {
      return true;
    }
    let finded = false;
    props.residencyCourses.forEach((c: ResidencyCourse) => {
      const sameUserApplicationIndex = c.getPaidApplicationsByPoint().findIndex((application: ResidencyApplication) => {
        return (
          application.id !== a.id &&
          application.formValue.user.human.snils.replace(/\D/g, '') === a.formValue.user.human.snils.replace(/\D/g, '')
        );
      });

      if (sameUserApplicationIndex < 0) {
        return;
      }
      const sameUserApplication = c.getPaidApplicationsByPoint()[sameUserApplicationIndex];

      if (sameUserApplication && sameUserApplication.main && c.applicationPassCompetition(sameUserApplicationIndex + 1)) {
        finded = true;
      }
    });
    return !finded;
  });
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
.pass {
  background-color: $site_pale_green;
  text-align: right;
}
.not-pass {
  background-color: $site_pale_pink;
  text-align: right;
}

.font-weight-600 {
  font-weight: 600;
}

.text-align-center {
  text-align: center;
}
</style>
