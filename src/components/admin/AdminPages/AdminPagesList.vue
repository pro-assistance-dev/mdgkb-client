<template>
  <AdminListWrapper v-if="mounted" show-header>
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

<script lang="ts">
import { computed, ComputedRef, defineComponent } from 'vue';

import User from '@/classes/User';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import FiltersList from '@/components/Filters/FiltersList.vue';
import FilterModel from '@/services/classes/filters/FilterModel';
import Page from '@/services/classes/page/Page';
import Hooks from '@/services/Hooks/Hooks';
import PagesFiltersLib from '@/services/Provider/libs/filters/PagesFiltersLib';
import PagesSortsLib from '@/services/Provider/libs/sorts/PagesSortsLib';
import Provider from '@/services/Provider/Provider';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

export default defineComponent({
  name: 'AdminPagesList',
  components: { AdminListWrapper, TableButtonGroup, FiltersList },
  setup() {
    const pages: ComputedRef<Page[]> = computed(() => Provider.store.getters['pages/items']);
    const user: ComputedRef<User> = computed(() => Provider.store.getters['auth/user']);

    const load = async (): Promise<void> => {
      if (user.value.role.name !== 'ADMIN' && user.value.roleId) {
        Provider.setFilterModels(PagesFiltersLib.byRole(user.value.roleId));
      }
      Provider.setSortModels(PagesSortsLib.byTitle());
      await Provider.store.dispatch('pages/getAllWithCount', Provider.filterQuery.value);
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

    return { createPagesGroupFilters, load, pages, mounted: Provider.mounted, edit, remove, openPage };
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
