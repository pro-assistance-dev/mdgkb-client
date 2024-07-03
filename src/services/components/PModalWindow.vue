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

const escapeHandler = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    close();
  }
};
onMounted(() => {
  document.body.addEventListener('keydown', escapeHandler);
});
onBeforeUnmount(() => {
  document.body.removeEventListener('keydown', escapeHandler);
});
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
  min-height: 40px;
}
</style>
