<template>
  <h3 style="text-align: center; margin: 0">Профиль</h3>
  <el-button @click="save">Сохранить</el-button>
</template>

<script lang="ts">
const save = async () => {
  await UsersStore.Update();
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
</style>
