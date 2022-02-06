<template>
  <el-button icon="el-icon-brush" class="table-button" @click="reset"></el-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'FilterResetButton',
  setup() {
    const store = useStore();
    const storeModule: string = store.getters['filter/storeModule'];
    const storeAction: string = store.getters['filter/storeAction'];

    const reset = async () => {
      store.commit('filter/setOffset', 0);
      store.commit(`pagination/setCurPage`, 1);
      store.commit(`filter/resetQueryFilter`);
      await store.dispatch(`${storeModule}/${storeAction}`, store.getters['filter/filterQuery']);
    };

    return {
      reset,
    };
  },
});
</script>

<style lang="scss" scoped>
// @import '@/assets/elements/filterForm.scss';
</style>
