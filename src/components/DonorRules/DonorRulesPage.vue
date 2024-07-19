<template>
  <h1>Правила для доноров</h1>
  <DonorRulesCardList :donor-rules="donorRules" />
</template>

<script lang="ts" setup>
import DonorRule from '@/classes/DonorRule';

const donorRules: DonorRule[] = DonorRulesStore.Items();

onBeforeMount(async () => {
  await DonorRulesStore.GetAll();
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
h1 {
  text-align: center;
}
</style>
