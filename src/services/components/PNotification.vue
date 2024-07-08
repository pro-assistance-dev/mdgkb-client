<template>
  <transition name="fade">
    <div v-if="PHelp.Notification.IsVisible()" :class="typeClass">
      <MessageBody :title="PHelp.Notification.GetTitle()" :text="PHelp.Notification.GetText()" />
    </div>
  </transition>
</template>

<script lang="ts" setup>
const typeClass = computed(() => {
  switch (PHelp.Notification.GetType()) {
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
  top: 6px;
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
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: $normal-shadow;
  padding: 20px;
  background: $neutral_background;
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
