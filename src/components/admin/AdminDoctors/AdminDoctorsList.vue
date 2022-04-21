<template>
  <div v-if="mounted" class="flex-column">
    <RemoteSearch :key-value="schema.doctor.key" @select="selectSearch" />
    <el-card>
      <el-table :data="doctors" :border="false">
        <el-table-column label="ФИО" sortable>
          <template #default="scope">
            {{ scope.row.human.getFullName() }}
          </template>
        </el-table-column>
        <el-table-column label="Пол" align="center" sortable>
          <template #default="scope">
            {{ scope.row.human.getGender() }}
          </template>
        </el-table-column>
        <el-table-column label="Дата рождения" sortable>
          <template #default="scope">
            {{ fillDateFormat(scope.row.human.dateBirth) }}
          </template>
        </el-table-column>
        <el-table-column label="Отделение" sortable>
          <template #default="scope">
            <el-tag
              v-if="scope.row.division.name"
              class="tag-link"
              size="small"
              @click="$router.push(`/admin/divisions/${scope.row.division.id}`)"
            >
              {{ scope.row.division.name }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column width="50" fixed="right" align="center">
          <template #default="scope">
            <TableButtonGroup
              :show-edit-button="true"
              :show-remove-button="true"
              @edit="edit(scope.row.human.slug)"
              @remove="remove(scope.row.id)"
            />
          </template>
        </el-table-column>
      </el-table>
      <Pagination />
    </el-card>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import SortModel from '@/classes/filters/SortModel';
import Pagination from '@/components/admin/Pagination.vue';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import { Orders } from '@/interfaces/filters/Orders';
import ISearchObject from '@/interfaces/ISearchObject';
import ISchema from '@/interfaces/schema/ISchema';

export default defineComponent({
  name: 'AdminDoctorsList',
  components: { TableButtonGroup, Pagination, RemoteSearch },
  setup() {
    const store = useStore();
    const router = useRouter();
    const doctors = computed(() => store.getters['doctors/items']);
    const filterQuery: ComputedRef<IFilterQuery> = computed(() => store.getters['filter/filterQuery']);
    const schema: Ref<ISchema> = computed(() => store.getters['meta/schema']);
    const mounted: Ref<boolean> = ref(false);

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      store.commit(`filter/resetQueryFilter`);
      await store.dispatch('meta/getSchema');
      store.commit('filter/setStoreModule', 'doctors');
      store.commit('filter/setAction', 'getAllAdmin');
      store.commit(
        'filter/replaceSortModel',
        SortModel.CreateSortModel(schema.value.doctor.tableName, schema.value.doctor.fullName, Orders.Asc, 'По алфавиту', true)
      );
      filterQuery.value.pagination.cursorMode = false;
      await store.dispatch('doctors/getAllAdmin', filterQuery.value);

      store.commit('admin/setHeaderParams', { title: 'Врачи', buttons: [{ text: 'Добавить врача', type: 'primary', action: create }] });
      store.commit('pagination/setCurPage', 1);
      store.commit('admin/closeLoading');
      mounted.value = true;
    });

    const create = () => router.push(`/admin/doctors/new`);
    const edit = (slug: string) => router.push(`/admin/doctors/${slug}`);
    const remove = async (id: string) => await store.dispatch('doctors/remove', id);
    const fillDateFormat = (date: Date) => (date ? Intl.DateTimeFormat('ru-RU').format(new Date(date)) : '');
    const selectSearch = async (event: ISearchObject): Promise<void> => {
      await router.push({ name: `AdminEditDoctorPage`, params: { id: event.id } });
    };

    return { doctors, remove, edit, create, fillDateFormat, mounted, schema, selectSearch };
  },
});
</script>

<style lang="scss" scoped>
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
