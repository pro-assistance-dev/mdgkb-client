<template>
  <div class="modal-field" tabindex="-1" @click.self="close" @keydown.esc="close">
    <div class="modal-box">
      <el-form ref="form" label-width="160px" :model="dishSample" class="modal-callback" :rules="rules">
        <el-form-item label="Название блюда:" prop="name">
          <el-input v-model="dishSample.name" placeholder="Введите название"></el-input>
        </el-form-item>
        <el-form-item label="Калорийность, ккал:" prop="caloric">
          <el-input-number v-model="dishSample.caloric" placeholder="Калории"></el-input-number>
        </el-form-item>
        <el-form-item label="Выход, грамм" prop="weight">
          <el-input-number v-model="dishSample.weight" placeholder="0"></el-input-number>
        </el-form-item>
        <el-form-item label="Цена:" prop="price">
          <el-input-number v-model="dishSample.price" placeholder="0"></el-input-number>
        </el-form-item>
        <el-form-item label="Категория:" prop="dishesGroupId">
          <el-select v-model="dishSample.dishesGroupId" filterable placeholder=" " style="width: 365px">
            <el-option v-for="item in dishesGroups" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="Изображение:" prop="image">
          <UploaderSingleScan :file-info="dishSample.image" :height="200" :width="200" @remove-file="dishSample.removeImage()" />
        </el-form-item>
        <div class="button-field">
          <button class="button-cancel" @click.prevent="close">Отмена</button>
          <button class="button-save" @click.prevent="saveDishSample">Сохранить</button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus';
import { computed, defineComponent, Ref, ref, watch } from 'vue';

import UploaderSingleScan from '@/components/UploaderSingleScan.vue';
import IDishesGroup from '@/interfaces/IDishesGroup';
import IDishSample from '@/interfaces/IDishSample';
import Provider from '@/services/Provider';
import validate from '@/services/validate';

export default defineComponent({
  name: 'AddForm',
  components: { UploaderSingleScan },
  props: {
    closeFunction: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const dishesGroups: Ref<IDishesGroup[]> = computed(() => Provider.store.getters['dishesGroups/items']);
    const dishSample: Ref<IDishSample> = computed(() => Provider.store.getters['dishesSamples/item']);
    const confirmLeave: Ref<boolean> = ref(false);
    const form = ref();
    const rules = ref({
      name: [{ required: true, message: 'Необходимо указать название блюда', trigger: 'blur' }],
      caloric: [{ required: true, message: 'Необходимо указать калорийность', trigger: 'change' }],
      weight: [{ required: true, message: 'Необходимо указать выход', trigger: 'change' }],
      price: [{ required: true, message: 'Необходимо указать цену', trigger: 'change' }],
      dishesGroupId: [{ required: true, message: 'Необходимо выбрать категорию', trigger: 'change' }],
    });

    watch(dishSample, () => (confirmLeave.value = true), { deep: true });

    const close = () => {
      if (confirmLeave.value) {
        ElMessageBox.confirm('У вас есть несохранённые изменения', {
          distinguishCancelAndClose: true,
          confirmButtonText: 'Сохранить',
          cancelButtonText: 'Не сохранять',
        })
          .then(async () => {
            await saveDishSample();
          })
          .catch((action: string) => {
            if (action === 'cancel') {
              ElMessage({
                type: 'warning',
                message: 'Изменения не были сохранены',
              });
              Provider.store.commit('dishesSamples/resetItem');
              props.closeFunction();
            }
          });
      } else {
        Provider.store.commit('dishesSamples/resetItem');
        props.closeFunction();
      }
    };

    const saveDishSample = async () => {
      if (!validate(form)) {
        console.log('validate');
        return;
      }
      if (dishSample.value.id) {
        await Provider.store.dispatch('dishesSamples/update');
      } else {
        await Provider.store.dispatch('dishesSamples/create');
      }
      const dishesGroup = dishesGroups.value.find((d: IDishesGroup) => d.id === dishSample.value.dishesGroupId);
      if (dishesGroup) {
        dishesGroup.upsertSample(dishSample.value);
      }
      Provider.store.commit('dishesSamples/resetItem');
      props.closeFunction();
    };

    return {
      close,
      saveDishSample,
      dishesGroups,
      dishSample,
      form,
      rules,
    };
  },
});
</script>

