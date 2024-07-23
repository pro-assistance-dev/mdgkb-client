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
import { defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useRouter } from 'vue-router';

import Partner from '@/classes/Partner';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';

export default defineComponent({
  name: 'AdminPartnersList',
  components: { TableButtonGroup },

  setup() {
    const router = useRouter();
    const partners: Partner[] = PartnersStore.Items();
    const mounted: Ref<boolean> = ref(false);

    const edit = (id: string): void => {
      router.push(`/admin/partners/${id}`);
    };
    const create = () => {
      router.push('/admin/partners/new');
    };
    const remove = async (id: string) => {
      await PartnersStore.Remove(id);
    };

    onBeforeMount(async () => {
      await PartnersStore.GetAll();
      PHelp.AdminUI.Head.Set('Наши партнеры', [Button.Success('Добавить', create)]);
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
