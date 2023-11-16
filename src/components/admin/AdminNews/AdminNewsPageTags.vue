<template>
  <el-card>
    <template #header>
      <div class="flex-row-between">
        <span> Тэги </span>
        <el-popover placement="top" :width="160" :visible="tagsVisible">
          <el-input v-model="tag.label" />
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="createTag">Создать</el-button>
            <el-button type="primary" size="mini" @click="tagsVisible = false">Отмена</el-button>
          </div>
          <template #reference>
            <el-button size="small" type="success" icon="el-icon-plus" circle @click="tagsVisible = !tagsVisible"></el-button>
          </template>
        </el-popover>
      </div>
    </template>

    <el-form-item>
      <div class="vertical-wrap">
        <el-checkbox
          v-for="item in tags"
          :key="item.id"
          :checked="findTag(item.id)"
          icon="el-icon-arrow-left"
          :label="item.label"
          border
          @change="chooseTag(item)"
        >
          {{ item.label }}
          <i class="el-icon-close delete-tag-icon" @click.prevent="confirmTagDelete(item.id)"></i>
        </el-checkbox>
      </div>
    </el-form-item>
  </el-card>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { ElMessageBox } from 'element-plus';
import { computed, defineComponent, onMounted, ref } from 'vue';

import Tag from '@/classes/news/Tag';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'AdminNewsPageTags',
  setup() {
    let tagsVisible = ref(false);
    const loadTags = async () => {
      await Provider.store.dispatch('tags/getAll');
    };

    onMounted(loadTags);

    let news = computed(() => Provider.store.getters['news/item']);
    let tags = computed(() => Provider.store.getters['tags/items']);
    let tag = computed(() => Provider.store.getters['tags/item']);

    const createTag = async () => {
      tagsVisible.value = false;
      await Provider.store.dispatch('tags/create', tag.value);
    };

    const chooseTag = (tag: Tag) => {
      news.value.addOrRemoveTag(tag);
    };

    const removeTag = async (tagId: string) => {
      await Provider.store.dispatch('tags/remove', tagId);
    };

    const findTag = (tagId: string): boolean => {
      const tags = Provider.store.getters['news/findTags'];
      const index = tags.findIndex((tag: Tag) => tag.id === tagId);
      return index > -1;
    };

    const confirmTagDelete = (id: string) => {
      ElMessageBox.confirm(
        'Вы уверены, что хотите удалить тэг? Это действие удалит его для уже созданных новостей в том числе',
        'Предупреждение',
        {
          confirmButtonText: 'Да',
          cancelButtonText: 'Отмена',
          type: 'warning',
        }
      )
        .then(async () => {
          await removeTag(id);
          ElMessage({
            type: 'success',
            message: 'Тэг удален',
          });
        })
        .catch(() => {
          ElMessage({
            type: 'warning',
            message: 'Удаление отменено',
          });
        });
    };

    return {
      findTag,
      removeTag,
      chooseTag,
      createTag,
      tags,
      tag,
      tagsVisible,
      confirmTagDelete,
    };
  },
});
</script>

<style lang="scss" scoped>
.el-card {
  margin-bottom: 20px;
}

.vertical-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  :deep(.el-checkbox) {
    padding: 0 10px;
    margin: 5px !important;
  }
}

.delete-tag-icon {
  margin-left: 0 5px;
  transition: all 0.1s;

  &:hover {
    font-weight: bold;
    transform: scale(1.1);
    color: red;
    // margin-bottom: 10px;
  }
}
.flex-row-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
