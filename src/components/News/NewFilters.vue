<template>
  <el-card style="margin-top: 20px">
    <template #header>
      <div class="card-header">
        <span>Фильтры</span>
        <div style="display: flex">
          <el-popover :width="200" :visible="tagListVisible">
            <div class="popover-body">
              <el-tag v-for="tag in filteredTagList" :key="tag.id" class="tag-list-item" @click="addFilterTag(tag)">
                {{ tag.label }}
              </el-tag>
            </div>
            <template #reference>
              <el-button class="tag-link" size="small" icon="el-icon-plus" @click="tagListVisible = !tagListVisible"></el-button>
            </template>
          </el-popover>
          <el-button class="tag-link" size="small" @click="resetFilterTags">Сбросить</el-button>
        </div>
      </div>
    </template>
    <el-tag v-for="tag in filterTags" :key="tag.id" effect="plain" class="tag-link" closable @close="removeFilterTag(tag.id)">
      {{ tag.label }}
    </el-tag>
  </el-card>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import ITag from '@/interfaces/news/ITag';

export default defineComponent({
  name: 'NewsFilters',
  setup() {
    const store = useStore();
    const filterTags = computed(() => store.getters['news/filterTags']);
    const tagList = computed(() => store.getters['tags/items']);
    const filteredTagList = computed(() => store.getters['tags/filteredTagList']);
    const tagListVisible = ref(false);
    const removeFilterTag = async (id: string) => {
      await store.dispatch('news/removeFilterTag', id);
      await store.dispatch('tags/filterTagList', filterTags.value);
    };
    const addFilterTag = async (tag: ITag): Promise<void> => {
      await store.dispatch('news/addFilterTag', tag);
      await store.dispatch('tags/filterTagList', filterTags.value);
    };
    const resetFilterTags = async () => {
      await store.dispatch('news/resetFilterTags');
      await store.dispatch('tags/filterTagList', filterTags.value);
    };
    const loadTagList = async () => {
      await store.dispatch('tags/getAll');
    };
    onMounted(loadTagList);
    return {
      addFilterTag,
      resetFilterTags,
      removeFilterTag,
      filterTags,
      tagList,
      filteredTagList,
      tagListVisible,
    };
  },
});
</script>

<style lang="scss" scoped>
.tag-link {
  margin: 5px;
}
.tag-list-item {
  margin: 3px;
  &:hover {
    color: #ffffff;
    background-color: #409eff;
    cursor: pointer;
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
