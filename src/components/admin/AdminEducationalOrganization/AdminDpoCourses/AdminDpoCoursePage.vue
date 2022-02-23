<template>
  <div v-if="mounted" class="wrapper">
    <el-form ref="form" :key="dpoCourse" :model="dpoCourse" label-position="top">
      <el-row :gutter="40">
        <el-col :xs="24" :sm="24" :md="14" :lg="16" :xl="19">
          <el-container direction="vertical">
            <el-card>
              <el-form-item prop="title" label="Название:">
                <el-input v-model="dpoCourse.name" placeholder="Заголовок"></el-input>
              </el-form-item>
            </el-card>
            <el-card class="content-card">
              <template #header>Контент</template>
              <el-form-item prop="content">
                <QuillEditor
                  v-model:content="dpoCourse.description"
                  style="min-height: 200px; max-height: 700px"
                  content-type="html"
                  theme="snow"
                ></QuillEditor>
              </el-form-item>
            </el-card>
          </el-container>
        </el-col>
        <el-col :xs="24" :sm="24" :md="10" :lg="8" :xl="5">
          <el-container direction="vertical">
            <!-- <el-button type="success" style="margin-bottom: 20px;" @click="submit">Сохранить</el-button> -->
            <el-card>
              <template #header>Дата начала курса</template>
              <el-space direction="vertical" alignment="start" :size="10">
                <el-form-item prop="publishedOn">
                  <el-date-picker v-model="dpoCourse.start" format="DD.MM.YYYY" type="date" placeholder="Дата начала курса" />
                </el-form-item>
              </el-space>
            </el-card>
            <el-card>
              <template #header>Количество слушателей</template>
              <el-form-item prop="listeners">
                <el-input-number v-model="dpoCourse.listeners" />
              </el-form-item>
            </el-card>
            <el-card>
              <template #header>Преподаватель</template>
              <el-form-item prop="listeners">
                <div>{{ dpoCourse.teacher.doctor.human.getFullName() }}</div>
                <RemoteSearch :key-value="schema.teacher.key" @select="selectSearchTeacher" />
              </el-form-item>
            </el-card>
          </el-container>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts">
import '@vueup/vue-quill/dist/vue-quill.snow.css';

import { QuillEditor } from '@vueup/vue-quill';
import { computed, defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import RemoteSearch from '@/components/RemoteSearch.vue';
import IDpoCourse from '@/interfaces/IDpoCourse';
import ISearchObject from '@/interfaces/ISearchObject';
import ISchema from '@/interfaces/schema/ISchema';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';
import validate from '@/mixins/validate';

export default defineComponent({
  name: 'AdminDpoCoursePage',
  components: {
    RemoteSearch,
    QuillEditor,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    let mounted = ref(false);
    const form = ref();

    const schema: Ref<ISchema> = computed(() => store.getters['meta/schema']);

    const dpoCourse: Ref<IDpoCourse> = computed<IDpoCourse>(() => store.getters['dpoCourses/item']);

    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      await store.dispatch('teachers/getAll');
      await store.dispatch('search/searchGroups');
      await loadItem();
      store.commit('admin/closeLoading');
    });

    const loadItem = async () => {
      if (route.params['id']) {
        await store.dispatch('dpoCourses/get', route.params['id']);
        store.commit('admin/setHeaderParams', {
          title: dpoCourse.value.name,
          showBackButton: true,
          buttons: [{ action: submit }],
        });
      } else {
        store.commit('dpoCourses/resetState');
        store.commit('admin/setHeaderParams', { title: 'Добавить программу', showBackButton: true, buttons: [{ action: submit }] });
      }
      mounted.value = true;
      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(dpoCourse, formUpdated, { deep: true });
    };

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submit, next);
    });

    const submit = async (next?: NavigationGuardNext) => {
      saveButtonClick.value = true;
      if (!validate(form)) {
        saveButtonClick.value = false;
        return;
      }
      if (!route.params['id']) {
        await store.dispatch('dpoCourses/create', dpoCourse.value);
        await router.push('/admin/educational-organization/dpo/courses');
        return;
      }
      await store.dispatch('dpoCourses/update', dpoCourse.value);
      next ? next() : router.push('/admin/educational-organization/dpo/courses');
    };

    const selectSearchTeacher = (searchObject: ISearchObject) => {
      dpoCourse.value.teacherId = searchObject.id;
    };

    return {
      schema,
      mounted,
      submit,
      dpoCourse,
      form,
      selectSearchTeacher,
    };
  },
});
</script>

<style lang="scss" scoped>
.el-container {
  .el-card {
    margin-bottom: 20px;
  }
}

.content-card {
  min-height: 450px;
  max-height: 900px;
}

:deep(.el-dialog) {
  overflow: hidden;
}
</style>
