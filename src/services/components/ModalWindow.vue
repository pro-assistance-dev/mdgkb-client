<template>
  <el-dialog v-if="show" top="10vh" :model-value="show" :width="width" :show-close="true" :before-close="beforeClose"
    @close="$emit('close')">
    <template #title>
      {{ title }}
    </template>
    <slot />
  </el-dialog>
</template>

<script lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus';
import { v4 as uuidv4 } from 'uuid';
import { computed, defineComponent, onBeforeMount, PropType, Ref, ref, withDirectives } from 'vue';

export default defineComponent({
  name: 'ModalWindow',
  props: {
    showCloseDialog: { type: Boolean as PropType<boolean>, required: false, default: false },
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
      default: '60%',
    },
  },
  emits: ['save', 'close'],

  setup(props, { emit }) {
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

    return {
      close,
      beforeClose,
      form,
      submitForm,
      // representative,
    };
  },
});
</script>

<style lang="scss" scoped>
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
