<template>
  <AdminListWrapper pagination>
    <!-- <template #header>
      <FiltersList :models="createFilterModels()" @load="loadApplications" />
    </template> -->
    <template #sort>
      <SortList :max-width="400" :models="sortList" :store-mode="true" @load="loadApplications" />
    </template>
    <el-table :data="dpoApplications">
      <el-table-column label="Статус" width="200" class-name="sticky-left">
        <template #default="scope">
          <TableFormStatus :form="scope.row.formValue" />
        </template>
      </el-table-column>
      <el-table-column label="Дата подачи заявления" align="center" width="150">
        <template #default="scope">
          {{
            $dateTimeFormatter.format(scope.row.formValue.createdAt, {
              month: '2-digit',
              hour: 'numeric',
              minute: 'numeric',
            })
          }}
        </template>
      </el-table-column>
      <el-table-column label="Email заявителя" min-width="150">
        <template #default="scope">
          {{ scope.row.formValue.user.email }}
        </template>
      </el-table-column>
      <el-table-column label="ФИО заявителя" min-width="200">
        <template #default="scope">
          {{ scope.row.formValue.user.human.getFullName() }}
        </template>
      </el-table-column>
      <el-table-column label="Наименование курса" min-width="200">
        <template #default="scope">
          {{ scope.row.nmoCourse.name }}
        </template>
      </el-table-column>
      <el-table-column width="50" align="center" class-name="sticky-right">
        <template #default="scope">
          <TableButtonGroup :show-edit-button="true" @edit="edit(scope.row.id)" />
        </template>
      </el-table-column>
    </el-table>
  </AdminListWrapper>
</template>

<script lang="ts">
import DpoApplication from '@/classes/DpoApplication';
import FormStatus from '@/classes/FormStatus';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import TableFormStatus from '@/components/FormConstructor/TableFormStatus.vue';
import DpoApplicationsFiltersLib from '@/libs/filters/DpoApplicationsFiltersLib';
import FormStatusesFiltersLib from '@/libs/filters/FormStatusesFiltersLib';
import FilterModel from '@/services/classes/filters/FilterModel';
import FilterQuery from '@/services/classes/filters/FilterQuery';
import Hooks from '@/services/Hooks/Hooks';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

export default defineComponent({
  name: 'AdminDpoApplicationsList',
  components: { TableButtonGroup, AdminListWrapper, TableFormStatus },

  setup() {
    const dpoApplications: DpoApplication[] = DpoApplicationsStore.Items();
    const formStatuses: FormStatus[] = FormStatusesStore.Items();

    const filterModel = ref();
    const title = ref('');

    watch(Router.Route(), async () => {
      setType();
      await DpoApplicationsStore.GetAll();
    });

    const setType = () => {
      filterModel.value = DpoApplicationsFiltersLib.byCourseType(false);
      if (Router.Route().path === '/admin/nmo/applications') {
        filterModel.value.boolean = true;
        title.value = 'Заявки НМО';
      } else {
        filterModel.value.boolean = false;
        title.value = 'Заявки ДПО';
      }
    };

    const loadApplications = async () => {
      await DpoApplicationsStore.GetAll();
    };

    const loadFilters = async () => {
      const filterQuery = new FilterQuery();
      filterQuery.filterModels.push(FormStatusesFiltersLib.byCode('education'));
      await FormStatusesStore.GetAll();
    };

    const load = async () => {
      // await setFilter();
      await loadFilters();
      setType();
      await loadApplications();
    };

    Hooks.onBeforeMount(load);

    const edit = (id: string) => Router.To(`${Router.Route().path}/${id}`);

    const createFilterModels = (): FilterModel[] => {
      const filters: FilterModel[] = [];
      formStatuses.forEach((fs: FormStatus) => {
        if (fs.id) {
          filters.push(DpoApplicationsFiltersLib.byStatus(fs.id, fs.label));
        }
      });
      return filters;
    };

    return {
      createFilterModels,
      dpoApplications,
      loadApplications,
      edit,
      formStatuses,
    };
  },
});
</script>
