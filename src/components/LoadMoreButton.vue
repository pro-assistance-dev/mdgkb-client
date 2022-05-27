<template>
  <div v-if="!allLoaded" class="load-more">
    <el-button round @click="$emit('loadMore')">Показать еще</el-button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'LoadMoreButton',
  emits: ['loadMore'],
  setup(props) {
    const store = useStore();

    const allLoaded = computed(() => store.getters[`filter/allLoaded`]);

    return {
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
