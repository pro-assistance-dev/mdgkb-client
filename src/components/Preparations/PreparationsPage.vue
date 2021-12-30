<template>
  <div class="header-center">
    <h2>Подготовки к исследованиям</h2>
  </div>
  <el-input v-model="filter" prefix-icon="el-icon-search" placeholder="Найти исследование" size="large" />
  <div class="collapse" accordion @change="collapseChangeHandler">
    <div v-for="preparation in preparationsList" :key="preparation.id" @click="openPreparation(preparation.id)">
      <h3 class="collapseHeader">{{ preparation.name }}</h3>
    </div>
  </div>
  <PreparationModal></PreparationModal>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, ref } from 'vue';
import { useStore } from 'vuex';

import PreparationModal from '@/components/Preparations/PreparationModal.vue';
import IPreparation from '@/interfaces/IPreparation';

export default defineComponent({
  name: 'PreparationsPage',
  components: { PreparationModal },
  async setup() {
    const filter = ref('');
    const store = useStore();
    const filePath = ref('');
    const preparations: ComputedRef<IPreparation[]> = computed<IPreparation[]>(() => store.getters['preparations/items']);

    const preparationsList = computed((): IPreparation[] => {
      if (filter.value) {
        return preparations.value.filter((o: IPreparation) => {
          if (o.name) return o.name.toLowerCase().includes(filter.value.toLowerCase());
        });
      } else {
        return preparations.value;
      }
    });

    const activeName = ref(1);

    onBeforeMount(async () => {
      await store.dispatch('preparations/getAll');
    });

    const collapseChangeHandler = () => {
      filter.value = '';
    };

    const openPreparation = (id: string) => store.commit('preparations/openPreparation', id);

    return {
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
