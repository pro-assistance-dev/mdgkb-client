<template>
  <PModalWindow :show="PHelp.AuthModal.IsVisible()" :closable="PHelp.AuthModal.IsClosable()" @close="close" width="320px" padding="30px">
    <AuthForm @action="$emit('action')" />
  </PModalWindow>
</template>

<script lang="ts" setup>
defineEmits(['action']);

const close = () => {
  PHelp.AuthModal.Close();
  PHelp.AuthForm.Reset();
};
</script>

<style scoped lang="scss"></style>
