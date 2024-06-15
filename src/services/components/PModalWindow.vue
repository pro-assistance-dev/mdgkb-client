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
import { ElMessage, ElMessageBox } from 'element-plus';
import { v4 as uuidv4 } from 'uuid';
import IconClose from '@/services/components/Icons/IconClose.vue';

const props = defineProps({
  showCloseDialog: { type: Boolean as PropType<boolean>, required: false, default: false },
  closable: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
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

const emits = defineEmits(['save', 'close']);

const form = ref();
// const representative: Ref<Representative> = computed(() => Provider.store.getters['representatives/item']);

const submitForm = async (): Promise<void> => {
  // saveButtonClick.value = true;
  // if (!validate(form.value)) {
  //   return;
  // }
  // representative.value.id = uuidv4();
  // await emit('save', representative.value);
  // ElNotification.error(new MessageSuccess());
};

const beforeClose = (done: () => void) => {
  if (props.showCloseDialog) {
    ElMessageBox.confirm('У вас есть несохранённые изменения', 'Вы уверены, что хотите закрыть окно?', {
      distinguishCancelAndClose: true,
      confirmButtonText: 'Закрыть',
      cancelButtonText: 'Не закрывать',
    })
      .then(() => {
        // Вызывается при сохранении
        ElMessage({
          type: 'warning',
          message: 'Данные не были сохранёны',
        });
        done();
      })
      .catch(() => null);
  } else {
    done();
  }
};

const close = () => {
  if (!props.closable) {
    return;
  }
  ElMessageBox.confirm('У вас есть несохранённые изменения', 'Вы уверены, что хотите закрыть окно?', {
    distinguishCancelAndClose: true,
    confirmButtonText: 'Закрыть',
    cancelButtonText: 'Отмена',
  })
    .then(() => {
      ElMessage({
        type: 'warning',
        message: 'Данные не были сохранёны',
      });
      emit('close');
    })
    .catch(() => null);
};
</script>

<style lang="scss" scoped>
@import '@/services/assets/style/index.scss';

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
}

.modal-w {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1001;
  border-radius: 5px;
  overflow: hidden;
  max-height: 70vh;
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
