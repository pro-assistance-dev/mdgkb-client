<template>
  <transition name="fade">
    <div v-if="PHelp.Notification().IsVisible()" class="message" :style="{
      background: PHelp.Notification().GetType() === 'success' ? '#C7ECEA' : '#ECC7C7',
    }">
      <MessageBody :title="PHelp.Notification().GetTitle()" :text="PHelp.Notification().GetText()" />
    </div>
  </transition>
</template>

<script lang="ts" setup>
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
