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

import FormStatusGroup from '@/classes/FormStatusGroup';
import Provider from '@/services/Provider/Provider';
import validate from '@/services/validate';

export default defineComponent({
  name: 'AdminFormStatusGroupDialog',

  setup() {
    const form = ref();
    const formStatusGroup: FormStatusGroup = FormStatusGroupsStore.Item();

    // const showDialog: WritableComputedRef<boolean> = computed({
    //   get(): boolean {
    //     return Provider.store.getters['formStatusGroups/showDialog'];
    //   },
    //   set(value: boolean): void {
    //     Provider.store.commit('formStatusGroups/toggleDialog', value);
    //   },
    // });

    const dialogTitle: ComputedRef<string> = computed(() => Provider.store.getters['formStatusGroups/dialogTitle']);

    const rules = ref({
      name: [{ required: true, message: 'Необходимо указать наименование группы', trigger: 'blur' }],
      code: [{ required: true, message: 'Необходимо указать кодовое имя', trigger: 'blur' }],
    });
    const submit = async () => {
      if (!validate(form)) {
        return;
      }
      if (formStatusGroup.id) {
        await FormStatusGroupsStore.Update();
      } else {
        await FormStatusGroupsStore.Create();
      }
      await FormStatusGroupsStore.GetAll();
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
          }
        });
    };

    return {
      formStatusGroup,
      form,
      rules,
      submit,
      dialogTitle,
      handleClose,
    };
  },
});
</script>
