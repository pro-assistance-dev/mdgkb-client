<template>
  <div class="header-center">
    <h2>Подготовки к исследованиям</h2>
  </div>
  <el-input v-model="filter" prefix-icon="el-icon-search" placeholder="Найти исследование" size="large" />

  <el-checkbox-group v-model="selectedTags">
    <el-checkbox v-for="tag in tags" :key="tag.id" :label="tag.id"> {{ tag.name }}</el-checkbox>
  </el-checkbox-group>

  <div class="collapse" @change="collapseChangeHandler">
    <div v-for="preparation in preparationsList" :key="preparation.id" @click="openPreparation(preparation.id)">
      <h3 class="collapseHeader">{{ preparation.name }}</h3>
    </div>
  </div>
  <PreparationModal></PreparationModal>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import PreparationModal from '@/components/Preparations/PreparationModal.vue';
import IPreparation from '@/interfaces/IPreparation';
import IPreparationTag from '@/interfaces/IPreparationTag';
import IPreparationToTag from '@/interfaces/IPreparationToTag';

export default defineComponent({
  name: 'PreparationsPage',
  components: { PreparationModal },
  async setup() {
    const filter = ref('');
    const store = useStore();
    const filePath = ref('');
    const preparations: ComputedRef<IPreparation[]> = computed<IPreparation[]>(() => store.getters['preparations/items']);
    const tags: ComputedRef<IPreparationTag[]> = computed<IPreparationTag[]>(() => store.getters['preparations/tags']);
    const selectedTags: Ref<string[]> = ref([]);

    const preparationsList = computed((): IPreparation[] => {
      let list: IPreparation[] = [];
      if (filter.value) {
        list = preparations.value.filter((o: IPreparation) => {
          if (o.name) return o.name.toLowerCase().includes(filter.value.toLowerCase());
        });
      } else {
        list = preparations.value;
      }
      if (selectedTags.value.length > 0) {
        list = list.filter((prep: IPreparation) => {
          return prep.preparationsToTags.some((prepToTag: IPreparationToTag) =>
            selectedTags.value.some((tag: string) => tag === prepToTag.preparationTagId)
          );
        });
      }

      return list;
    });

    const activeName = ref(1);

    onBeforeMount(async () => {
      await store.dispatch('preparations/getAll');
      await store.dispatch('preparations/getAllTags');
    });

    const collapseChangeHandler = () => {
      filter.value = '';
    };

    const openPreparation = (id: string) => store.commit('preparations/openPreparation', id);

    return {
      selectedTags,
      tags,
      openPreparation,
      filePath,
      preparations,
      preparationsList,
      activeName,
      filter,
      collapseChangeHandler,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/collapse.scss';

.collapse {
  margin-top: 10px;
}

.contact-form {
  margin: 20px 100px 20px 10px;
}

.text-center {
  text-align: center;
}
</style>
