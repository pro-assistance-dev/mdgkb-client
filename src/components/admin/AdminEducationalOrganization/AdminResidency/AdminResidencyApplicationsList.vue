<template>
  <AdminListWrapper v-if="mounted" pagination show-header>
    <template #header>
      <FilterMultipleSelect :filter-model="filterByStatus" :options="filtersToOptions()" @load="loadApplications" />
      <FilterSelectV2 :filter-models="createFilterMainModels()" placeholder="Специальность" @load="loadApplications" />
      <FilterSelectV2 :filter-models="createFilterPaidModels()" placeholder="Основа обучения" @load="loadApplications" />
    </template>
    <template #header-bottom>
      <FilterCheckboxV2 :filter-model="onlyAdmissionFilter" @load="loadApplications" />
    </template>
    <template #sort>
      <SortList :max-width="400" :models="sortList" :store-mode="true" @load="loadApplications" />
    </template>
    <el-table :data="residencyApplications">
      <el-table-column label="Статус" width="200" class-name="sticky-left">
        <template #default="scope">
          <TableFormStatus :form="scope.row.formValue" />
        </template>
      </el-table-column>
      <el-table-column label="Подано" min-width="150">
        <template #default="scope">
          {{ scope.row.admissionCommittee ? `Приемная кампания ${scope.row.residencyCourse.startYear.year.getFullYear()}` : `Ординатура` }}
        </template>
      </el-table-column>
      <el-table-column label="Номер заявления" align="center" width="150">
        <template #default="scope">
          <div v-if="isEditMode">
            <el-input v-model="scope.row.applicationNum" size="small" min="0" />
          </div>
          <div v-else>
            {{ scope.row.applicationNum }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Основа обучения" align="center" width="100">
        <template #default="scope">
          <div>
            {{ scope.row.paid ? 'Контракт' : 'Бюджет' }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Специальность" align="center" width="150">
        <template #default="scope">
          <div>
            {{ scope.row.main ? 'Основная' : 'Дополнительная' }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Дата принятия заявления" align="center" width="150">
        <template #default="scope">
          <div v-if="scope.row.formValue.formStatus.isAccepted()">
            {{
              scope.row.formValue.approvingDate ? $dateTimeFormatter.format(scope.row.formValue.approvingDate) : 'Дата принятия не указана'
            }}
          </div>
          <div v-else>Заявка не принята</div>
        </template>
      </el-table-column>
      <el-table-column label="Дата подачи заявления" align="center" width="150">
        <template #default="scope">
          {{ $dateTimeFormatter.format(scope.row.formValue.createdAt, { month: '2-digit', hour: 'numeric', minute: 'numeric' }) }}
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
          {{ scope.row.residencyCourse.getMainSpecialization().name }}
        </template>
      </el-table-column>
      <el-table-column label="Баллы за вступительные испытания" align="center" width="150">
        <template #default="scope">
          <div v-if="isEditMode">
            <el-input-number v-model="scope.row.pointsEntrance" size="small" min="0" />
          </div>
          <div v-else>
            {{ scope.row.pointsEntrance }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Баллы за индивидуальные достижения" align="center" width="150">
        <template #default="scope">
          <div>
            {{ scope.row.calculateAchievementsPoints(true) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Сумма баллов" align="center" width="150">
        <template #default="scope">
          <div>
            {{ scope.row.pointsSum() }}
          </div>
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
import { computed, ComputedRef, defineComponent, onBeforeUnmount, Ref, ref, watch } from 'vue';
import { NavigationGuardNext } from 'vue-router';

import FilterModel from '@/classes/filters/FilterModel';
import FilterQuery from '@/classes/filters/FilterQuery';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import FilterCheckboxV2 from '@/components/Filters/FilterCheckboxV2.vue';
import FilterMultipleSelect from '@/components/Filters/FilterMultipleSelect.vue';
import FilterSelectV2 from '@/components/Filters/FilterSelectV2.vue';
import TableFormStatus from '@/components/FormConstructor/TableFormStatus.vue';
import SortList from '@/components/SortList/SortList.vue';
import IFilterModel from '@/interfaces/filters/IFilterModel';
import { Orders } from '@/interfaces/filters/Orders';
import IFormStatus from '@/interfaces/IFormStatus';
import IResidencyApplication from '@/interfaces/IResidencyApplication';
import IOption from '@/interfaces/schema/IOption';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';
import createSortModels from '@/services/CreateSortModels';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';
import FormStatusesFiltersLib from '@/services/Provider/libs/filters/FormStatusesFiltersLib';
import ResidencyApplicationsFiltersLib from '@/services/Provider/libs/filters/ResidencyApplicationsFiltersLib';
import ResidencyApplicationsSortsLib from '@/services/Provider/libs/sorts/ResidencyApplicationsSortsLib';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

export default defineComponent({
  name: 'AdminResidencyApplicationsList',
  components: { TableButtonGroup, AdminListWrapper, SortList, TableFormStatus, FilterCheckboxV2, FilterMultipleSelect, FilterSelectV2 },

  setup() {
    const residencyApplications: ComputedRef<IResidencyApplication[]> = computed<IResidencyApplication[]>(
      () => Provider.store.getters['residencyApplications/items']
    );

    const formStatuses: ComputedRef<IFormStatus[]> = computed(() => Provider.store.getters['formStatuses/items']);
    const onlyAdmissionFilter: Ref<IFilterModel> = ref(new FilterModel());
    const filterByStatus: Ref<IFilterModel> = ref(new FilterModel());
    const applicationsCount: ComputedRef<number> = computed(() =>
      Provider.store.getters['meta/applicationsCount']('residency_applications')
    );

    const isEditMode: Ref<boolean> = ref(false);
    const isNotEditMode: Ref<boolean> = ref(true);

    const loadApplications = async () => {
      await Provider.store.dispatch('residencyApplications/getAll', Provider.filterQuery.value);
    };

    const enableEditMode = () => {
      if (isEditMode.value) {
        return;
      }
      isEditMode.value = true;
      isNotEditMode.value = false;
    };

    const cancel = () => {
      isEditMode.value = false;
      isNotEditMode.value = true;
    };

    const save = async (next?: NavigationGuardNext) => {
      if (!isEditMode.value) {
        return;
      }
      saveButtonClick.value = true;
      await Provider.store.dispatch('residencyApplications/updateMany');
      isEditMode.value = false;
      isNotEditMode.value = true;
      if (next) next();
    };
    const { confirmLeave, saveButtonClick, beforeWindowUnload, showConfirmModal } = useConfirmLeavePage();

    const load = async () => {
      Provider.setSortList(...createSortModels(ResidencyApplicationsSortsLib));
      Provider.setSortModels(ResidencyApplicationsSortsLib.byCreatedAt(Orders.Desc));
      await loadApplications();
      await loadFilters();
      onlyAdmissionFilter.value = ResidencyApplicationsFiltersLib.onlyAdmissionCommittee();
      filterByStatus.value = ResidencyApplicationsFiltersLib.byStatus();
      Provider.store.commit('admin/setHeaderParams', {
        title: 'Заявки на обучение в ординатуре',
        buttons: [
          { text: 'Редактировать', type: 'success', action: enableEditMode, condition: isNotEditMode },
          { text: 'Сохранить', type: 'success', action: save, condition: isEditMode },
          { text: 'Подать заявление', type: 'primary', action: create },
        ],
        applicationsCount,
      });
      await Provider.store.dispatch('residencyApplications/subscribeCreate');
    };

    watch(isEditMode, () => {
      confirmLeave.value = isEditMode.value;
    });

    Hooks.onBeforeMount(load, {
      pagination: { storeModule: 'residencyApplications', action: 'getAll' },
      sortModels: [],
    });

    onBeforeUnmount(async () => {
      await Provider.store.dispatch('residencyApplications/unsubscribeCreate');
    });

    const create = () => Provider.router.push(`${Provider.route().path}/new`);
    // const remove = async (id: string) => await store.dispatch('dpoCourses/remove', id);
    const edit = (id: string) => Provider.router.push(`${Provider.route().path}/${id}`);

    const filtersToOptions = (): IOption[] => {
      const options: IOption[] = [];
      formStatuses.value.forEach((i: IFormStatus) => {
        if (i.id) {
          options.push({ value: i.id, label: i.label });
        }
      });
      return options;
    };

    const loadFilters = async () => {
      const filterQuery = new FilterQuery();
      if (residencyApplications.value.length > 0) {
        const formStatusesGroupId = residencyApplications.value[0].formValue.formStatus.formStatusGroupId;
        if (formStatusesGroupId) {
          filterQuery.filterModels.push(FormStatusesFiltersLib.byGroupId(formStatusesGroupId));
        }
      }
      await Provider.store.dispatch('formStatuses/getAll', filterQuery);
    };

    const createFilterMainModels = (): IFilterModel[] => {
      return [ResidencyApplicationsFiltersLib.onlyMain(true), ResidencyApplicationsFiltersLib.onlyMain(false)];
    };

    const createFilterPaidModels = (): IFilterModel[] => {
      return [ResidencyApplicationsFiltersLib.onlyPaid(true), ResidencyApplicationsFiltersLib.onlyPaid(false)];
    };

    return {
      filterByStatus,
      filtersToOptions,
      onlyAdmissionFilter,
      mounted: Provider.mounted,
      schema: Provider.schema,
      residencyApplications,
      edit,
      sortList: Provider.sortList,
      loadApplications,
      isEditMode,
      createFilterMainModels,
      createFilterPaidModels,
    };
  },
});
</script>
