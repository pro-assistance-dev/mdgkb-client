<template>
  <ModalWindow :show="modal.visible" @close="close" width="320px">
    <AuthForm @action="$emit('action')" />
  </ModalWindow>
</template>

<script lang="ts" setup>
import Provider from '@/services/Provider/Provider';

const modal: ComputedRef<AuthModal> = computed(() => Provider.store.getters['auth/modal']);
const form: ComputedRef<AuthForm> = computed(() => Provider.store.getters['auth/form']);

const emits = defineEmits(['action']);

const close = () => {
  modal.value.close();
  form.value.reset();
};
</script>

<style scoped lang="scss"></style>
