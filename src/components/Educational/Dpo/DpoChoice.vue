<template>
    <el-form>
        <el-select v-model="value" class="m-2" placeholder="Выберите раздел">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
        </el-select>
    </el-form>
</template>

<script lang="ts">
import {defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'DpoChoice',

  setup() {
    const value = ref('');

    const options = [
      {
        value: "dpo",
        label: "Программы ДПО",
      },
      {
        value: "npo",
        label: "Программы НПО",
      },
      {
        value: "docRegulatory",
        label: "Нормативные документы",
      },
      {
        value: "docTraining",
        label: "Документы для обучения",
      },
      {
        value: "info",
        label: "Информация",
      },
    ];

      return { options };
  },
});
</script>

<style lang="scss" scoped>

:deep(.el-form-item__content) {
  width: 100%;
}

:deep(.el-input__inner) {
  border-radius: 5px;
  padding-left: 25px;
  height: 34px;
  width: 100%;
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 15px;
  background: #2754eb;
}

:deep(.el-input__inner::placeholder) {
  color: #ffffff;
}

:deep(.el-select .el-input .el-select__caret) {
  color: #ffffff;
  font-size: 15px;
  font-weight: bold;
  margin-right: 5px;
}

.el-select {
  width: 100%;
}

:deep(.el-input__prefix) {
  left: 230px;
  top: -3px;
}

:deep(.el-date-editor.el-input, .el-date-editor.el-input__inner) {
  width: 100%;
}

:deep(.el-input__icon) {
  color: #ffffff;
}

:deep(.el-input__suffix) {
  top: -2px;
}

</style>