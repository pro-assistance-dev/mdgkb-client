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
          v-for="tag in tags"
          :key="tag.id"
          :checked="findTag(tag.id)"
          icon="el-icon-arrow-left"
          :label="tag.label"
          border
          @change="chooseTag(tag)"
        >
          {{ tag.label }}
          <!-- <el-popconfirm
                                          confirmButtonText="Да"
                                          cancelButtonText="Отмена"
                                          icon="el-icon-info"
                                          iconColor="red"
                                          title="Вы уверены, что хотите удалить тэг? Это действие удалит его на созданных новостях в том числе"
                                          @confirm="removeTag(tag.id)"
                                          @cancel="() => {}"
                                        >
                                          <template #reference> -->
          <i class="el-icon-close delete-tag-icon" @click.prevent="confirmTagDelete(tag.id)"></i>
          <!-- </template>
                                        </el-popconfirm> -->
        </el-checkbox>
      </div>
    </el-form-item>
  </el-card>
</template>

<script lang="ts">
import '@vueup/vue-quill/dist/vue-quill.snow.css';

import { ElMessage } from 'element-plus';
import { ElMessageBox } from 'element-plus';
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useStore } from 'vuex';

import ITag from '@/interfaces/news/ITag';

export default defineComponent({
  name: 'AdminNewsPageTags',
  setup() {
    const store = useStore();
    let tagsVisible = ref(false);
    const loadTags = async () => {
      await store.dispatch('tags/getAll');
    };

    onMounted(loadTags);

    let tags = computed(() => store.getters['tags/items']);
    let tag = computed(() => store.getters['tags/item']);

    const createTag = async () => {
      tagsVisible.value = false;
      await store.dispatch('tags/create', tag.value);
    };

    const chooseTag = (tag: ITag) => {
      store.commit('news/chooseTag', tag);
    };

    const removeTag = async (tagId: string) => {
      await store.dispatch('tags/remove', tagId);
    };

    const findTag = (tagId: string): boolean => {
      const tags = store.getters['news/findTags'];
      const index = tags.findIndex((tag: ITag) => tag.id === tagId);
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

  .el-checkbox {
    margin: 5px !important;
  }
}

.delete-tag-icon {
  margin-left: 20%;
  transition: all 0.1s;

  &:hover {
    font-weight: bold;
    margin-bottom: 10px;
  }
}

.flex-row-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
