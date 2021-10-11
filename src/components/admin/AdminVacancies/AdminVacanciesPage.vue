<template>
  <div class="wrapper">
    <el-form ref="form" :key="vacancy" :model="vacancy">
      <el-container direction="vertical">
        <el-card>
          <el-form-item label-width="100px" label="Название">
            <el-input v-model="vacancy.title" placeholder="Название"> </el-input>
          </el-form-item>
          <el-form-item label-width="100px" label="Название">
            <el-input v-model="vacancy.description" placeholder="Описание"> </el-input>
          </el-form-item>
          <el-form-item label-width="100px" label="Название">
            <el-input v-model="vacancy.specialization" placeholder="Специализация"> </el-input>
          </el-form-item>
          <el-form-item label-width="100px" label="Название">
            <el-input v-model="vacancy.salary" placeholder="Зарплата"> </el-input>
          </el-form-item>
        </el-card>
      </el-container>
    </el-form>
  </div>
</template>

<script lang="ts">
import '@vueup/vue-quill/dist/vue-quill.snow.css';

import { computed, defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import IVacancy from '@/interfaces/vacancies/IVacancy';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';
import validate from '@/mixins/validate';

export default defineComponent({
  name: 'AdminVacanciesPage',
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    let mounted = ref(false);
    const form = ref();

    const vacancy: Ref<IVacancy> = computed<IVacancy>(() => store.getters['vacancies/vacancy']);
    const pages = computed(() => store.getters['pages/pages']);
    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      store.commit('admin/setSubmit', submit);
      await store.dispatch('pages/getAll');
      await loadMenu();
    });

    const loadMenu = async () => {
      if (route.params['id']) {
        await store.dispatch('vacancies/get', route.params['id']);
        store.commit('admin/setPageTitle', { title: vacancy.value.title, saveButton: true });
      } else {
        store.commit('vacancies/resetState');
        store.commit('admin/setPageTitle', { title: 'Добавить меню', saveButton: true });
      }
      mounted.value = true;
      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(vacancy, formUpdated, { deep: true });
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
        await store.dispatch('vacancies/create', vacancy.value);
        await router.push('/admin/vacancies');
        return;
      }
      await store.dispatch('vacancies/update', vacancy.value);
      next ? next() : await router.push('/admin/vacancies');
    };

    return {
      pages,
      mounted,
      submit,
      vacancy,
      form,
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
