<template>
  <el-card style="margin-top: 20px">
    <template #header>
      <div class="card-header">
        <span>Фильтры</span>
        <el-popover :width="200" :visible="tagListVisible">
          <div class="popover-body">
            <el-tag class="tag-list-item" v-for="tag in filteredTagList" :key="tag.id" @click="addFilterTag(tag)">
              {{ tag.label }}
            </el-tag>
          </div>
          <template #reference>
            <el-button class="tag-link" size="small" @click="tagListVisible = !tagListVisible"><i class="el-icon-plus"></i></el-button>
          </template>
        </el-popover>
      </div>
    </template>
    <el-tag effect="plain" class="tag-link" closable v-for="tag in filterTags" :key="tag.id" @close="removeFilterTag(tag.id)">
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
    const loadTagList = async () => {
      await store.dispatch('tags/getAll');
    };
    onMounted(loadTagList);
    return {
      addFilterTag,
      filterTags,
      removeFilterTag,
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
