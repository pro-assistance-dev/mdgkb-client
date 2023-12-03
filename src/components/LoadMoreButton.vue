<template>
  <div v-if="!allLoaded" class="load-more">
    <el-button round @click="$emit('loadMore')"> {{ text }}</el-button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';

import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'LoadMoreButton',
  props: {
    loading: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  emits: ['loadMore'],
  setup(props) {
    const allLoaded = computed(() => Provider.store.getters[`filter/allLoaded`]);
    const text = computed(() => (props.loading ? 'Загрузка...' : 'Показать ещё'));
    return {
      text,
      allLoaded,
    };
  },
});
</script>

<style scoped lang="scss">
.load-more {
  margin: 20px 0;
  text-align: center;
}
:deep(.el-button) {
  letter-spacing: 1.1px;
  background-color: inherit;
  color: #133dcc;
  border-color: #133dcc;
}

:deep(.el-button:hover) {
  background-color: #133dcc;
  color: white;
  border-color: white;
}
</style>
