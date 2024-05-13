<template>
  <h1>Правила для доноров</h1>
  <DonorRulesCardList :donor-rules="donorRules" />
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount } from 'vue';
import { useStore } from 'vuex';

import DonorRule from '@/classes/DonorRule';
import DonorRulesCardList from '@/components/DonorRules/DonorRulesCardList.vue';

export default defineComponent({
  name: 'DonorRulesPage',
  components: { DonorRulesCardList },
  setup() {
    const store = useStore();
    const donorRules: ComputedRef<DonorRule[]> = computed(() => store.getters['donorRules/donorRules']);

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
@import '@/assets/styles/base-style.scss';
h1 {
  text-align: center;
}
</style>
