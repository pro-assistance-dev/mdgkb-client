<template>
  <transition name="fade">
    <div v-if="PHelp.Dialog().IsVisible()" class="message" :style="{
      background: PHelp.Dialog().GetType() === 'success' ? '#C7ECEA' : '#ECC7C7',
      marginTop: '100px',
    }">
      <MessageBody :title="PHelp.Dialog().GetTitle()" :text="PHelp.Dialog().GetText()" />
      <div class="footer">
        <PButton type="primary" @click="PHelp.Dialog().Submit()" :text="PHelp.Dialog().GetConfirmButtonText()" margin="10px 0 0 0" />
        <PButton type="warning" @click="PHelp.Dialog().Cancel()" :text="PHelp.Dialog().GetCancelButtonText()" margin="10px 0 0 0"/>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import StringItem from '@/services/components/StringItem.vue';
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
  margin: auto;
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
