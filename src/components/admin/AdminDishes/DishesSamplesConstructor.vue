<template>
  <div class="title">Редактор книги блюд</div>
  <div v-if="mounted" class="block-container">
    <div class="dishesGroup">
      <div class="tools">
        <div class="tools-buttons">
          <div class="button-container">
            <button class="button-create" @click="addDishesGroup">Создать категорию</button>
            <AddGroupForm v-if="dishesGroupConstructorVisible" @close="closeDishesGroupForm" />
          </div>
        </div>
      </div>
      <div class="column">
        <div v-for="dishesGroupItem in dishesGroups" :key="dishesGroupItem.id">
          <CollapsContainer :tab-id="dishesGroupItem.id" :collapsed="true">
            <template #inside-title>
              <div class="title-in">
                {{ dishesGroupItem.name }}
                <button class="tools-button-e">
                  <svg class="icon-edit">
                    <use xlink:href="#profile-edit"></use>
                  </svg>
                </button>
                <button class="tools-button-d" @click="removeDishesGroup(dishesGroupItem.id)">
                  <svg class="icon-delete">
                    <use xlink:href="#delete"></use>
                  </svg>
                </button>
              </div>
            </template>
            <template #inside-content>
              <div v-for="dishSampleItem in dishesGroupItem.dishSamples" :key="dishSampleItem.id" class="group">
                <div class="dish-item" @click="openDishSampleConstructor(dishSampleItem)">
                  <div class="item-name">{{ dishSampleItem.name }}</div>
                  <button class="item-button" @click.stop="removeDishSample(dishesGroupItem, dishSampleItem.id)">
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
            <button class="button-create" @click="openDishSampleConstructor">Создать блюдо</button>
            <AddForm v-if="dishSampleConstructorVisible" @close="dishSampleConstructorVisible = false" />
          </div>
        </div>
      </div>
      <!--      <div class="column">-->
      <!--        <DishInfo />-->
      <!--      </div>-->
    </div>
  </div>
  <AddToMenu />
  <Save />
  <Delete />
  <Edit />
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';

import AddToMenu from '@/assets/svg/Buffet/AddToMenu.svg';
import Delete from '@/assets/svg/Buffet/Delete.svg';
import Edit from '@/assets/svg/Buffet/Edit.svg';
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
    Edit,
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
    const dishSampleConstructorCreateMode: Ref<boolean> = ref(true);
    const dishedSamples: Ref<IDishSample[]> = computed(() => Provider.store.getters['dishesSamples/items']);
    const dishSample: Ref<IDishSample> = computed(() => Provider.store.getters['dishesSamples/item']);
    const dishesGroupConstructorVisible: Ref<boolean> = ref(false);
    const isCallBackModalOpen: Ref<boolean> = ref(false);

    const addDishesGroup = () => {
      dishesGroupConstructorVisible.value = true;
    };

    onBeforeMount(async () => {
      await Provider.store.dispatch('dishesGroups/getAll');
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

    const removeDishSample = async (dishesGroupItem: IDishesGroup, dishSampleId: string) => {
      await Provider.store.dispatch('dishesSamples/remove', dishSampleId);
      dishesGroupItem.removeDishSample(dishSampleId);
    };

    const addDishesSample = () => {
      dishSampleConstructorVisible.value = true;
    };

    const openDishSampleConstructor = (item?: IDishSample) => {
      if (item) {
        dishSample.value = item;
      }
      Provider.store.commit('dishesSamples/set', item);
      dishSampleConstructorCreateMode.value = !item;
      dishSampleConstructorVisible.value = true;
    };

    const closeDishesGroupForm = () => {
      dishesGroupConstructorVisible.value = false;
      Provider.store.commit('dishesGroups/resetItem');
    };

    return {
      closeDishesGroupForm,
      dishSampleConstructorCreateMode,
      openDishSampleConstructor,
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
@import '@/assets/styles/elements/base-style.scss';

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
</style>
