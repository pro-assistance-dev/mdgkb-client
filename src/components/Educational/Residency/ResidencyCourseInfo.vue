<template>
  <div class="card-item">
    <ChiefCard v-if="course.mainTeacherId" :employee="course.mainTeacher" chief-role="Руководитель курса" :show-favourite="false" />

    <div class="card-item-field">
      <div class="card-item-middle">
        <div class="division-name" data-test="division-name">
          {{ course.getFullName() }}<br />
          {{ course.getPeriod() }}
        </div>
        <div class="card-item-middle-bottom">
          <div class="info-block">
            <div>
              <div><b>Язык обучения:</b> русский</div>
              <div><b>Срок получения образования, включая каникулы</b>: 2 года</div>
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
            <div v-html="course.description" />
          </div>
        </div>
      </div>

      <div class="card-item-right">
        <a @click="openApplicationDialog">
          <button>Подать заявление</button>
        </a>
      </div>
    </div>
  </div>
  <Time />
</template>

<script lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus';
import { defineComponent, PropType, Ref, ref } from 'vue';

import ResidencyCourse from '@/classes/ResidencyCourse';
import ChiefCard from '@/components/ChiefCard.vue';
import Provider from '@/services/Provider';

export default defineComponent({
  name: 'ResidencyCourseInfo',
  components: {
    ChiefCard,
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

// test block
.test {
  width: 290px;
  height: 290px;
  background: #c4c4c4;
}

.division-name {
  margin: 0px;
}
</style>
