<template>
  <component :is="'AdminListWrapper'" v-if="mounted" show-header>
    <el-tag v-if="dpoApplications.some((app) => app.formValue.isNew)">Есть новые заявки</el-tag>
    <template #header>
      <FiltersList :models="createFilterModels()" @load="loadApplications" />
    </template>
    <el-table :data="dpoApplications">
      <el-table-column label="Статус">
        <template #default="scope">
          <el-tag v-if="scope.row.formValue.isNew" size="small" type="warning">Не просмотрено</el-tag>
          <el-tag
            v-if="scope.row.formValue.formStatus.label"
            size="small"
            :style="`background-color: inherit; color: ${scope.row.formValue.formStatus.color}; border-color: ${scope.row.formValue.formStatus.color}`"
          >
            {{ scope.row.formValue.formStatus.label }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Дата подачи заявления" sortable>
        <template #default="scope">
          {{ $dateTimeFormatter.format(scope.row.formValue.createdAt, { month: 'long', hour: 'numeric', minute: 'numeric' }) }}
        </template>
      </el-table-column>
      <el-table-column label="Email заявителя" sortable>
        <template #default="scope">
          {{ scope.row.formValue.user.email }}
        </template>
      </el-table-column>
      <el-table-column label="ФИО заявителя" sortable>
        <template #default="scope">
          {{ scope.row.formValue.user.human.getFullName() }}
        </template>
      </el-table-column>
      <el-table-column label="Наименование курса" sortable>
        <template #default="scope">
          {{ scope.row.dpoCourse.name }}
        </template>
      </el-table-column>
      <el-table-column width="50" fixed="right" align="center">
        <template #default="scope">
          <TableButtonGroup :show-edit-button="true" @edit="edit(scope.row.id)" />
        </template>
      </el-table-column>
    </el-table>
  </component>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeUnmount, ref, watch } from 'vue';

import FilterQuery from '@/classes/filters/FilterQuery';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import FiltersList from '@/components/Filters/FiltersList.vue';
import IFilterModel from '@/interfaces/filters/IFilterModel';
import IDpoApplication from '@/interfaces/IDpoApplication';
import IFormStatus from '@/interfaces/IFormStatus';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';
import DpoApplicationsFiltersLib from '@/services/Provider/libs/filters/DpoApplicationsFiltersLib';
import FormStatusesFiltersLib from '@/services/Provider/libs/filters/FormStatusesFiltersLib';
import DpoApplicationsSortsLib from '@/services/Provider/libs/sorts/DpoApplicationsSortsLib';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

export default defineComponent({
  name: 'AdminDpoApplicationsList',
  components: { TableButtonGroup, FiltersList, AdminListWrapper },

  setup() {
    const dpoApplications: ComputedRef<IDpoApplication[]> = computed(() => Provider.store.getters['dpoApplications/items']);
    const formStatuses: ComputedRef<IFormStatus[]> = computed(() => Provider.store.getters['formStatuses/items']);

    const filterModel = ref();
    const title = ref('');

    watch(Provider.route(), async () => {
      setType();
      await unsubscribe();
      await subscribe();
      await Provider.store.dispatch('dpoApplications/getAll', Provider.filterQuery.value);
    });

    const setType = () => {
      filterModel.value = DpoApplicationsFiltersLib.byCourseType(false);
      if (Provider.route().path === '/admin/nmo/applications') {
        filterModel.value.boolean = true;
        title.value = 'Заявки НМО';
      } else {
        filterModel.value.boolean = false;
        title.value = 'Заявки ДПО';
      }
      Provider.store.commit('filter/setFilterModel', filterModel.value);
    };

    const setFilter = async () => {
      await Provider.store.dispatch('meta/getSchema');
      Provider.store.commit(`filter/resetQueryFilter`);
      Provider.store.commit('filter/replaceSortModel', DpoApplicationsSortsLib.byCreatedAt());
      Provider.filterQuery.value.pagination.cursorMode = false;
      setType();
    };

    const loadApplications = async () => {
      await Provider.store.dispatch('dpoApplications/getAll', Provider.filterQuery.value);
    };

    const loadFilters = async () => {
      const filterQuery = new FilterQuery();
      if (dpoApplications.value.length > 0) {
        const formStatusesGroupId = dpoApplications.value[0].formValue.formStatus.formStatusGroupId;
        if (formStatusesGroupId) {
          filterQuery.filterModels.push(FormStatusesFiltersLib.byGroupId(formStatusesGroupId));
        }
      }
      await Provider.store.dispatch('formStatuses/getAll', filterQuery);
    };

    const load = async () => {
      await setFilter();
      await loadApplications();
      await loadFilters();
      Provider.store.commit('admin/setHeaderParams', {
        title: title,
        buttons: [{ text: 'Подать заявление', type: 'primary', action: create }],
      });
      Provider.store.commit('pagination/setCurPage', 1);
      await subscribe();
      window.addEventListener('beforeunload', unsubscribe);
    };

    Hooks.onBeforeMount(load);

    const subscribe = async () => {
      const isNmo = Provider.route().path === '/admin/nmo/applications';
      await Provider.store.dispatch('dpoApplications/subscribeCreate', isNmo);
    };

    const unsubscribe = async () => {
      await Provider.store.dispatch('dpoApplications/unsubscribeCreate');
    };
    onBeforeUnmount(async () => {
      await Provider.store.dispatch('dpoApplications/unsubscribeCreate');
    });

    const create = () => Provider.router.push(`${Provider.route().path}/new`);
    // const remove = async (id: string) => await Provider.store.dispatch('dpoCourses/remove', id);
    const edit = (id: string) => Provider.router.push(`${Provider.route().path}/${id}`);

    const createFilterModels = (): IFilterModel[] => {
      const filters: IFilterModel[] = [];
      formStatuses.value.forEach((fs: IFormStatus) => {
        if (fs.id) {
          filters.push(DpoApplicationsFiltersLib.byStatus(fs.id, fs.label));
        }
      });
      return filters;
    };

    return {
      createFilterModels,
      mounted: Provider.mounted,
      dpoApplications,
      loadApplications,
      edit,
      formStatuses,
    };
  },
});
</script>

<style lang="scss" scoped>
:deep(.el-tag) {
  margin: 2px;
}
</style>
