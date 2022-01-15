<template>
  <el-card class="radius" style="margin-top: 20px" shadow="never">
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
  <div class="filter-for-tags">
    <div class="filter-for-tags-title">
      <div class="filter-for-tags-title-child">Фильтры&nbsp;по&nbsp;тэгам</div>
      <div class="filter-for-tags-title-child"><button class="filter-for-tags-reset">Сбросить&nbsp;все</button></div>
    </div>
    <div class="filter-for-tags-button">
      <div class="filter-for-tags-button-child"><button class="filter-button">Здоровье</button></div>
      <div class="filter-for-tags-button-child"><button class="filter-button">Важное</button></div>
      <div class="filter-for-tags-button-child"><button class="filter-button">Событие</button></div>
      <div class="filter-for-tags-button-child"><button class="filter-button">Мероприятие</button></div>
    </div>
  </div>
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
      await store.dispatch('news/getAll');
      await store.dispatch('tags/filterTagList', filterTags.value);
    };
    const addFilterTag = async (tag: ITag): Promise<void> => {
      await store.dispatch('news/addFilterTag', tag);
      await store.dispatch('news/getAll');
      await store.dispatch('tags/filterTagList', filterTags.value);
    };
    const resetFilterTags = async () => {
      await store.dispatch('news/resetFilterTags');
      await store.dispatch('news/getAll');
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
.filter-for-tags {
  margin-top: 20px;
  background: #ffffff;
  background-clip: padding-box;
  border: rgba(0, 0, 0, 0.05) solid 1px;
  border-radius: 5px;
}

.filter-for-tags-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  border-bottom: #e3e8f0 solid 1px;
}

.filter-for-tags-title-child {
  font-family: roboto;
  font-size: 0.9rem;
  color: #888888;
  display: inline;
  padding: 10px 15px 10px 15px;
}

.filter-for-tags-reset {
  background: #bfbfbf;
  height: 20px;
  border-radius: 10px;
  border: none;
  font-family: roboto;
  font-size: 0.8rem;
  color: #ffffff;
  &:hover {
    background-color: #888888;
  }
}

.filter-for-tags-button {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  padding-left: 15px;
  flex-flow: row wrap;
  padding: 8px 15px 15px 15px;
}

.filter-for-tags-button-child {
  display: flex;
  margin-top: 7px;
}

.filter-button {
  height: 24px;
  background-color: #ffffff;
  font-family: sans-serif;
  font-size: 0.8rem;
  margin-right: 12px;
  padding-right: 10px;
  padding-left: 10px;
  transition: all 0.2s;
  color: #2754eb;
  border: #2754eb solid 1px;
  border-radius: 5px;
  &:hover {
    background-color: #2754eb;
    color: white;
  }
}

.radius.radius {
  border: rgba(0, 0, 0, 0.05) solid 1px;
  border-radius: 5;
  background-clip: padding-box;
}
</style>
