<template>
  <path fill-rule="evenodd" clip-rule="evenodd" :d="svgCode" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HelpProfileIcon',
  props: {
    svgCode: {
      type: String,
      required: true,
    },
  },
});
</script>
