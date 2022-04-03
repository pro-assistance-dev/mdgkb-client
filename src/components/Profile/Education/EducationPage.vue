<template>
  <div class="title">
    <h2><b>Мое образование</b></h2>
    <button class="edit-button" @click="$router.push('/profile/edit')">Подать заявку</button>
  </div>
  <div v-if="!applications.length" class="no-progmam">
    <h3>У вас нет заявок</h3>
  </div>
  <div v-if="applications.length" class="my-block">
    <div class="yes-progmam">
      <div class="box">
        <h2>
          Мои заявки
          <div v-if="applications.length" class="sup-cymbol-counter">{{ applications.length }}</div>
        </h2>
      </div>
    </div>
    <div class="card-flex-container card-item">
      <div class="table-container">
        <table class="table-list">
          <colgroup>
            <col width="40%" />
            <col width="20%" />
            <col width="5%" />
            <col width="20%" />
            <col width="5%" />
          </colgroup>
          <thead>
            <th><h4>НАЗВАНИЕ&nbsp;ПРОГРАММЫ</h4></th>
            <th><h4>ТИП</h4></th>
            <th><h4>ДАТА&nbsp;ПОДАЧИ</h4></th>
            <th><h4>СТАТУС</h4></th>
            <th><h4></h4></th>
          </thead>
          <tbody>
            <tr v-for="application in applications" :key="application.id">
              <td>
                <div v-if="application.dpoCourse">
                  <div v-for="dpoCourse in application.dpoCourses" :key="dpoCourse.id">{{ dpoCourse.name }}</div>
                </div>
                <div v-if="application.postgraduateCourse">
                  <div v-for="postgraduateCourse in application.postgraduateCourses" :key="postgraduateCourse.id">
                    {{ postgraduateCourse.educationForm }}
                  </div>
                </div>
                <div v-if="application.candidateExam">Кандидатский минимум</div>
              </td>

              <td>
                <div v-if="application.dpoCourse">ДПО</div>
                <div v-if="application.postgraduateCourse">Аспирантура</div>
                <div v-if="application.candidateExam">Кандидатский минимум</div>
              </td>

              <td>{{ fillDateFormat(application.createdAt) }}</td>

              <td>
                <div class="box">
                  На&nbsp;рассмотрении
                  <div class="sup-cymbol-attention">!</div>
                </div>
              </td>

              <td>
                <div class="table-box">
                  <svg class="icon-edit">
                    <use xlink:href="#profile-edit"></use>
                  </svg>
                  <svg class="icon-trash">
                    <use xlink:href="#trash"></use>
                  </svg>
                </div>
              </td>
            </tr>
          </tbody>
          <!-- <tbody v-if="mounted">
            <tr v-for="dpoCourse in dpoCourses" :key="dpoCourse.id">
              <td>
                <router-link :to="`/courses/${dpoCourse.slug}`">{{ dpoCourse.name }}</router-link>
              </td>
              <td style="text-align: center">{{ dpoCourse.hours }}</td>
              <td>
                <router-link :to="`/doctors/${dpoCourse.getMainTeacher()?.doctor.human.slug}`">
                  {{ dpoCourse.getMainTeacher()?.doctor.human.getFullName() }}
                </router-link>
              </td>
              <td>
                {{ dpoCourse.getClosestPeriod() }}
              </td>
              <td>
                <button class="edit-button" @click="$router.push('/profile/edit')">
                  <svg class="icon-edit">
                    <use xlink:href="#profile-edit"></use>
                  </svg>
                </button>
              </td>
            </tr>
          </tbody> -->
        </table>
      </div>
    </div>
  </div>
  <svg width="0" height="0" class="hidden">
    <symbol id="profile-edit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        d="M12.5 22.8772H24H12.5ZM18.25 1.79391C18.7583 1.28558 19.4478 1 20.1667 1C20.5226 1 20.8751 1.07011 21.204 1.20633C21.5328 1.34255 21.8316 1.54221 22.0833 1.79391C22.335 2.04561 22.5347 2.34442 22.6709 2.67328C22.8071 3.00215 22.8772 3.35462 22.8772 3.71058C22.8772 4.06653 22.8071 4.41901 22.6709 4.74787C22.5347 5.07673 22.335 5.37554 22.0833 5.62724L6.11111 21.5995L1 22.8772L2.27778 17.7661L18.25 1.79391Z"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </symbol>
    <symbol id="trash" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 24">
      <path
        d="M16.5097 3.083H11.6206V1.64509C11.6206 0.72517 10.8813 0 9.96147 0H7.11368C6.19371 0 5.45455 0.72517 5.45455 1.64509V3.083H0.565375C0.26253 3.083 0 3.33259 0 3.63538V5.80255C0 6.10539 0.26253 6.35573 0.565375 6.35573H1.1372C1.13621 6.38002 1.13834 6.4044 1.13834 6.42892V22.2739C1.13834 23.2272 1.90809 24 2.86136 24H14.2138C15.167 24 15.9368 23.2272 15.9368 22.2739V6.42892C15.9368 6.40435 15.9389 6.38002 15.9379 6.35573H16.5097C16.8125 6.35573 17.0751 6.10539 17.0751 5.80259V3.63538C17.0751 3.33259 16.8126 3.083 16.5097 3.083ZM7.11462 1.66008H9.96047V3.083H7.11462V1.66008Z"
      ></path>
      <path
        d="M15.9372 7.66477H1.13281V6.4292H15.9372V7.66477H15.9372ZM5.08811 21.0774V10.0218C5.08811 9.93128 5.05213 9.84441 4.98809 9.78037C4.92404 9.71633 4.83718 9.68035 4.74661 9.68035H4.26054C4.16997 9.68035 4.08311 9.71633 4.01906 9.78037C3.95502 9.84441 3.91904 9.93128 3.91904 10.0218V21.0774C3.91904 21.168 3.95502 21.2548 4.01906 21.3189C4.08311 21.3829 4.16997 21.4189 4.26054 21.4189H4.74661C4.83719 21.4189 4.92405 21.3829 4.98809 21.3189C5.05213 21.2548 5.08811 21.1679 5.08811 21.0774ZM9.11954 21.0774V10.0218C9.11954 9.93128 9.08356 9.84441 9.01951 9.78037C8.95547 9.71633 8.86861 9.68035 8.77804 9.68035H8.29197C8.20139 9.68035 8.11453 9.71633 8.05049 9.78037C7.98644 9.84441 7.95046 9.93128 7.95046 10.0218V21.0774C7.95046 21.168 7.98644 21.2548 8.05049 21.3189C8.11453 21.3829 8.20139 21.4189 8.29197 21.4189H8.77804C8.82289 21.4189 8.8673 21.4101 8.90873 21.3929C8.95017 21.3757 8.98782 21.3506 9.01953 21.3189C9.05124 21.2872 9.0764 21.2495 9.09355 21.2081C9.11071 21.1666 9.11954 21.1222 9.11954 21.0774ZM13.151 21.0774V10.0218C13.151 9.93128 13.115 9.84441 13.051 9.78037C12.9869 9.71633 12.9001 9.68035 12.8095 9.68035H12.3234C12.2329 9.68035 12.146 9.71633 12.082 9.78037C12.0179 9.84441 11.9819 9.93128 11.9819 10.0218V21.0774C11.9819 21.168 12.0179 21.2548 12.082 21.3189C12.146 21.3829 12.2329 21.4189 12.3234 21.4189H12.8095C12.9001 21.4189 12.9869 21.3829 13.051 21.3189C13.115 21.2548 13.151 21.1679 13.151 21.0774Z"
        fill="white"
      ></path>
    </symbol>
  </svg>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onMounted, ref } from 'vue';
