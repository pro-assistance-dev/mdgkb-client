<template>
  <FiltersWrapper>
    <template #header-left-top> </template>
    <template #footer>
      <SortList :max-width="400" show-label @load="$emit('load')" />
    </template>
  </FiltersWrapper>
</template>

<script lang="ts" setup>
defineEmits(['load']);
</script>
