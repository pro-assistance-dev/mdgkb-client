<template>
  <HeaderInfo :left-width="'330px'" :background="'#ffffff'" :is-single="false">
    <template #foto>
      <ChiefCard v-if="course.mainTeacherId" :employee="course.mainTeacher" chief-role="Руководитель курса" :show-favourite="false" />
    </template>

    <template #small-title> </template>

    <template #big-title> {{ course.getFullName() }}<br /> </template>

    <template #tags>
      <div class="green-tag-link">{{ course.getPeriod() }}</div>
    </template>

    <template #contact>
      <div class="regalias-list">
        <div class="regalias-item"><b>Язык обучения:</b> русский</div>
        <div class="regalias-item"><b>Срок получения образования, включая каникулы</b>: 2 года</div>
      </div>
      <div>
        <ul>
          <li v-for="file in course.getInfoFiles()" :key="file.id">
            <a :href="file.getFileUrl()" :download="file.originalName" target="_blank" style="margin-right: 10px">
              {{ file.originalName }}</a
            >
          </li>
        </ul>
      </div>
    </template>

    <template #icons> </template>

    <template #buttons>
      <a @click="openApplicationDialog">
        <button>Подать заявление</button>
      </a>
    </template>
  </HeaderInfo>
  <Time />
</template>

<script lang="ts">
import { ElMessageBox } from 'element-plus';
import { defineComponent, PropType, Ref, ref } from 'vue';

import ResidencyCourse from '@/classes/ResidencyCourse';
import HeaderInfo from '@/components/Base/HeaderInfo.vue';
import ChiefCard from '@/components/ChiefCard.vue';
import Provider from '@/services/Provider';

export default defineComponent({
  name: 'ResidencyCourseInfo',
  components: {
    ChiefCard,
    HeaderInfo,
  },
  props: {
    course: { type: Object as PropType<ResidencyCourse>, required: true },
  },
  setup() {
    const applicationDialogOpen: Ref<boolean> = ref(false);
    const openApplicationDialog = () => {
      applicationDialogOpen.value = true;
      ElMessageBox.confirm(
        'Для подачи заявления в приёмную комиссию пройдите по ссылке. Здесь позже будет доступна подача заявления на перевод',
        {
          confirmButtonText: 'Подать заявление в приёмную комиссию',
          cancelButtonText: 'Отмена',
          type: 'warning',
        }
      ).then(() => {
        Provider.router.push('/admission-committee?mode=ae387478-064d-43b7-83d2-0407aabc400d');
      });
    };
    return { openApplicationDialog };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/division-info.scss';

.green-tag-link {
  text-align: center;
  border-radius: 15px;
  background-color: $site_green;
  border-color: $site_green;
  color: white;
  padding: 2px 10px;
  margin-right: 10px;
  display: inline-block;
  width: auto;
  word-wrap: break-word;
  font-size: 11px;
  &:hover {
    background-color: darken($site_green, 10%);
    color: white;
    cursor: pointer;
  }
}

.regalias-list,
.address {
  margin-top: 5px;
  margin-bottom: 15px;
  a {
    color: $site_blue;
    text-decoration: none;
    &:hover {
      cursor: pointer;
      color: darken($site_blue, 30%);
    }
  }
}

.regalias-item {
  margin-bottom: 10px;
  color: #343e5c;
}
</style>
