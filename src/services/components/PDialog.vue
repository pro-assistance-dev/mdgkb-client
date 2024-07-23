<template>
  <transition name="fade">
    <div v-if="PHelp.Dialog.IsVisible()" :class="typeClass">
      <MessageBody :title="PHelp.Dialog.GetTitle()" :text="PHelp.Dialog.GetText()" />
      <div class="footer">
        <PButton type="primary" :text="PHelp.Dialog.GetConfirmButtonText()" margin="10px 0 0 0" @click="PHelp.Dialog.Submit()" />
        <PButton type="warning" :text="PHelp.Dialog.GetCancelButtonText()" margin="10px 0 0 0" @click="PHelp.Dialog.Cancel()" />
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
const typeClass = computed(() => {
  switch (PHelp.Dialog.GetType()) {
    case 'info':
      return 'message primary';
    case 'success':
      return 'message success';
    case 'warning':
      return 'message warning';
    case 'error':
      return 'message danger';
    default:
      return 'message neutral';
  }
});
</script>
<style lang="scss" scoped>
@import '@/services/assets/style/index.scss';

.message {
  position: fixed;
  top: 0px;
  left: 50%;
  z-index: 9999;
  transform: translateX(-50%);
  width: 300px;
  margin: 100px auto 0 auto;
  border-radius: 5px;
  box-sizing: border-box;
  border: 1px solid $base-font-color;
  min-height: 50px;
  max-width: 300px;
  transition: 0.3s;
  justify-content: center;
  align-items: center;
  box-shadow: $normal-shadow;
  padding: 20px;
}

.primary {
  background: $primary_background;
}
.success {
  background: $success_background;
}
.warning {
  background: $warning_background;
}
.danger {
  background: $danger_background;
}
.neutral {
  background: $neutral_background;
}

.message-title {
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  margin: auto;
}

.message-text {
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  margin: auto;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
