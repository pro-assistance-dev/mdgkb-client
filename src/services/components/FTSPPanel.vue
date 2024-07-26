<template>
  <el-select v-model="curFTSP" label="Фильтры" clearable placeholder="Выберите шаблон фильтра" @change="set" @clear="clear">
    <el-option v-for="preset in ftspPresets" :key="preset" :label="preset.name" :value="preset.id" />
  </el-select>
  <PButton v-if="ftsp.f.length > 0" type="text" color="add" text="Добавить текущий фильтр в список фильтров" @click="openModal" />
  <PButton v-if="curFTSP" type="text" color="del" text="Удалить выбранный фильтр из списка фильтров" @click="remove" />
  <ModalWindow v-if="modalOpened" :show="modalOpened">
    <el-input v-model="ftspName" placeholder="Введите название" />
    <PButton type="admin" color="blue" text="Сохранить" @click="save" />
  </ModalWindow>
</template>

<script setup lang="ts">
import FTSPPreset from '@/services/classes/FTSPPreset';

const emit = defineEmits(['change']);

const ftspPresets: FTSPPreset[] = FTSPPresetsStore.Items();
const modalOpened = ref(false);
const curFTSP: Ref<FTSP | undefined> = ref(undefined);

const openModal = () => {
  modalOpened.value = true;
};
const ftspName = ref('');

const clear = async () => {
  curFTSP.value = undefined;
  FTSP.Get().resetF();
  emit('change');
};

const remove = async () => {
  await FTSPPresetsStore.Remove(curFTSP.value);
  FTSP.Get().resetF();
  curFTSP.value = undefined;
  emit('change');
};

const set = async (ftspPresetId?: string) => {
  if (!ftspPresetId) {
    return;
  }
  const preset = ftspPresets.find((f: FTSPPreset) => f.id === ftspPresetId);
  curFTSP.value = preset?.id;
  // FTSP.Get().createFrom(preset?.ftsp);
  emit('change');
};

const save = async () => {
  const preset = FTSPPreset.Create(FTSP.Get());
  preset.name = ftspName.value;
  ftspName.value = '';
  await FTSPPresetsStore.Create(preset);
  FTSPPresetsStore.AppendToAll([preset]);
  curFTSP.value = preset.id;
  modalOpened.value = false;
};

onBeforeMount(async () => {
  await FTSPPresetsStore.GetAll();
});
</script>
<style lang="scss" scoped>
@import '@/services/assets/style/index.scss';

// .filter-save {
//   position: sticky;
//   top: 0px;
//   height: 40px;
//   width: 100%;
//   background: #006bb4;
// }

.admin-add2 {
  border: none;
  background: inherit;
  color: #00b5a4;
  transition: 0.3s;
  cursor: pointer;
  margin-left: -6px;
}

.admin-add2:hover {
  color: darken($color: #00b5a4, $amount: 10%);
}

.admin-del {
  border: none;
  background: inherit;
  color: #a3a9be;
  transition: 0.3s;
  cursor: pointer;
  margin-left: -6px;
}

.admin-del:hover {
  color: darken($color: #cf3d19, $amount: 5%);
}

.filter-field {
  width: 100%;
  box-sizing: border-box;
  padding: 0 0 0 10px;
  height: calc(100% - 110px);
  overflow-y: scroll;
  overflow-x: hidden;
}

.tools-field {
  display: block;
  box-sizing: border-box;
  width: 100%;
  padding: 0 8px 10px 10px;
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
  grid-template-columns: repeat(auto-fit, minmax(99px, 1fr));
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
</style>
