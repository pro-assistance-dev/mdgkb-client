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

    const reset = async () => {
      store.commit(`pagination/setCurPage`, 1);
    };

    return {
      reset,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
// @import '@/assets/elements/filterForm.scss';
</style>
