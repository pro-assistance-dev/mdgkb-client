<template>
  <el-form ref="form" style="width: 100%">
    <InfoItem
      title="Название"
      :show-save-dialog="showSaveDialog"
      icon="edit-title"
      :with-hover="true"
      :close="closeToggle"
      width="100%"
      @keyup-enter="submit"
      @after-close="resetCopy"
    >
      <StringItem v-if="name.length" :string="name.length > 60 ? name.slice(0, 60) + '...' : name" />
      <StringItem v-else string="Введите данные" color="#B0A4C0" />
      <template #open-inside-content>
        <InfoItem
          title=""
          icon="edit-title"
          :with-open-window="false"
          :with-hover="false"
          border-color="#ffffff"
          base-box-margin="0 0 15px 0"
          padding="0"
          width="100%"
          custom-class="test"
          open-width="100%"
        >
        <div class="field">
          <el-form>
            <el-form-item style="width: 100%" prop="surname">
              <el-input style="width: 100%" :autosize="true" type="textarea" v-model="name" />
            </el-form-item>
          </el-form>
        </div>
        </InfoItem>
        <Button button-class="save-button" text="Сохранить" @click="submit" />
      </template>
    </InfoItem>
  </el-form>
</template>

<script setup lang="ts">
import { defineComponent, PropType, Ref, ref } from 'vue';

import Button from '@/services/components/Button.vue';
import GridContainer from '@/services/components/GridContainer.vue';
import InfoItem from '@/services/components/InfoItem.vue';
import StringItem from '@/services/components/StringItem.vue';

import IWithName from '@/interfaces/IWithName';

const props = defineProps({
  withName: {
    type: Object as PropType<IWithName>,
    required: true,
  },
});
const emit = defineEmits(['submit']);

const closeToggle: Ref<boolean> = ref(false);
const form = ref();
const name: Ref<string> = ref(props.withName.name);
const showSaveDialog: Ref<boolean> = ref(false);

const resetCopy = () => {
  showSaveDialog.value = false;
};

const submit = async (): Promise<void> => {
  name.value.trim();
  props.withName.setName(name.value);
  closeToggle.value = !closeToggle.value;
  emit('submit');
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/base-style.scss';

.field {
  width: 100%;
}

.button {
  width: auto;
  height: 34px;
  border-radius: 5px;
  color: #006bb4;
  font-size: 12px;

  &-filter {
    background: #ffffff;
  }

  &-download {
    background: #dff2f8;
  }
}

:deep(.button-register) {
  width: auto;
  height: 34px;
  border-radius: 5px;
  color: #006bb4;
  background: #ffffff;
  font-size: 12px;
}

:deep(.name-item) {
  margin: 0;
  width: auto;
  border-color: #ffffff;
  padding: 0;
}

.grid {
  max-width: auto;
  grid-gap: 10px;
  margin: 0;
  grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
}

.plus-button {
  width: 100%;
  height: 34px;
  border-radius: 5px;
  color: #00bea5;
  background: #c1efeb;
}

.save-picker-button {
  width: 100%;
  height: 34px;
  border-radius: 5px;
  color: #006bb4;
  background: #dff2f8;
}

.gender-button {
  width: 42px;
  border-radius: 5px;
  height: 42px;
  color: #006bb4;
  background: #dff2f8;
  margin: 2px 10px 0 0;
  font-size: 18px;
}

.save-button {
  width: 100%;
  border-radius: 5px;
  height: 42px;
  color: #006bb4;
  background: #dff2f8;
  margin: 2px 10px 0 0;
  font-size: 14px;
}

:deep(.edit-button) {
  min-width: 40px;
  max-width: 40px;
  height: 40px;
  border-radius: 5px;
  color: #006bb4;
  background: #dff2f8;
}

:deep(.files-buttons) {
  width: auto;
  height: 34px;
  border-radius: 5px;
  color: #006bb4;
  background: #dff2f8;
  font-size: 12px;

  &:hover {
    background: #dff2f8;
  }
}

.edv {
  font-size: 14px;
  padding: 0;
  margin: 0 5px 0 0;

  &-active {
    color: #b0a4c0;
  }
}

.patient-name {
  color: #006bb4;
  font-size: 17px;
  min-width: 150px;
  width: 100%;
  padding: 0;
}

.hidden {
  display: none;
}

.scroll-block {
  height: 75vh;
  overflow: hidden;
  overflow-y: scroll;
  margin-left: 8px;
}

.registers-tooltip {
  &:hover {
    cursor: pointer;
  }
}

.patient-link {
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}

.tag-link:hover {
  background-color: darken(white, 10%);
  cursor: pointer;
}

.flex-block {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

:deep(.edit-icon) {
  width: 28px;
  height: 28px;
  color: #006bb4;
}

.item-flex {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin: 0 10px 0 0;
}

.item-flex:last-child {
  margin: 10px 0;
}

.line-item-left {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: auto;
  padding: 0;
}

.line-item-right {
  display: flex;
  justify-content: right;
  align-items: center;
  width: auto;
  padding: 0;
}

:deep(.icon-plus) {
  fill: #00b5a4;
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.icon-filter {
  width: 24px;
  height: 24px;
  cursor: pointer;
  stroke: #006bb4;
  fill: none;
}

.icon-del {
  width: 10px;
  height: 10px;
  cursor: pointer;
}

.patient-count {
  margin-top: 10px;
  color: $site_light_pink;
  font-size: 14px;
}

:deep(.el-form-item) {
  margin: 8px 0 0 0;
}

@media (max-width: 1915px) {
  .flex-block {
    width: 100%;
    display: block;
    justify-content: space-between;
    align-items: center;
  }
  .line-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0;
  }
  .item-flex {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
  }

  .item-flex:last-child {
    margin-top: 10px;
    margin-bottom: 10px;
  }
}

@media (max-width: 560px) {
  .line-item-left {
    margin: 10px 0;
  }

  .line-item-right {
    margin: 10px 0;
    justify-content: space-between;
  }

  .item-flex:first-child {
    display: block;
    width: 100%;
    margin: 0 0px 10px 0;
  }
}

.save-button {
  width: 100%;
  border-radius: 5px;
  height: 42px;
  color: #006bb4;
  background: #dff2f8;
  margin: 10px 0 0 0;
  font-size: 14px;
}

:deep(.el-date-editor.el-input, .el-date-editor.el-input__inner) {
  width: 100%;
}

:deep(.el-form-item) {
  display: block;
  margin-bottom: 16px;
}

:deep(.el-input__inner) {
  height: 40px;
  width: 100%;
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 15px;
  color: $site_dark_gray;
}

:deep(.el-input__inner::placeholder) {
  color: $site_light_pink;
}

:deep(.el-input__icon) {
  color: $site_dark_gray;
}

:deep(.el-form-item__label) {
  color: $site_light_pink;
  padding: 0 !important;
  text-transform: uppercase;
  margin-left: 5px;
  font-size: 14px;
  margin-bottom: 6px;
}

:deep(.el-input-number__increase) {
  border-radius: 0;
}

:deep(.el-input-number__decrease) {
  border-radius: 0;
}

:deep(.el-textarea__inner) {
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 15px;
  color: $site_dark_gray;
}
</style>
