<template>
  <div class="card-title">
    <div class="item">
      <div class="item-el-date">
        <h4>{{ $dateTimeFormatter.format(form.createdAt) }}</h4>
      </div>
      <div class="item-title">
        <div class="item-el"><h4>Статус:&nbsp;</h4></div>
        <div class="item-el">
          <div class="box">
            <el-tag
              v-if="form.formStatus.label"
              size="small"
              :style="`background-color: inherit; color: ${form.formStatus.color}; border-color: ${form.formStatus.color}`"
              >{{ form.formStatus.label }}</el-tag
            >
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="card-item">
    <div class="item-el">
      <router-link
        v-if="form.postgraduateApplication"
        :to="`/postgraduate-courses/${form.postgraduateApplication.postgraduateCourse.getMainSpecialization().slug}`"
      >
        {{ form.postgraduateApplication.postgraduateCourse.getMainSpecialization().name }}
      </router-link>
      <router-link v-if="form.candidateApplication" :to="`/postgraduate?mode=candidate`"> Кандидатский минимум </router-link>
      <router-link
        v-if="form.residencyApplication"
        :to="`/residency-courses/${form.residencyApplication.residencyCourse.getMainSpecialization().slug}`"
      >
        {{ form.residencyApplication.residencyCourse.getMainSpecialization().name }}
      </router-link>
      <!--      <router-link v-if="form.vacancyResponse" :to="`/vacancies/${form.vacancyResponse.vacancy.slug}`">-->
      <!--        {{ form.vacancyResponse.vacancy.title }}-->
      <!--      </router-link>-->
      <router-link v-if="form.visitsApplication" :to="`/divisions/${form.visitsApplication.division?.slug}`">
        {{ form.visitsApplication.division?.name }}
      </router-link>
    </div>
  </div>

  <div class="card-item">
    <div class="item-el-tag">
      <router-link v-if="form.dpoApplication" :to="`/dpo?mode=programs`">
        {{ form.dpoApplication.nmoCourse.isNmo ? 'НМО' : 'ДПО' }}
      </router-link>
      <router-link v-if="form.postgraduateApplication" :to="`/postgraduate?mode=programs`"> Аспирантура </router-link>
      <router-link v-if="form.candidateApplication" :to="`/postgraduate?mode=candidate`"> Кандидатский минимум </router-link>
      <router-link v-if="form.residencyApplication" :to="`/residency?mode=programs`"> Ординатура </router-link>
      <router-link v-if="form.visitsApplication" :to="`/application-car/8ccf8e9b-b487-493e-b451-60b193181f07`">
        Заявка на посещение
      </router-link>
      <router-link v-if="form.vacancyResponse" :to="`/vacancies`"> Отклик на вакансию </router-link>
    </div>
  </div>

  <div class="card-footer">
    <div v-for="item in form.formStatus.formStatusToFormStatuses" :key="item.id">
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
              <img :src="item.childFormStatus.icon.getImageUrl()" alt="form-status" @click="updateFormStatus(form, item.childFormStatus)" />
            </button>
          </template>
        </el-popover>
        <button
          v-else
          :style="`background-color: ${item.childFormStatus.color}; color: white; border: 1px solid ${item.childFormStatus.color}`"
          @click="updateFormStatus(form, item.childFormStatus)"
        >
          {{ item.childFormStatus.userActionName }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import IForm from '@/interfaces/IForm';

export default defineComponent({
  name: 'ApplicationCard',
  props: {
    form: {
      type: Object as PropType<IForm>,
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

.box {
  position: relative;
  margin-right: 20px;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 50px;
}

.item-title {
  display: flex;
  justify-content: right;
  align-items: center;
  min-height: 50px;
}

.card-item {
  border-radius: none;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 50px;
  padding: 0 5px;
  width: calc(100% - 10px);
}

.item-el {
  display: flex;
  text-align: left;
  align-items: left;
}

.card-title {
  padding: 0 5px;
  background: #eff2f6;
  height: 50px;
  border-radius: 5px 5px 0 0;
}

.card-footer {
  padding: 0 5px;
  display: flex;
  justify-content: right;
  background: #eff2f6;
  height: 50px;
  border-radius: 0 0 5px 5px;
  justify-content: flex-end;
  flex-wrap: wrap;
  align-items: center;
  button {
    img {
      height: 25px;
    }
    padding: 5px 7px;
    border-radius: 5px;
    font-size: 12px;
    &:hover {
      cursor: pointer;
      filter: brightness(110%);
    }
  }
}

.item-el-tag {
  a {
    color: #ffffff;
    font-size: 12px;
    border-radius: 5px;
    background: #006bb4;
    padding: 5px 8px 5px 8px;
  }
}

@media screen and (max-width: 980px) {
  .box {
    margin-right: 0px;
    background: #ffffff;
  }

  .card-item {
    padding: 0 5px;
    justify-content: left;
  }
}

@media screen and (max-width: 480px) {
  .card-item {
    padding: 0 5px;
    width: calc(100% - 10px);
  }
}
</style>
