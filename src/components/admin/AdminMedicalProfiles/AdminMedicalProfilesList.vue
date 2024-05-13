<template>
  <div class="flex-column">
    <!-- <div class="flex-row-between"> -->
    <!-- <el-button type="primary" @click="$router.push('/admin/pages/new')">Добавить страницу</el-button> -->
    <!--      <el-pagination background layout="prev, pager, next" :total="100"> </el-pagination>-->
    <!-- </div> -->
    <el-card>
      <el-table v-if="pages" :data="pages">
        <el-table-column prop="name" label="Заголовок" sortable> </el-table-column>
        <el-table-column width="50" fixed="right" align="center">
          <template #default="scope">
            <TableButtonGroup
              :show-more-button="true"
              :show-edit-button="true"
              :show-remove-button="true"
              @edit="edit(scope.row.id)"
              @remove="remove(scope.row.id)"
              @showMore="$router.push(scope.row.getLink())"
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

import News from '@/classes/News';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';

export default defineComponent({
  name: 'AdminMedicalProfilesList',
  components: { TableButtonGroup },
  setup() {
    const store = useStore();
    const router = useRouter();
    const pages = computed(() => store.getters['medicalProfiles/items']);

    const loadNews = async (): Promise<void> => {
      await store.dispatch('medicalProfiles/getAll');
      store.commit('admin/setHeaderParams', {
        title: 'Медицинские профили',
        buttons: [{ text: 'Добавить', type: 'primary', action: create }],
      });
    };

    const edit = async (id: string): Promise<void> => {
      const item = pages.value.find((i: News) => i.id === id);
      if (item) {
        await router.push(`/admin/medical-profiles/${item.id}`);
      }
    };

    const remove = async (id: string) => {
      await store.dispatch('medicalProfile/remove', id);
    };

    const create = () => {
      router.push('/admin/medical-profiles/new');
    };

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      await loadNews();
      store.commit('admin/closeLoading');
    });

    return { pages, edit, remove };
  },
});
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
