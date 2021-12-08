<template>
  <div class="wrapper">
    <el-form ref="form" :key="vacancy" label-position="top" :model="vacancy">
      <el-container direction="vertical">
        <el-card>
          <el-form-item label="Название">
            <el-input v-model="vacancy.title" placeholder="Название"> </el-input>
          </el-form-item>
          <el-form-item label="Заработная плата">
            <el-input v-model="vacancy.salary" placeholder="Заработная плата"> </el-input>
          </el-form-item>
          <el-form-item label="График работы">
            <el-input v-model="vacancy.schedule" placeholder="График работы"> </el-input>
          </el-form-item>
          <el-form-item label="Должностные обязанности">
            <el-input v-model="vacancy.duties" placeholder="Требования к кандидату" type="textarea" :rows="4"> </el-input>
          </el-form-item>
          <el-form-item label="Требования к кандидату">
            <el-input v-model="vacancy.requirements" placeholder="Требования к кандидату" type="textarea" :rows="4"> </el-input>
          </el-form-item>
          <el-form-item label="Стаж">
            <el-input v-model="vacancy.experience" placeholder="Стаж"> </el-input>
          </el-form-item>
          <el-form-item label="Описание">
            <el-input v-model="vacancy.description" placeholder="Описание" type="textarea" :rows="4" />
          </el-form-item>
          <el-form-item label="Отделение">
            <el-select v-model="vacancy.divisionId" clearable>
              <el-option v-for="division in divisions" :key="division.id" :label="division.name" :value="division.id" />
            </el-select>
          </el-form-item>
          <el-form-item label-width="100px" label="Дата добавления вакансии">
            <el-date-picker v-model="vacancy.date" type="date" format="DD.MM.YYYY" placeholder="Выберите дату" />
          </el-form-item>
        </el-card>

        <el-card>
          <template #header>
            <CardHeader :label="'Отклики'" :add-button="false" />
          </template>
          <AdminVacanciesPageResponses :vacancy-responses="vacancy.vacancyResponses" />
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

import AdminVacanciesPageResponses from '@/components/admin/AdminVacancies/AdminVacanciesPageResponses.vue';
import CardHeader from '@/components/admin/CardHeader.vue';
import IDivision from '@/interfaces/buildings/IDivision';
import IVacancy from '@/interfaces/vacancies/IVacancy';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';
import validate from '@/mixins/validate';

export default defineComponent({
  name: 'AdminVacanciesPage',
  components: { CardHeader, AdminVacanciesPageResponses },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    let mounted = ref(false);
    const form = ref();
    const vacancy: Ref<IVacancy> = computed<IVacancy>(() => store.getters['vacancies/vacancy']);
    const divisions: Ref<IDivision[]> = computed<IDivision[]>(() => store.getters['divisions/divisions']);
    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      await store.dispatch('divisions/getAll');

      if (route.params['id']) {
        await store.dispatch('vacancies/get', route.params['id']);
        store.commit('admin/setHeaderParams', { title: vacancy.value.title, showBackButton: true, buttons: [{ action: submit }] });
      } else {
        store.commit('vacancies/resetState');
        store.commit('admin/setHeaderParams', { title: 'Добавить меню', showBackButton: true, buttons: [{ action: submit }] });
      }

      await store.dispatch('documentTypes/getDocumentsTypesForTables');
      await store.dispatch('documentTypes/getAll');

      mounted.value = true;
      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(vacancy, formUpdated, { deep: true });
      store.commit('admin/closeLoading');
    });

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
      divisions,
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