<style scoped lang="scss">
* {
  padding: 0px;
  margin: 0px;
}

.modal-field {
  width: 100%;
  height: 100%;
}

.modal-box {
  background: #ffffff;
  border: 1px solid #dcdfe6;
  border-radius: 5px;
  position: absolute;
  top: 2%;
  transform: translateX(-50%);
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 5px;
  z-index: 101;
  left: 50%;
  transform: translateX(-50%);
  width: 560px;
  padding-top: 20px;
}

.button-field {
  display: flex;
  justify-content: right;
  margin-top: 15px;
}

.modal-callback {
  padding: 20px;
  padding-top: 0;
  height: auto;
}

.form-callback {
  margin: 20px;
  padding-top: 5px;
}

.modal-callback-title {
  font-family: 'Comfortaa', 'Open-sans', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #4a4a4a;
  font-weight: normal;
}

.field-name {
  font-family: 'Comfortaa', 'Open-sans', sans-serif;
  color: #4a4a4a;
  font-weight: normal;
}

.phone-name {
  font-family: 'Comfortaa', 'Open-sans', sans-serif;
  color: #4a4a4a;
  font-weight: normal;
}

.send {
  display: flex;
  justify-content: center;
}

.field-text {
  display: flex;
  justify-content: center;
  font-size: 14px;
  font-family: 'Comfortaa', 'Open-sans', sans-serif;
  color: #9d9d9d;
  font-weight: normal;
}

.sr-only {
  position: absolute;
  white-space: nowrap;
  width: 1px;
  height: 1px;
  overflow: hidden;
  border: 0;
  padding: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  margin: -1px;
}
:deep(.el-notification) {
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
}

.new-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  margin-bottom: 10px;
}

.new-group-title {
  font-size: 14px;
  color: #838385;
  display: flex;
  justify-content: left;
  align-items: center;
}

.button-save {
  height: 30px;
  border: 1px solid #449d7c;
  border-radius: 15px;
  background: #d6ecf4;
  color: #449d7c;
  padding: 0 15px;
  transition: 0.3s;
}

.button-save:hover {
  background: #449d7c;
  color: #ffffff;
}

.button-cancel {
  height: 30px;
  border: 1px solid #1979cf;
  border-radius: 15px;
  background: #d6ecf4;
  color: #1979cf;
  margin-right: 10px;
  padding: 0 15px;
  transition: 0.3s;
}

.button-cancel:hover {
  background: #1979cf;
  color: #ffffff;
}

:deep(.el-input-number) {
  width: 100%;
}

:deep(.el-form-item__content) {
  width: 100%;
}

:deep(.el-input__inner) {
  border-radius: 40px;
  padding-left: 25px;
  height: 30px;
  width: 100%;
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 15px;
  color: #4a4a4a;
}

:deep(.el-select .el-input .el-select__caret) {
  color: #4a4a4a;
  font-size: 15px;
  font-weight: bold;
  margin-right: -2px;
}

.el-select {
  width: 100%;
}

:deep(.el-date-editor.el-input, .el-date-editor.el-input__inner) {
  width: 100%;
}

:deep(.el-input__icon) {
  color: #343e5c;
}

:deep(.el-input__suffix) {
  top: -4px;
}

:deep(.el-form-item__label) {
  color: #a3a9be;
  padding: 0 !important;
  margin-left: 5px;
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: left;
}

:deep(.el-input-number__increase) {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
}

:deep(.el-input-number__decrease) {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
}

:deep(.el-form-item) {
  margin-bottom: 18px !important;
}

:deep(.el-form-item__error) {
  padding-top: 0;
}
</style>
