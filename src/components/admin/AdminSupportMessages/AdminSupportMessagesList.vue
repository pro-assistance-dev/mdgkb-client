<template>
  <component :is="'AdminListWrapper'" v-if="mounted" show-header>
    <template #header>
      <FilterCheckboxV2 class="filters-block" :filter-model="onlyNewFilter" @load="loadSupportMessages" />
    </template>
    <template #sort>
      <SortListV2 class="filters-block" :store-mode="false" @load="loadSupportMessages" />
    </template>
    <el-table v-if="supportMessages" :data="supportMessages">
      <el-table-column label="Тема вопроса" sortable>
        <template #default="scope">
          {{ scope.row.getThemeOrFirstPhrase() }}
        </template>
      </el-table-column>
      <el-table-column label="Дата" sortable>
        <template #default="scope">
          {{ $dateTimeFormatter.format(scope.row.date, { month: '2-digit', hour: 'numeric', minute: 'numeric' }) }}
        </template>
      </el-table-column>
      <el-table-column label="Статус">
        <template #default="scope">
          <el-tag v-if="scope.row.isNew" size="small" type="warning">Новый</el-tag>
        </template>
      </el-table-column>
      <el-table-column width="50" align="center">
        <template #default="scope">
          <TableButtonGroup
            :show-check-button="true"
            :show-more-button="true"
            @showMore="$router.push(`/admin/support-messages/${scope.row.id}`)"
            @check="changeNewStatus(scope.row)"
          />
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <Pagination />
    </template>
  </component>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeUnmount, Ref, ref } from 'vue';
import { NavigationGuardNext } from 'vue-router';

import SupportMessage from '@/classes/SupportMessage';
import Pagination from '@/components/admin/Pagination.vue';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import FilterCheckboxV2 from '@/components/Filters/FilterCheckboxV2.vue';
import SortListV2 from '@/components/SortList/SortListV2.vue';
import FilterModel from '@/services/classes/filters/FilterModel';
import createSortModels from '@/services/CreateSortModels';
import Hooks from '@/services/Hooks/Hooks';
import { Orders } from '@/services/interfaces/Orders';
import SupportMessagesFiltersLib from '@/services/Provider/libs/filters/SupportMessagesFiltersLib';
import SupportMessagesSortsLib from '@/services/Provider/libs/sorts/SupportMessagesSortsLib';
import Provider from '@/services/Provider/Provider';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

export default defineComponent({
  name: 'AdminSupportMessagesList',
  components: { SortListV2, FilterCheckboxV2, TableButtonGroup, AdminListWrapper, Pagination },
  setup() {
    const supportMessages: Ref<SupportMessage[]> = computed(() => Provider.store.getters['supportMessages/items']);
    const onlyNewFilter: Ref<FilterModel> = ref(new FilterModel());
    const isEditMode: Ref<boolean> = ref(false);
    const isNotEditMode: Ref<boolean> = ref(true);
    const { saveButtonClick } = useConfirmLeavePage();
    const applicationsCount: ComputedRef<number> = computed(() => Provider.store.getters['admin/applicationsCount']('supportMessages'));
    let sourceSSE: EventSource | undefined = undefined;
    const edit = () => {
      if (isEditMode.value) {
        return;
      }
      isEditMode.value = true;
      isNotEditMode.value = false;
    };

    const save = async (next?: NavigationGuardNext) => {
      if (!isEditMode.value) {
        return;
      }
      saveButtonClick.value = true;
      await Provider.store.dispatch('supportMessages/updateMany');
      isEditMode.value = false;
      isNotEditMode.value = true;
      if (next) next();
    };

    const loadSupportMessages = async () => {
      await Provider.getAll('supportMessages');
    };

    const load = async () => {
      Provider.setSortModels(SupportMessagesSortsLib.byDate(Orders.Desc));
      Provider.setSortList(...createSortModels(SupportMessagesSortsLib, Orders.Desc));
      await loadSupportMessages();
      onlyNewFilter.value = SupportMessagesFiltersLib.onlyNew();
      Provider.store.commit('admin/setHeaderParams', {
        title: 'Вопросы',
        buttons: [
          { text: 'Редактировать', type: 'success', action: edit, condition: isNotEditMode },
          { text: 'Сохранить', type: 'success', action: save, condition: isEditMode },
        ],
        applicationsCount,
      });
    };

    Hooks.onBeforeMount(load, {
      pagination: { storeModule: 'supportMessages', action: 'getAll' },
    });

    onBeforeUnmount(async () => {
      sourceSSE?.close();
    });

    const changeNewStatus = async (question: SupportMessage) => {
      question.changeNewStatus();
      await Provider.store.dispatch('supportMessages/changeNewStatus', question);
    };
    return {
      supportMessages,
      loadSupportMessages,
      changeNewStatus,
      mounted: Provider.mounted,
      onlyNewFilter,
      isEditMode,
    };
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
</style>
