<template>
  <button class="ButtonClose">
    <BaseIcon name="x" />
  </button>
</template>

<script>
import BaseIcon from '@/components/Base/BaseIcon.vue';
export default {
  components: {
    BaseIcon,
  },
};
</script>

<style scoped lang="scss">
.ButtonClose {
  outline: none;
  border: none;
  background: none;
  padding-right: 3px;
}
</style>
