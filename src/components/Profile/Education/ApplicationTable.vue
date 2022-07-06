<template>
  <table class="table-list">
    <colgroup>
      <col width="40%" />
      <col width="20%" />
      <col width="5%" />
      <col width="10%" />
      <col width="5%" />
    </colgroup>
    <thead>
      <th><h4>ТИП</h4></th>
      <th><h4>НАЗВАНИЕ</h4></th>
      <th><h4>ДАТА&nbsp;ПОДАЧИ</h4></th>
      <th><h4>СТАТУС</h4></th>
      <th><h4>ДОСТУПНЫЕ ДЕЙСТВИЯ</h4></th>
    </thead>
    <tbody>
      <tr v-for="formValue in user.formValues" :key="formValue.id">
        <td>
          <router-link v-if="formValue.dpoApplication" :to="`/dpo?mode=programs`">
            {{ formValue.dpoApplication.dpoCourse.isNmo ? 'НМО' : 'ДПО' }}
          </router-link>
          <router-link v-if="formValue.postgraduateApplication" :to="`/postgraduate?mode=programs`"> Аспирантура </router-link>
          <router-link v-if="formValue.candidateApplication" :to="`/postgraduate?mode=candidate`"> Кандидатский минимум </router-link>
          <router-link v-if="formValue.residencyApplication" :to="`/residency?mode=programs`"> Ординатура </router-link>
          <router-link v-if="formValue.applicationCar" :to="`/application-car/8ccf8e9b-b487-493e-b451-60b193181f07`"
            >Заявка на въезд</router-link
          >
          <router-link v-if="formValue.vacancyResponse" :to="`/vacancies`"> Отклик на вакансию </router-link>
        </td>

        <td>
          <router-link v-if="formValue.dpoApplication" :to="`/courses/${formValue.dpoApplication.dpoCourse.slug}`">
            {{ formValue.dpoApplication.dpoCourse.name }}
          </router-link>
          <router-link
            v-if="formValue.postgraduateApplication"
            :to="`/postgraduate-courses/${formValue.postgraduateApplication.postgraduateCourse.getMainSpecialization().slug}`"
          >
            {{ formValue.postgraduateApplication.postgraduateCourse.getMainSpecialization().name }}
          </router-link>
          <router-link v-if="formValue.candidateApplication" :to="`/postgraduate?mode=candidate`"> Кандидатский минимум </router-link>
          <router-link
            v-if="formValue.residencyApplication"
            :to="`/residency-courses/${formValue.residencyApplication.residencyCourse.getMainSpecialization().slug}`"
          >
            {{ formValue.residencyApplication.residencyCourse.getMainSpecialization().name }}
          </router-link>
          <router-link
            v-if="formValue.residencyApplication"
            :to="`/residency-courses/${formValue.residencyApplication.residencyCourse.getMainSpecialization().slug}`"
          >
            {{ formValue.residencyApplication.residencyCourse.getMainSpecialization().name }}
          </router-link>
          <router-link v-if="formValue.vacancyResponse" :to="`/vacancies/${formValue.vacancyResponse.vacancy.slug}`">
            {{ formValue.vacancyResponse.vacancy.title }}
          </router-link>
          <router-link v-if="formValue.applicationCar" :to="`/divisions/${formValue.applicationCar.division?.slug}`">
            {{ formValue.applicationCar.division?.name }}
          </router-link>
        </td>

        <td>{{ $dateTimeFormatter.format(formValue.createdAt) }}</td>

        <td>
          <div class="box">
            <el-tag
              v-if="formValue.formStatus.label"
              size="small"
              :style="`background-color: inherit; color: ${formValue.formStatus.color}; border-color: ${formValue.formStatus.color}`"
              >{{ formValue.formStatus.label }}</el-tag
            >
          </div>
        </td>

        <td>
          <div v-for="item in formValue.formStatus.formStatusToFormStatuses" :key="item.id">
            <div v-if="item.childFormStatus.userActionName">
              <el-popover
                v-if="item.childFormStatus.icon.fileSystemPath"
                placement="top-start"
                width="auto"
                trigger="hover"
                :content="item.childFormStatus.userActionName"
              >
                <template #reference>
                  <button>
                    <img
                      :src="item.childFormStatus.icon.getImageUrl()"
                      alt="alt"
                      @click="updateFormStatus(formValue, item.childFormStatus)"
                    />
                  </button>
                </template>
              </el-popover>
              <button
                v-else
                :style="`background-color: ${item.childFormStatus.color}; color: white; border: 1px solid ${item.childFormStatus.color}`"
                @click="updateFormStatus(formValue, item.childFormStatus)"
              >
                {{ item.childFormStatus.userActionName }}
              </button>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import IUser from '@/interfaces/IUser';

export default defineComponent({
  name: 'ApplicationTable',
  props: {
    user: {
      type: Object as PropType<IUser>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
h4 {
  font-family: 'Open Sans', sans-serif;
  letter-spacing: 0.1ex;
  margin: 0px;
  font-size: 11px;
  font-weight: normal;
  color: #a3a5b9;
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

td {
  button {
    img {
      height: 25px;
    }
    margin-bottom: 2px;
    padding: 3px 7px;
    border-radius: 5px;
    font-size: 12px;
    &:hover {
      cursor: pointer;
      filter: brightness(110%);
    }
  }
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

.box {
  position: relative;
  margin-right: 20px;
}

@media screen and (max-width: 980px) {
  .box {
    margin-right: 0px;
    background: #ffffff;
  }
}
</style>