import { useStore } from 'vuex';

import ICandidateApplication from '@/interfaces/ICandidateApplication';
import IDpoApplication from '@/interfaces/IDpoApplication';
import IPostgraduateApplication from '@/interfaces/IPostgraduateApplication';
import IUser from '@/interfaces/IUser';

export default defineComponent({
  name: 'EducationPage',
  setup() {
    const store = useStore();
    const mounted = ref(false);
    const userId: ComputedRef<string> = computed(() => store.getters['auth/user']?.id);
    const user: ComputedRef<IUser> = computed(() => store.getters['users/item']);
    const fillDateFormat = (date: Date) => (date ? Intl.DateTimeFormat('ru-RU').format(new Date(date)) : '');
    const applications: (IDpoApplication | IPostgraduateApplication | ICandidateApplication)[] = [
      ...user.value.dpoApplications,
      ...user.value.postgraduateApplications,
      ...user.value.candidateApplications,
    ];

    const loadUser = async () => {
      await store.dispatch('users/get', userId.value);
      mounted.value = true;
    };
    onMounted(loadUser);

    return {
      mounted,
      user,
      applications,
      fillDateFormat,
    };
  },
});
</script>

<style lang="scss" scoped>
.edit-button {
  cursor: pointer;
  display: flex;
  padding: 7px 18px;
  font-family: Roboto, Verdana, sans-serif;
  font-size: 14px;
  border-radius: 40px;
  border: 1px solid #a3a9be;
  color: #a3a9be;
  align-items: center;
}

