<template>
  <el-table v-if="mounted" :data="specializations">
    <el-table-column label="Код" sortable>
      <template #default="scope">
        {{ scope.row.code }}
      </template>
    </el-table-column>
    <el-table-column label="Название" sortable>
      <template #default="scope">
        {{ scope.row.name }}
      </template>
    </el-table-column>
    <el-table-column width="50" fixed="right" align="center">
      <template #default="scope">
        <TableButtonGroup :show-edit-button="true" :show-remove-button="true" @edit="edit(scope.row.id)" @remove="remove(scope.row.id)" />
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import ISpecialization from '@/interfaces/ISpecialization';

export default defineComponent({
  name: 'AdminSpecializationsList',
  components: { TableButtonGroup },

  setup() {
    const mounted: Ref<boolean> = ref(false);
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const specializations: ComputedRef<ISpecialization[]> = computed<ISpecialization[]>(() => store.getters['specializations/items']);

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      await store.dispatch('specializations/getAll');
      store.commit('admin/setHeaderParams', {
        title: 'Специальности',
        buttons: [{ text: 'Добавить', type: 'primary', action: create }],
      });
      store.commit('pagination/setCurPage', 1);
      store.commit('admin/closeLoading');
      mounted.value = true;
    });

    const create = () => router.push(`${route.path}/new`);
    const remove = async (id: string) => await store.dispatch('specializations/remove', id);
    const edit = (id: string) => router.push(`${route.path}/${id}`);

    return {
      mounted,
      specializations,
      edit,
      remove,
    };
  },
});
</script>
