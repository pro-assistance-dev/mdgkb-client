<template>
  <div class="load-more">
    <el-button @click="reset">Очистить все фильтры</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'FilterResetButton',
  emits: ['load'],
  setup(props, { emit }) {
    const store = useStore();

    const reset = (trigger: string) => {
      store.commit(`filter/resetQueryFilter`);
      emit('load');
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
