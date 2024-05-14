<template>
  <AdminListWrapper show-header>
    <template #header>
      <FiltersList :models="createPagesGroupFilters()" @load="load" />
    </template>
    <el-table v-if="pages" :data="pages">
      <el-table-column prop="title" label="Заголовок" sortable> </el-table-column>
      <!--      <el-table-column prop="slug" label="Ссылка" sortable> </el-table-column>-->
      <el-table-column prop="pagesGroup" label="Группа страниц" sortable> </el-table-column>
      <el-table-column width="50" align="center">
        <template #default="scope">
          <TableButtonGroup
            :show-more-button="true"
            :show-edit-button="true"
            :show-remove-button="true"
            @edit="edit(scope.row.id)"
            @remove="remove(scope.row.id)"
            @showMore="openPage(scope.row.getLink())"
          />
        </template>
      </el-table-column>
    </el-table>
  </AdminListWrapper>
</template>

<script lang="ts" setup>
import User from '@/classes/User';
import FiltersList from '@/components/Filters/FiltersList.vue';
import FilterModel from '@/services/classes/filters/FilterModel';
import Page from '@/services/classes/page/Page';
import Hooks from '@/services/Hooks/Hooks';
import PagesFiltersLib from '@/libs/filters/PagesFiltersLib';
import PagesSortsLib from '@/libs/sorts/PagesSortsLib';
import Provider from '@/services/Provider/Provider';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

const pages: ComputedRef<Page[]> = Store.Items('pages');
const user: ComputedRef<User> = Store.Item('auth', 'user');

const load = async (): Promise<void> => {
  // if (user.value.role.name !== 'ADMIN' && user.value.roleId) {
  // Provider.setFilterModels(PagesFiltersLib.byRole(user.value.roleId));
  // }
  // Provider.setSortModels(PagesSortsLib.byTitle());
  await Store.FTSP('pages', { ftsp: Provider.ftsp.value });
  if (user.value.role.name === 'ADMIN') {
    Provider.store.commit('admin/setHeaderParams', {
      title: 'Страницы',
      buttons: [{ text: 'Добавить', type: 'primary', action: create }],
    });
  } else {
    Provider.store.commit('admin/setHeaderParams', {
      title: 'Страницы',
      buttons: [],
    });
  }
};

const edit = async (id: string): Promise<void> => {
  const item = pages.value.find((i: Page) => i.id === id);
  if (item) {
    await Provider.router.push(`/admin/pages/${item.slug}`);
  }
};

const remove = async (id: string) => {
  await Provider.store.dispatch('pages/remove', id);
};

const create = () => {
  Provider.router.push('/admin/pages/new');
};

Hooks.onBeforeMount(async () => {
  await load();
});

const openPage = (link: string) => {
  const route = Provider.router.resolve(link);
  window.open(route.href, '_blank');
};

const createPagesGroupFilters = (): FilterModel[] => {
  return [
    PagesFiltersLib.byPagesGroup('Без группы'),
    PagesFiltersLib.byPagesGroup('Образование'),
    PagesFiltersLib.byPagesGroup('Сведения об организации'),
  ];
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
