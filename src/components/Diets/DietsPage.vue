<template>
  <PageWrapper v-if="mounted" :title="title">
    <template #filters>
      <DietsFilter @load="loadDiets" />
    </template>
    <DietsMenuList />
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import DietsFilter from '@/components/Diets/DietsFilter.vue';
import DietsMenuList from '@/components/Diets/DietsMenuList.vue';
import PageWrapper from '@/components/PageWrapper.vue';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';

export default defineComponent({
  name: 'DietsPage',
  components: { DietsFilter, DietsMenuList, PageWrapper },

  setup() {
    const load = async () => {
      await loadDiets();
    };

    Hooks.onBeforeMount(load);

    const loadDiets = async () => {
      await Provider.store.dispatch('diets/getAll', Provider.filterQuery.value);
    };

    return {
      mounted: Provider.mounted,
    };
  },
});
</script>

<style scoped lang="scss"></style>
