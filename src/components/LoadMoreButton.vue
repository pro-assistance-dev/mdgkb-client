<template>
  <div v-if="!allLoaded" class="load-more">
    <el-button @click="$emit('loadMore')">Загрузить ещё</el-button>
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
  margin: 50px 0 50px 0;
  text-align: center;
}
</style>
