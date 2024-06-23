<template>
  <AdminListWrapper show-header>
    <template #header>
      <!-- <FilterSelect :models="filterMainModels" placeholder="Специальность" @load="loadApplications" /> -->
      <RemoteSearchNew :key-value="'page'" @select="(e) => Router.ToAdmin(`pages/${e.id}`)" />
      <FilterSelect :models="pagesGroupFilters" @load="load" />
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
import Page from '@/services/classes/page/Page';
import Hooks from '@/services/Hooks/Hooks';
import PagesFiltersLib from '@/libs/filters/PagesFiltersLib';
import Provider from '@/services/Provider/Provider';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

const pages: ComputedRef<Page[]> = Store.Items('pages');
// const user: ComputedRef<User> = Store.Item('auth', 'user');

const load = async (): Promise<void> => {
  // if (user.value.role.name !== 'ADMIN' && user.value.roleId) {
  // Provider.setFilterModels(PagesFiltersLib.byRole(user.value.roleId));
  // }
  // Provider.setSortModels(PagesSortsLib.byTitle());
  await Store.FTSP('pages', { ftsp: Provider.ftsp.value });
  // if (user.value.role.name === 'ADMIN') {
  //   Provider.store.commit('admin/setHeaderParams', {
  //     title: 'Страницы',
  //     buttons: [{ text: 'Добавить', type: 'primary', action: create }],
  //   });
  // } else {
  PHelp.AdminHead().Set('Страницы', []);
};

const edit = async (id: string): Promise<void> => {
  const item = pages.value.find((i: Page) => i.id === id);
  if (item) {
    await Router.ToAdmin(`/pages/${item.slug}`);
  }
};

const remove = async (id: string) => {
  await Store.Remove('pages', id);
};

Hooks.onBeforeMount(async () => {
  await load();
});

const openPage = (link: string) => {
  window.open(Router.Resolve(link).href, '_blank');
};

const pagesGroupFilters = [
  PagesFiltersLib.byPagesGroup('Без группы'),
  PagesFiltersLib.byPagesGroup('Образование'),
  PagesFiltersLib.byPagesGroup('Сведения об организации'),
];
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
