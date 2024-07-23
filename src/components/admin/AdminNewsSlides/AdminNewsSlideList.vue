<template>
  <div class="flex-column">
    <el-card>
      <el-table v-if="slides" :data="slides">
        <el-table-column v-if="isEdit" width="50" fixed="left" align="center">
          <template #default="scope">
            <TableMover :store-module="'newsSlides'" :store-getter="'items'" :index="scope.$index" />
          </template>
        </el-table-column>
        <el-table-column label="Название" sortable>
          <template #default="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Кнопки" sortable>
          <template #default="scope">
            <span v-for="(item, i) in scope.row.newsSlideButtons" :key="item.id">
              {{ i + 1 === scope.row.newsSlideButtons.length ? item.name : `${item.name}, ` }}
            </span>
          </template>
        </el-table-column>
        <el-table-column width="50" fixed="right" align="center">
          <template #default="scope">
            <TableButtonGroup
              :show-edit-button="true"
              :show-remove-button="true"
              @remove="remove(scope.row.id)"
              @edit="edit(scope.row.id)"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useRouter } from 'vue-router';

import NewsSlide from '@/classes/NewsSlide';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import TableMover from '@/components/admin/TableMover.vue';

export default defineComponent({
  name: 'AdminNewsSlideList',
  components: { TableMover, TableButtonGroup },

  setup() {
    const router = useRouter();
    const isEdit: Ref<boolean> = ref(false);
    const isNotEdit: Ref<boolean> = ref(true);
    const slides: NewsSlide[] = NewsSlidesStore.Items();

    const create = (): void => {
      router.push('/admin/news-slides/new');
    };
    const remove = async (id: string): Promise<void> => {
      await NewsSlidesStore.Remove(id);
    };
    const edit = (id: string): void => {
      router.push(`/admin/news-slides/${id}`);
    };

    const editOrder = () => {
      isEdit.value = true;
      isNotEdit.value = false;
    };

    const saveOrder = async () => {
      await NewsSlidesStore.UpdateMany();
      isEdit.value = false;
      isNotEdit.value = true;
    };

    onBeforeMount(async () => {
      await NewsSlidesStore.GetAll();
    });

    return {
      slides,
      create,
      remove,
      edit,
      isEdit,
      editOrder,
      saveOrder,
    };
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
