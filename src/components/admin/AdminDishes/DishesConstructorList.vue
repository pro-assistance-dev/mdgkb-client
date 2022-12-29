<template>
  <draggable class="tabs" :list="dishesGroup.dishSamples" item-key="id" handle=".el-icon-s-grid" @end="saveDishesOrder">
    <template #item="{ element }">
      <div class="group">
        <div class="dish-item" @click="$emit('openDishSampleConstructor', element)">
          <i class="el-icon-s-grid drug-icon" />
          <div class="item-name">{{ element.name }}</div>
          <el-popconfirm
            confirm-button-text="Да"
            cancel-button-text="Отмена"
            icon="el-icon-info"
            icon-color="red"
            title="Вы уверен, что хотите удалить категорию?"
            @confirm="removeDishSample(dishesGroup, element.id)"
            @cancel="() => {}"
          >
            <template #reference>
              <button class="item-button">
                <svg class="icon-delete">
                  <use xlink:href="#delete"></use>
                </svg>
              </button>
            </template>
          </el-popconfirm>
        </div>
      </div>
    </template>
  </draggable>
  <Delete />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import draggable from 'vuedraggable';

import Delete from '@/assets/svg/Buffet/Delete.svg';
import IDishesGroup from '@/interfaces/IDishesGroup';
import Provider from '@/services/Provider';
import sort from '@/services/sort';

export default defineComponent({
  name: 'DishesConstructorList',
  components: {
    Delete,
    draggable,
  },
  props: {
    dishesGroup: {
      type: Object as PropType<IDishesGroup>,
      required: true,
    },
  },

  emits: ['openDishSampleConstructor'],
  setup(props) {
    const removeDishSample = async (dishesGroupItem: IDishesGroup, dishSampleId: string) => {
      await Provider.store.dispatch('dishesSamples/remove', dishSampleId);
      dishesGroupItem.removeDishSample(dishSampleId);
    };

    const saveDishesOrder = async () => {
      sort(props.dishesGroup.dishSamples);
      await Provider.store.dispatch('dishesSamples/updateAll', props.dishesGroup.dishSamples);
    };

    return {
      saveDishesOrder,
      removeDishSample,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/base-style.scss';

$margin: 20px 0;

:deep(.badge > .el-badge__content.is-fixed) {
  right: 2px;
}

.flex-column {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.flex-row-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: $margin;
}

.flex-row-end {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: $margin;
}

.el-container {
  .el-card {
    margin-bottom: 20px;
  }
}

:deep(.el-dialog) {
  overflow: hidden;
}

:deep(.el-form-item) {
  margin-bottom: 0px;
}

.block-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.dishesGroup {
  position: relative;
  width: 600px;
  border: 1px solid #c4c4c4;
  padding-bottom: 10px;
}

.column {
  padding: 0px 6px 0px 4px;
  overflow: hidden;
  overflow-y: scroll;
  height: 550px;
  // position: relative;
}

.tools {
  display: flex;
  justify-content: right;
  height: 32px;
  padding: 0 10px;
  margin-top: 10px;
}

.title {
  position: absolute;
  top: 12px;
  left: 30px;
  display: flex;
  justify-content: left;
  align-items: center;
  color: #1979cf;
  font-size: 20px;
}

.tools-buttons {
  display: flex;
  justify-content: right;
  align-items: center;
}

.button-create {
  height: 30px;
  border: 1px solid #1979cf;
  border-radius: 15px;
  background: #d6ecf4;
  color: #1979cf;
  margin: 10px 10px 10px 0;
  padding: 0 15px;
  transition: 0.3s;
}

.button-create:hover {
  background: #1979cf;
  color: #ffffff;
}

.tools-button-d {
  position: absolute;
  top: 18px;
  right: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border-radius: none;
  border: none;
  height: 24px;
}

.tools-button-e {
  position: absolute;
  top: 18px;
  right: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border-radius: none;
  border: none;
  height: 24px;
}

.icon-add-to-menu {
  width: 43px;
  height: 26px;
  fill: #1979cf;
  cursor: pointer;
  transition: 0.3s;
}

.icon-add-to-menu:hover {
  fill: #3796eb;
}

.menusGroup {
  position: relative;
  width: 600px;
  border: 1px solid #c4c4c4;
  padding-bottom: 10px;
}

.icon-save {
  width: 24px;
  height: 24px;
  fill: #343e5c;
  cursor: pointer;
  transition: 0.3s;
}

.icon-save:hover {
  fill: #1979cf;
}

.icon-delete {
  width: 20px;
  height: 20px;
  fill: #343e5c;
  cursor: pointer;
  transition: 0.3s;
}

.icon-delete:hover {
  fill: #379fff;
}

.icon-edit {
  width: 16px;
  height: 16px;
  stroke: #343e5c;
  fill: none;
  cursor: pointer;
  transition: 0.3s;
}

.icon-edit:hover {
  stroke: #3796eb;
}

.new-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
}

.dish-item {
  height: 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #343e5c;
  margin: 3px 20px;
  cursor: pointer;
  padding: 0px 36px 0 20px;
  border-radius: 5px;
}

.dish-item:hover {
  background: #e5e5e5;
}

.dish-item:active {
  background: #d6ecf4;
}

.dish-item:active > .item-button {
  display: flex;
  background: #d6ecf4;
}

.dish-item:hover > .item-button {
  display: flex;
}

.item-button {
  display: none;
  align-items: center;
  justify-content: center;
  background: #e5e5e5;
  border-radius: none;
  border: none;
  height: 24px;
  cursor: pointer;
}

.title-in {
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 14px;
  letter-spacing: 0.1em;
  color: $site_dark_gray;
  height: 60px;
  align-items: center;
  font-weight: bold;
}
.drug-icon {
  cursor: pointer;
}
</style>
