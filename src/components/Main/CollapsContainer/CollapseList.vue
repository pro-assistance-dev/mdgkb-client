<template>
  <div>
    <slot :activeId="activeId" :changeActiveId="changeActiveId" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'CollapseList',

  setup() {
    const activeId = ref(0);
    const changeActiveId = (id: number) => {
      activeId.value = id;
    };

    return {
      changeActiveId,
      activeId,
    };
  },
});
</script>
