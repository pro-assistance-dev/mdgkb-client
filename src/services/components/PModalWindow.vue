<template>
  <div v-if="show" class="blur" @click="close" />
  <div
    v-if="show"
    class="modal-w"
    :style="{
      maxWidth: width,
      width: width,
      margin: margin,
      padding: padding,
      top: top,
    }"
  >
    <div v-if="closable" class="icon-box" @click="$emit('close')">
      <IconClose hover-color="#5E6CE7" size="20px" />
    </div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import IconClose from '@/services/components/Icons/IconClose.vue';

const props = defineProps({
  showCloseDialog: { type: Boolean as PropType<boolean>, required: false, default: false },
  closable: { type: Boolean as PropType<boolean>, required: false, default: false },
  show: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  title: {
    type: String as PropType<string>,
    default: '',
  },
  width: {
    type: String as PropType<string>,
    default: '760px',
  },
  margin: {
    type: String as PropType<string>,
    default: 'auto',
  },
  top: {
    type: String as PropType<string>,
    default: '20vh',
  },
  padding: {
    type: String as PropType<string>,
    default: '0',
  },
  showClose: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
});
const emit = defineEmits(['save', 'close']);

const close = () => {
  if (!props.closable) {
    return;
  }
  emit('close');
};
</script>

<style lang="scss" scoped>
@import '@//services/assets/style/utils/variables/colors.scss';

.blur {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000000;
  opacity: 0.3;
  z-index: 1000;
}

.icon-box {
  position: absolute;
  top: 10px;
  right: 10px;
  &:hover {
    cursor: pointer;
  }
}

.modal-w {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1001;
  border-radius: 5px;
  overflow: hidden;
  max-height: 70vh;
  background: $main-white;
}

.base-title {
  margin: 0 auto;
  padding: 55px 0 20px 0;
  color: #5f6a99;
  font-size: 28px;
  font-family: Gilroy, Arial, Helvetica, sans-serif;
  border-bottom: 1px solid #e3e7fb;
}

.dialog-header {
  display: flex;
  justify-content: space-between;
}

.modal-wrapper {
  width: 100%;
  height: 100%;
}

:deep(.el-dialog) {
  position: relative;
  background-color: #eef1f6;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 10px;
  z-index: 10000;
}

:deep(.el-dialog__body) {
  padding: 10px;
  overflow: auto;
}

:deep(.el-dialog__header) {
  padding-top: 0;
  font-size: 20px;
}
</style>
