<template>
  <PModalWindow :show="modal.visible" :closable="modal.closable" @close="close" width="320px" padding="30px">
    <AuthForm @action="$emit('action')" />
  </PModalWindow>
</template>

<script lang="ts" setup>
const modal: ComputedRef<AuthModal> = Store.Getters('auth/modal');
const form: ComputedRef<AuthForm> = Store.Getters('auth/form');

defineEmits(['action']);

const close = () => {
  modal.value.close();
  form.value.reset();
};
</script>

<style scoped lang="scss"></style>
