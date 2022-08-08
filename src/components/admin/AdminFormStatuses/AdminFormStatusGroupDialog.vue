<template>
  <el-dialog v-model="showDialog" :title="dialogTitle" :before-close="handleClose">
    <el-form ref="form" :model="formStatusGroup" :rules="rules" label-width="200px">
      <el-form-item prop="name" label="Наименование группы">
        <el-input v-model="formStatusGroup.name" placeholder="Наименование группы"></el-input>
      </el-form-item>
      <el-form-item prop="code" label="Кодовое имя">
        <el-input v-model="formStatusGroup.code" placeholder="Кодовое имя"></el-input>
      </el-form-item>
      <div style="text-align: right">
        <el-button size="small" type="success" @click="submit">Сохранить</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus';
import { computed, ComputedRef, defineComponent, ref, WritableComputedRef } from 'vue';

import IFormStatusGroup from '@/interfaces/IFormStatusGroup';
import validate from '@/mixins/validate';
import Provider from '@/services/Provider';

export default defineComponent({
  name: 'AdminFormStatusGroupDialog',

  setup() {
    const form = ref();
    const formStatusGroup: ComputedRef<IFormStatusGroup> = computed(() => Provider.store.getters['formStatusGroups/item']);
    const showDialog: WritableComputedRef<boolean> = computed({
      get(): boolean {
        return Provider.store.getters['formStatusGroups/showDialog'];
      },
      set(value: boolean): void {
        Provider.store.commit('formStatusGroups/toggleDialog', value);
      },
    });

    const dialogTitle: ComputedRef<string> = computed(() => Provider.store.getters['formStatusGroups/dialogTitle']);

    const rules = ref({
      name: [{ required: true, message: 'Необходимо указать наименование группы', trigger: 'blur' }],
      code: [{ required: true, message: 'Необходимо указать кодовое имя', trigger: 'blur' }],
    });
    const submit = async () => {
      if (!validate(form)) {
        return;
      }
      if (formStatusGroup.value.id) {
        await Provider.store.dispatch('formStatusGroups/update');
      } else {
        await Provider.store.dispatch('formStatusGroups/create');
      }
      await Provider.store.dispatch('formStatusGroups/getAll');
      Provider.store.commit('formStatusGroups/toggleDialog', false);
    };
    const handleClose = () => {
      ElMessageBox.confirm('У вас есть несохранённые изменения', 'Вы уверены, что хотите покинуть страницу?', {
        distinguishCancelAndClose: true,
        confirmButtonText: 'Сохранить',
        cancelButtonText: 'Не сохранять',
      })
        .then(() => {
          // Вызывается при сохранении
          submit();
        })
        .catch((action: string) => {
          if (action === 'cancel') {
            ElMessage({
              type: 'warning',
              message: 'Изменения не были сохранены',
            });
            Provider.store.commit('formStatusGroups/toggleDialog', false);
          }
        });
    };

    return {
      formStatusGroup,
      form,
      rules,
      submit,
      showDialog,
      dialogTitle,
      handleClose,
    };
  },
});
</script>
