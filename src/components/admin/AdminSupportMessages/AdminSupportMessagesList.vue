<template>
  <AdminListWrapper show-header :store="SupportMessagesStore">
    <template #header>
      <FilterCheckbox class="filters-block" :filter-model="onlyNewFilter" @load="loadSupportMessages" />
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
          {{
            $dateTimeFormatter.format(scope.row.date, {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            })
          }}
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
            @show-more="$router.push(`/admin/support-messages/${scope.row.id}`)"
            @check="changeNewStatus(scope.row)"
          />
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <Pagination />
    </template>
  </AdminListWrapper>
</template>

<script lang="ts" setup>
import SupportMessage from '@/classes/SupportMessage';
import SupportMessagesFiltersLib from '@/libs/filters/SupportMessagesFiltersLib';
import SupportMessagesSortsLib from '@/libs/sorts/SupportMessagesSortsLib';
import FilterModel from '@/services/classes/filters/FilterModel';
import Hooks from '@/services/Hooks/Hooks';
import SortListConst from '@/services/SortList';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';

const supportMessages: SupportMessage[] = SupportMessagesStore.Items();
const onlyNewFilter: Ref<FilterModel> = ref(new FilterModel());
const isEditMode: Ref<boolean> = ref(false);
const isNotEditMode: Ref<boolean> = ref(true);
const { saveButtonClick } = useConfirmLeavePage();
const sourceSSE: EventSource | undefined = undefined;

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
  await SupportMessagesStore.UpdateMany();
  isEditMode.value = false;
  isNotEditMode.value = true;
  if (next) next();
};

const loadSupportMessages = async () => {
  await SupportMessagesStore.FTSP();
};

const load = async () => {
  SortListConst.Set(SupportMessagesSortsLib);
  await loadSupportMessages();
  onlyNewFilter.value = SupportMessagesFiltersLib.onlyNew();
  PHelp.AdminUI.Head.Set('Вопросы в тех.поддержку', [
    Button.Success('Редактировать', edit, isNotEditMode),
    Button.Success('Сохранить', save, isEditMode),
  ]);
};

Hooks.onBeforeMount(load);

onBeforeUnmount(async () => {
  sourceSSE?.close();
});

const changeNewStatus = async (question: SupportMessage) => {
  question.changeNewStatus();
  await SupportMessagesStore.ChangeNewStatus(question);
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
</style>
