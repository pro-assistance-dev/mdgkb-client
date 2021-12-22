<template>
  <el-card v-if="mounted">
    <el-table :data="partners">
      <el-table-column label="Наименование">
        <template #default="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Тип">
        <template #default="scope">
          <span>{{ scope.row.partnerType.name }}</span>
        </template>
      </el-table-column>
      <el-table-column width="50" fixed="right" align="center">
        <template #default="scope">
          <TableButtonGroup :show-edit-button="true" :show-remove-button="true" @remove="remove(scope.row.id)" @edit="edit(scope.row.id)" />
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import IPartner from '@/interfaces/partners/IPartner';

export default defineComponent({
  name: 'AdminPartnersList',
  components: { TableButtonGroup },

  setup() {
    const store = useStore();
    const router = useRouter();
    const partners: ComputedRef<IPartner[]> = computed(() => store.getters['partners/items']);
    const mounted: Ref<boolean> = ref(false);

    const edit = (id: string): void => {
      router.push(`/admin/partners/${id}`);
    };
    const create = () => {
      router.push('/admin/partners/new');
    };
    const remove = (id: string) => {
      store.dispatch('partners/remove', id);
    };

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      await store.dispatch('partners/getAll');
      store.commit('admin/setHeaderParams', {
        title: 'Наши партнеры',
        buttons: [{ text: 'Добавить', type: 'primary', action: create }],
      });
      mounted.value = true;
      store.commit('admin/closeLoading');
    });

    return {
      mounted,
      partners,
      edit,
      remove,
    };
  },
});
</script>
