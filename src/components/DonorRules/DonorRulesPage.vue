<template>
  <h1>Правила для доноров</h1>
  <DonorRulesCardList :donor-rules="donorRules" />
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount } from 'vue';
import { useStore } from 'vuex';

import DonorRulesCardList from '@/components/DonorRules/DonorRulesCardList.vue';
import IDonorRule from '@/interfaces/IDonorRule';

export default defineComponent({
  name: 'DonorRulesPage',
  components: { DonorRulesCardList },
  setup() {
    const store = useStore();
    const donorRules: ComputedRef<IDonorRule[]> = computed(() => store.getters['donorRules/donorRules']);

    onBeforeMount(async () => {
      await store.dispatch('donorRules/getAll');
    });

    return {
      donorRules,
    };
  },
});
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
}
</style>
