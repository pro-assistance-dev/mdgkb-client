<template>
  <div class="filter-for-tags">
    <div class="filter-for-tags-title">
      <div class="filter-for-tags-title-child">Фильтры&nbsp;по&nbsp;тэгам</div>
      <div class="filter-for-tags-title-child">
        <PButton skin="profile" text="Сбросить все" width="90px" height="20px" font-size="12px" padding="0 5px" @click="resetFilterTags" />
      </div>
    </div>
    <div class="filter-for-tags-button">
      <div v-for="tag in filteredTagList" :key="tag.id" class="filter-for-tags-button-child">
        <button :class="{ 'filter-button-selected': tag.selected }" class="filter-button" @click="chooseTag(tag)">{{ tag.label }}</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';

import Tag from '@/classes/Tag';
import FilterModel from '@/services/classes/filters/FilterModel';
import NewsFiltersLib from '@/libs/filters/NewsFiltersLib';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'NewsFilters',
  emits: ['load', 'loadNews'],
  setup(_, { emit }) {
    const filterTags = computed(() => Provider.store.getters['news/filterTags']);
    const tagList = computed(() => Provider.store.getters['tags/items']);
    const filteredTagList = computed(() => Provider.store.getters['tags/filteredTagList']);
    const tagListVisible = ref(false);

    let filterModel: FilterModel = NewsFiltersLib.filterByTags([]);
    const removeFilterTag = async () => {
      dropFilterModel();
    };

    const resetFilterTags = async () => {
      dropFilterModel();
      filteredTagList.value.forEach((tag: Tag) => (tag.selected = false));
      await Provider.store.dispatch('news/resetFilterTags');
      emit('loadNews');
    };

    const loadTagList = async () => {
      await Provider.store.dispatch('tags/getAll');
    };

    const dropFilterModel = () => {
      filterModel = NewsFiltersLib.filterByTags([]);
    };

    const chooseTag = async (tag: Tag) => {
      if (!tag.id) {
        return;
      }
      tag.selected = !tag.selected;
      filterModel.addToSet(tag.id);
      if (filterModel.set.length > 0) {
        Provider.setFilterModels(filterModel);
        emit('load');
      } else {
        dropFilterModel();
        emit('loadNews');
      }
    };

    onMounted(loadTagList);
    return {
      chooseTag,
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
@import '@/assets/styles/base-style.scss';
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
    cursor: pointer;
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
    cursor: pointer;
    background-color: #2754eb;
    color: white;
  }

  &-selected {
    color: #ffffff;
    background-color: #2754eb;
  }
}

.radius.radius {
  border: rgba(0, 0, 0, 0.05) solid 1px;
  border-radius: 5;
  background-clip: padding-box;
}
</style>
