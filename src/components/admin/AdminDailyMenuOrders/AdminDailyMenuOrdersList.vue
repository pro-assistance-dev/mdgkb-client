<template>
  <AdminListWrapper v-if="mounted" pagination show-header>
    <template #header>
      <!-- <RemoteSearch key-value="dailyMenuOrder" placeholder="Введите номер заказа" @select="selectSearch" /> -->
      <!-- <FilterMultipleSelect class="filters-block" :filter-model="filterByStatus" :options="filtersToOptions()" @load="loadApplications" /> -->
      <!-- <FilterCheckbox class="filters-block" :filter-model="onlyNewFilter" @load="loadApplications" /> -->
    </template>
    <template #sort>
      <SortList :max-width="400" @load="loadItems" />
    </template>
    <el-table :data="dailyMenuOrders">
      <el-table-column label="Статус" width="150" class-name="sticky-left">
        <template #default="scope">
          <TableFormStatus :form="scope.row.formValue" />
        </template>
      </el-table-column>
      <el-table-column label="Номер заказа" align="center" sortable>
        <template #default="scope">
          {{ scope.row.number }}
        </template>
      </el-table-column>
      <el-table-column label="Время" align="center" sortable>
        <template #default="scope">
          {{
            $dateTimeFormatter.format(scope.row.formValue.createdAt, {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: 'numeric',
              minute: 'numeric',
            })
          }}
        </template>
      </el-table-column>
      <el-table-column label="Email" sortable>
        <template #default="scope">
          {{ scope.row.formValue.user.email }}
        </template>
      </el-table-column>
      <el-table-column label="Телефон" sortable>
        <template #default="scope">
          <a :href="'tel:' + scope.row.formValue.user.phone">{{ scope.row.formValue.user.phone }}</a>
        </template>
      </el-table-column>

      <el-table-column label="Стоимость заказа" sortable>
        <template #default="scope">
          <el-tooltip class="box-item" effect="dark" placement="top-start" trigger="click">
            <template #content>
              <div v-for="dailyMenuOrderItem in scope.row.dailyMenuOrderItems" :key="dailyMenuOrderItem.id">
                {{ dailyMenuOrderItem.dailyMenuItem.name }} ({{ dailyMenuOrderItem.quantity }} шт.)
              </div>
            </template>

            <el-button>{{ scope.row.dailyMenuOrderItems.length }} блюда </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="Стоимость заказа" sortable>
        <template #default="scope"> {{ scope.row.getPriceSum() }} руб. </template>
      </el-table-column>
      <el-table-column width="50" align="center">
        <template #default="scope">
          <TableButtonGroup :show-edit-button="true" @edit="edit(scope.row.id)" />
        </template>
      </el-table-column>
    </el-table>
  </AdminListWrapper>
</template>

<script lang="ts" setup>
import FormStatus from '@/classes/FormStatus';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import TableFormStatus from '@/components/FormConstructor/TableFormStatus.vue';
import IOption from '@/interfaces/IOption';
import DailyMenuOrdersFiltersLib from '@/libs/filters/DailyMenuOrdersFiltersLib';
import FormStatusesFiltersLib from '@/libs/filters/FormStatusesFiltersLib';
import DailyMenuOrdersSortsLib from '@/libs/sorts/DailyMenuOrdersSortsLib';
import FilterModel from '@/services/classes/filters/FilterModel';
import FilterQuery from '@/services/classes/filters/FilterQuery';
import Hooks from '@/services/Hooks/Hooks';
import ISearchObject from '@/services/interfaces/ISearchObject';
import Provider from '@/services/Provider/Provider';

const dailyMenuOrders = Store.Items('dailyMenuOrders');
const filterByStatus: Ref<FilterModel> = ref(new FilterModel());
const formStatuses: ComputedRef<FormStatus[]> = computed(() => Provider.store.getters['formStatuses/items']);
const onlyNewFilter: Ref<FilterModel> = ref(new FilterModel());
const load = async () => {
  onlyNewFilter.value = DailyMenuOrdersFiltersLib.onlyNew();
  Store.FTSP('dailyMenuOrders');
  loadFilters();
  filterByStatus.value = DailyMenuOrdersFiltersLib.byStatus();
  PHelp.AdminUI.Head.Set('Буфет.Заказы', []);
};

Hooks.onBeforeMount(load, {
  pagination: { storeModule: 'dailyMenuOrders', action: 'getAll' },
  sortsLib: DailyMenuOrdersSortsLib,
});

const selectSearch = async (event: ISearchObject): Promise<void> => {
  await Provider.toAdmin(`/daily-menu-orders/${event.id}`);
};

const loadApplications = () => {
  Provider.loadItems();
};

const filtersToOptions = (): IOption[] => {
  const options: IOption[] = [];
  formStatuses.value.forEach((i: FormStatus) => {
    if (i.id) {
      options.push({ value: i.id, label: i.label });
    }
  });
  return options;
};

const loadFilters = async () => {
  const filterQuery = new FilterQuery();
  filterQuery.filterModels.push(FormStatusesFiltersLib.byCode('bufet'));
  await Provider.store.dispatch('formStatuses/getAll', filterQuery);
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
$margin: 20px 0;

.flex-column {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.flex-row-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: $margin;
}

.flex-row-end {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: $margin;
}

.tag-link {
  margin: 2px;
  transition: all 0.2s;
  color: blue;
  border-color: blue;
  border-radius: 20px;

  &:hover {
    background-color: blue;
    color: white;
    cursor: pointer;
  }
}
</style>
