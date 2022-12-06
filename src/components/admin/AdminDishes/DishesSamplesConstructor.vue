<template>
  <div class="block-container">
    <div class="dishesGroup">
      <div class="tools">
        <div class="tools-buttons">
          <div class="button-container">
            <button class="button-create" @click="dishesGroupConstructorVisible = true">Создать категорию</button>
            <AddGroupForm v-if="dishesGroupConstructorVisible" @close="dishesGroupConstructorVisible = false" />
          </div>
        </div>
      </div>
      <div class="column">
        <div v-for="dishesGroupItem in dishesGroups" :key="dishesGroupItem.id">
          <CollapsContainer :tab-id="dishesGroupItem.id" :collapsed="true">
            <template #inside-title>
              <div class="title-in">
                {{ dishesGroupItem.name }}
                <button class="tools-button" @click="removeDishesGroup(dishesGroupItem.id)">
                  <svg class="icon-delete">
                    <use xlink:href="#delete"></use>
                  </svg>
                </button>
              </div>
            </template>
            <template #inside-content>
              <div v-for="dishSampleItem in dishedSamples" :key="dishSampleItem.id">
                <div class="dish-item">
                  <div class="item-name">{{ dishSampleItem.name }}</div>
                  <button class="item-button" @click="removeDishSample(dishSampleItem.id)">
                    <svg class="icon-delete">
                      <use xlink:href="#delete"></use>
                    </svg>
                  </button>
                </div>
              </div>
            </template>
          </CollapsContainer>
        </div>
      </div>
    </div>
    <div class="menusGroup">
      <div class="tools">
        <div class="tools-buttons">
          <div class="button-container">
            <button class="button-create" @click="dishSampleConstructorVisible = true">Создать блюдо</button>
            <AddForm v-if="dishSampleConstructorVisible" @close="dishSampleConstructorVisible = false" />
          </div>
        </div>
      </div>
      <div class="column"></div>
    </div>
  </div>
  <AddToMenu />
  <Save />
  <Delete />
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';

import AddToMenu from '@/assets/svg/Buffet/AddToMenu.svg';
import Delete from '@/assets/svg/Buffet/Delete.svg';
import Save from '@/assets/svg/Buffet/Save.svg';
import AddForm from '@/components/admin/AdminDishes/AddForm.vue';
import AddGroupForm from '@/components/admin/AdminDishes/AddGroupForm.vue';
import CollapsContainer from '@/components/Main/CollapsContainer/CollapsContainer.vue';
import IDailyMenu from '@/interfaces/IDailyMenu';
import IDishesGroup from '@/interfaces/IDishesGroup';
import IDishSample from '@/interfaces/IDishSample';
import Provider from '@/services/Provider';
import removeFromClass from '@/services/removeFromClass';

export default defineComponent({
  name: 'DishesSamplesConstructor',
  components: {
    CollapsContainer,
    AddToMenu,
    Save,
    Delete,
    AddGroupForm,
    AddForm,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    menu: {
      type: Object as PropType<IDailyMenu>,
      required: true,
    },
  },

  emits: ['close'],
  setup() {
    const dishesGroups: Ref<IDishesGroup[]> = computed(() => Provider.store.getters['dishesGroups/items']);
    const dishesGroup: Ref<IDishesGroup> = computed(() => Provider.store.getters['dishesGroups/item']);
    const dishSampleConstructorVisible: Ref<boolean> = ref(false);
    const dishedSamples: Ref<IDishSample[]> = computed(() => Provider.store.getters['dishesSamples/items']);
    const dishSample: Ref<IDishSample> = computed(() => Provider.store.getters['dishesSamples/item']);
    const dishesGroupConstructorVisible: Ref<boolean> = ref(false);
    const isCallBackModalOpen: Ref<boolean> = ref(false);

    const addDishesGroup = () => {
      dishesGroupConstructorVisible.value = true;
    };

    onBeforeMount(async () => {
      await Provider.store.dispatch('dishesSamples/getAll');
    });

    const saveDishesGroup = async () => {
      await Provider.store.dispatch('dishesGroups/create', dishesGroup.value);
      dishesGroupConstructorVisible.value = false;
    };

    const removeDishesGroup = async (id: string) => {
      await Provider.store.dispatch('dishesGroups/remove', id);
    };

    const saveDishSample = async () => {
      await Provider.store.dispatch('dishesSamples/create', dishSample.value);
      dishSampleConstructorVisible.value = false;
    };

    const removeDishSample = async (id: string) => {
      await Provider.store.dispatch('dishesSamples/remove', id);
    };

    const addDishesSample = () => {
      dishSampleConstructorVisible.value = true;
    };

    return {
      removeDishSample,
      addDishesSample,
      saveDishSample,
      dishSampleConstructorVisible,
      dishSample,
      dishedSamples,
      saveDishesGroup,
      removeDishesGroup,
      dishesGroupConstructorVisible,
      dishesGroup,
      addDishesGroup,
      dishesGroups,
      mounted: Provider.mounted,
      schema: Provider.schema,
      removeFromClass,
      isCallBackModalOpen,
    };
  },
});
</script>

<style lang="scss" scoped>
$margin: 20px 0;

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
  // align-items: center;
  height: 32px;
  // border-bottom: 1px solid #c4c4c4;
  // background: #f5f6f8;
  padding: 0 10px;
  margin-top: 10px;
}

.tools-title {
  display: flex;
  justify-content: left;
  align-items: center;
  color: #1979cf;
  font-size: 16px;
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

.tools-button {
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
  margin-left: 10px;
}

.icon-delete:hover {
  fill: #379fff;
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
  margin: 0px 20px;
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
</style>