.edit-button:hover {
  background: #ffffff;
}

h2,
h3 {
  color: #343e5c;
  font-weight: normal;
  margin: 0;
}

.title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  align-items: center;
  height: 40px;
  width: 880px;
}

.text-center {
  text-align: center;
  justify-content: center;
}

.card-flex-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding: 10px;
}
.card-container {
  height: 350px;
  margin: 0 auto;
}

.loadmore-button {
  display: flex;
  justify-content: center;
}

.card-item {
  border-radius: none;
  border: none;
}

.table-container {
  width: 100%;
  border: 1px solid #dcdfe6;
  border-bottom: none;
  border-radius: 5px 5px 0 0;
  background: #ffffff;
}

table {
  height: auto;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border-bottom: 1px solid #dcdfe6;
  padding: 9px 7px 9px 7px;
  height: auto;
}

th {
  text-align: left;
  padding: 2px 0 0 3px;
  background-color: #eff2f6;
  height: 20px;
}

th:first-child {
  border-radius: 5px 0 0 0;
}

th:last-child {
  border-radius: 0 5px 0 0;
}

tr {
  &:hover {
    background-color: #ecf5ff;
  }
}

.no-progmam {
  display: block;
  color: #b5b5b5;
}

.yes-progmam {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
}

.card-flex-container {
  display: block;
  padding: 0px;
}

h4 {
  font-family: 'Open Sans', sans-serif;
  letter-spacing: 0.1ex;
  margin: 0px;
  font-size: 11px;
  font-weight: normal;
  color: #a3a5b9;
}

.my-block {
  background: #ffffff;
  border-radius: 5px;
  border: 1px solid #dcdfe6;
  padding: 20px;
  width: 840px;
}

.sup-cymbol-counter {
  display: flex;
  position: absolute;
  right: -20px;
  top: 0;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #2754eb;
  color: #ffffff;
  align-items: center;
  justify-content: center;
  padding: 1px;
  font-size: 12px;
  font-family: 'Open Sans', sans-serif;
}

.sup-cymbol-attention {
  display: flex;
  position: absolute;
  right: -20px;
  top: -5px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #e62c21;
  color: #ffffff;
  align-items: center;
  justify-content: center;
  padding: 1px;
  font-size: 12px;
  font-family: 'Open Sans', sans-serif;
}

.sup-cymbol-approve {
  display: flex;
  position: absolute;
  right: -20px;
  top: 0;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #44d39e;
  color: #ffffff;
  align-items: center;
  justify-content: center;
  padding: 1px;
  font-size: 12px;
  font-family: 'Open Sans', sans-serif;
}

.box {
  position: relative;
  margin-right: 20px;
}

.table-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.icon-edit {
  display: flex;
  width: 18px;
  height: 18px;
  stroke: #a3a9be;
  fill: none;
  margin-right: 10px;
}

.icon-edit:hover {
  stroke: #2754eb;
  fill: none;
}

.icon-trash {
  display: flex;
  width: 22px;
  height: 22px;
  stroke: #a3a9be;
  fill: none;
  margin-right: 10px;
}

.icon-trash:hover {
  stroke: #e62c21;
  fill: none;
}
</style>
