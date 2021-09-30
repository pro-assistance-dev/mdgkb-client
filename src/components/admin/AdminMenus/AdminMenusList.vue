<template>
  <div class="flex-column">
    <div class="flex-row-between">
      <el-button type="primary" @click="create">Создать меню</el-button>
      <!--      <el-pagination background layout="prev, pager, next" :total="100"> </el-pagination>-->
    </div>
    <el-card>
      <el-table v-if="menus" :data="menus">
        <el-table-column prop="name" label="Заголовок" sortable> </el-table-column>
        <el-table-column prop="link" label="Ссылка" sortable> </el-table-column>
        <el-table-column width="40" fixed="right" align="center">
          <template #default="scope">
            <TableButtonGroup
              :show-edit-button="true"
              :show-remove-button="true"
              @edit="$router.push(`/admin/menus/${scope.row.id}`)"
              @remove="remove(scope.row.id)"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <div class="flex-row-end">
      <!--      <el-pagination background layout="prev, pager, next" :total="100"> </el-pagination>-->
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';

export default defineComponent({
  name: 'AdminMenusList',
  components: { TableButtonGroup },
  setup() {
    const store = useStore();
    const router = useRouter();

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      await store.dispatch('menus/getAll');
      store.commit('admin/setPageTitle', { title: 'Меню' });
    });

    const menus = computed(() => store.getters['menus/menus']);

    const remove = async (id: string) => {
      await store.dispatch('menus/remove', id);
    };

    const create = () => router.push(`/admin/menus/new`);

    return { menus, remove, create };
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
