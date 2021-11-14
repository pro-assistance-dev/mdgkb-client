<template>
  <div class="wrapper">
    <el-form ref="form" :key="vacancy" :model="vacancy">
      <el-container direction="vertical">
        <el-card>
          <el-form-item label-width="100px" label="Название">
            <el-input v-model="vacancy.title" placeholder="Название"> </el-input>
          </el-form-item>
          <el-form-item label-width="100px" label="Заработная плата">
            <el-input v-model="vacancy.salary" placeholder="Заработная плата"> </el-input>
          </el-form-item>
          <el-form-item label-width="100px" label="График работы">
            <el-input v-model="vacancy.schedule" placeholder="График работы"> </el-input>
          </el-form-item>
          <el-form-item label-width="100px" label="Должностные обязанности">
            <el-input v-model="vacancy.duties" placeholder="Требования к кандидату" type="textarea" :rows="4"> </el-input>
          </el-form-item>
          <el-form-item label-width="100px" label="Требования к кандидату">
            <el-input v-model="vacancy.requirements" placeholder="Требования к кандидату" type="textarea" :rows="4"> </el-input>
          </el-form-item>
          <el-form-item label-width="100px" label="Стаж">
            <el-input v-model="vacancy.experience" placeholder="Стаж"> </el-input>
          </el-form-item>
          <el-form-item label-width="100px" label="Описание">
            <el-input v-model="vacancy.description" placeholder="Описание" type="textarea" :rows="4" />
          </el-form-item>
          <el-form-item label-width="100px" label="Отделение">
            <el-select v-model="vacancy.divisionId" clearable>
              <el-option v-for="division in divisions" :key="division.id" :label="division.name" :value="division.id" />
            </el-select>
          </el-form-item>
        </el-card>

        <el-card>
          <template #header>
            <CardHeader :label="'Отклики'" :add-button="false" />
          </template>
          <el-table :data="vacancy.vacancyResponses">
            <el-table-column width="100" label="Новый">
              <template #default="scope">
                <span>
                  <i v-if="!scope.row.viewed" class="el-icon-warning icon" />
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="responseDate" label="Дата" sortable> </el-table-column>
            <el-table-column prop="coverLetter" label="ФИО" sortable>
              <template #default="scope">
                {{ scope.row.human.getFullName() }}
              </template>
            </el-table-column>
            <el-table-column width="40" fixed="right" align="center">
              <template #default="scope">
                <TableButtonGroup
                  :show-download-button="true"
                  :show-info-button="true"
                  @info="showVacancyResponse(scope.row)"
                  @download="pdfVacancyResponse(scope.row.id)"
                />
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-container>
    </el-form>
    <el-dialog v-model="showVacancy" :title="'Отклик на вакансию ' + vacancy.title" width="80%" center>
      <el-descriptions :column="1" border direction="horizontal">
        <el-descriptions-item showedVacancyResponse.coverLetter label="Email">
          {{ showedVacancyResponse.human.contactInfo.emails[0].address }}
        </el-descriptions-item>
        <el-descriptions-item showedVacancyResponse.coverLetter label="Телефон">
          {{ showedVacancyResponse.human.contactInfo.telephoneNumbers[0].number }}
        </el-descriptions-item>
        <el-descriptions-item showedVacancyResponse.coverLetter label="Сопроводительное письмо">
          {{ showedVacancyResponse.coverLetter }}
        </el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import '@vueup/vue-quill/dist/vue-quill.snow.css';

import { computed, defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import CardHeader from '@/components/admin/CardHeader.vue';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import IDivision from '@/interfaces/buildings/IDivision';
import IVacancy from '@/interfaces/vacancies/IVacancy';
import IVacancyResponse from '@/interfaces/vacancyResponse/IVacancyResponse';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';
import validate from '@/mixins/validate';

export default defineComponent({
  name: 'AdminVacanciesPage',
  components: { CardHeader, TableButtonGroup },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    let mounted = ref(false);
    const form = ref();
    const showVacancy = ref(false);
    let showedVacancyResponse: Ref<IVacancyResponse | undefined> = ref(undefined);
    const vacancy: Ref<IVacancy> = computed<IVacancy>(() => store.getters['vacancies/vacancy']);
    const divisions: Ref<IDivision[]> = computed<IDivision[]>(() => store.getters['divisions/divisions']);
    const pages = computed(() => store.getters['pages/pages']);
    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      store.commit('admin/setSubmit', submit);
      await store.dispatch('pages/getAll');
      await store.dispatch('divisions/getAll');

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

    const showVacancyResponse = async (vacancyResponse: IVacancyResponse) => {
      vacancyResponse.viewed = true;
      showedVacancyResponse.value = vacancyResponse;
      showVacancy.value = true;
      await store.dispatch('vacancyResponses/update', vacancyResponse);
    };
    const pdfVacancyResponse = async (id: string) => {
      await store.dispatch('vacancyResponses/pdf', id);
    };
    return {
      divisions,
      showedVacancyResponse,
      pdfVacancyResponse,
      showVacancy,
      showVacancyResponse,
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
