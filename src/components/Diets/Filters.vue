<template>
  <div
    class="body"
    :style="{
      marginTop: marginTop,
    }"
  >
    <Filter :text="'Доступные'" :background="'#2754EB'" />
    <Filter :text="'Диетические'" :background="'#2754EB'" />
    <Filter :text="'Постные'" :background="'#2754EB'" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import Filter from '@/components/Diets/Filter.vue';

export default defineComponent({
  name: 'Filters',
  components: { Filter },
  props: {
    marginTop: {
      type: String as PropType<string>,
      required: false,
      default: '30px',
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/base-style.scss';

.body {
  display: flex;
  align-items: center;
  justify-content: left;
  height: auto;
}

@media screen and (max-width: 400px) {
  .body {
    justify-content: space-between;
    height: auto;
  }
}
</style>
