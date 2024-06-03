<template>
  <transition name="fade">
    <div v-if="Message.IsVisible()" class="message" :style="{
      background: Message.GetType() === 'success' ? '#C7ECEA' : '#ECC7C7',
      marginTop: '100px',
      position: fixed,
    }">
      <div>
        <div class="message-title">
          <StringItem :string="Message.GetTitle()" />
        </div>
        <div class="message-text">
          <StringItem :string="Message.GetText()" />
        </div>
        <div class="message-footer" v-if="Message.IsDialog()">
          <PButton :text="Message.GetConfirmButtonText()" @click="Message.Confirm()" />
          <PButton :text="Message.GetCancelButtonText()" @click="Message.Hide()" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import StringItem from '@/services/components/StringItem.vue';
import Message from '@/services/Message';

</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';

.message {
  position: absolute;
  top: 6px;
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
  display: flex;
  justify-content: center;
  align-items: center;
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
