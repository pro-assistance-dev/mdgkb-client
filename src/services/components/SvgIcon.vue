<template>
  <component :is="dynamicComponent" />
</template>

<script>
import { defineAsyncComponent } from 'vue';
// import Edit from '@/assets/svg/Edit.svg?component';

export default {
  props: {
    name: {
      type: String,
      required: true,
    },
  },

  computed: {
    dynamicComponent() {
      const name = this.name;

      return defineAsyncComponent(() => import(`../../assets/svg/${name}.svg`));
    },
  },
};
</script>
