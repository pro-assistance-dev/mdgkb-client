<template>
  <div v-if="Message.IsVisible()" class="message" :style="{
    background: Message.GetType() === 'success' ? '#C7ECEA' : '#ECC7C7',
    marginTop: '100px',
  }">
    <div class="message-title">
      <StringItem :string="Message.GetTitle()" />
    </div>
    <div class="message-text">
      <StringItem :string="Message.GetText()" />
    </div>
  </div>
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
  margin: 0 auto;
  border-radius: 5px;
  box-sizing: border-box;
  border: 1px solid $base-font-color;
  min-height: 50px;
  max-width: 300px;
  transition: 0.3s;
}

.message-title {}

.message-text {}
</style>
