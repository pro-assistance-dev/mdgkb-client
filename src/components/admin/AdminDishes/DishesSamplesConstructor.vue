<template>
  <div class="title">
    Редактор книги блюд
    <button class="button-create" @click="addDishesGroup">+ Создать категорию</button>
    <div class="search">
      <DishSearchBar :is-search-page="true" @search="searchDishSamples" />
    </div>
  </div>
  <div v-if="mounted" class="block-container">
    <div class="dishesGroup">
      <AddGroupForm v-if="dishesGroupConstructorVisible" @close="closeDishesGroupForm" />
      <div v-if="dishSamplesFlat.length === 0" class="column">
        <div class="hidden-scroll" />
        <draggable class="tabs" :list="dishesGroups" item-key="id" handle=".tab-name" @end="saveGroupsOrder">
          <template #item="{ element }">
            <div>
              <CollapseItem :tab-id="element.id" :is-collaps="element.samplesExists()">
                <template #tools>
                  <svg class="icon-add" @click.stop="openDishSampleConstructor">
                    <use xlink:href="#add" />
                  </svg>
                  <svg class="icon-edit" @click.stop="editDishesGroup(element)">
                    <use xlink:href="#profile-edit" />
                  </svg>
                  <el-popconfirm confirm-button-text="Да" cancel-button-text="Отмена" icon="el-icon-info"
                    icon-color="red" title="Вы уверены, что хотите удалить категорию?"
                    @confirm="removeDishesGroup(element.id)" @cancel="() => { }">
                    <template #reference>
                      <button class="tools-button">
                        <svg class="icon-delete">
                          <use xlink:href="#delete" />
                        </svg>
                      </button>
                    </template>
                  </el-popconfirm>
                </template>
                <template #inside-title>
                  <div class="title-in">
                    <el-badge :value="element.dishSamples.length"
                      :type="element.dishSamples.length > 0 ? 'primary' : ''" class="badge">
                      {{ element.name }}
                    </el-badge>
                  </div>
                </template>
                <template #inside-content>
                  <DishesConstructorList :dishes-samples="element.dishSamples"
                    @openDishSampleConstructor="openDishSampleConstructor" />
                </template>
              </CollapseItem>
            </div>
          </template>
        </draggable>
      </div>
      <div v-else class="column">
        <DishesConstructorList :dishes-samples="dishSamplesFlat"
          @openDishSampleConstructor="openDishSampleConstructor" />
      </div>
    </div>
    <div class="menusGroup">
      <DishConstructorInfo v-if="!dishSampleConstructorVisible" @selectLastDish="openDishSampleConstructor" />
      <AddForm v-if="dishSampleConstructorVisible" :key="dishSample.id"
        :close-function="closeDishSampleConstructorVisible" />
    </div>
  </div>
  <AddToMenu />
  <Save />
  <Delete />
  <Edit />
</template>

<script lang="ts">
import draggable from 'vuedraggable';

import AddToMenu from '@/assets/svg/Buffet/AddToMenu.svg';
import Delete from '@/assets/svg/Buffet/Delete.svg';
import Edit from '@/assets/svg/Buffet/Edit.svg';
import Save from '@/assets/svg/Buffet/Save.svg';
import DishesGroup from '@/classes/DishesGroup';
import DishSample from '@/classes/DishSample';
import AddForm from '@/components/admin/AdminDishes/AddForm.vue';
import AddGroupForm from '@/components/admin/AdminDishes/AddGroupForm.vue';
import DishConstructorInfo from '@/components/admin/AdminDishes/DishConstructorInfo.vue';
import DishesConstructorList from '@/components/admin/AdminDishes/DishesConstructorList.vue';
import DishSearchBar from '@/components/admin/AdminDishes/DishSearchBar.vue';
import CollapseItem from '@/services/components/Collapse/CollapseItem.vue';
import Provider from '@/services/Provider/Provider';
// import sort from '@/services/sort';
import Strings from '@/services/Strings';

export default defineComponent({
  name: 'DishesSamplesConstructor',
  components: {
    DishSearchBar,
    CollapseItem,
    AddToMenu,
    Save,
    Delete,
    AddGroupForm,
    AddForm,
    Edit,
    draggable,
    DishesConstructorList,
    DishConstructorInfo,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    selectedSample: {
      type: Object as PropType<DishSample | undefined>,
      required: true,
    },
  },
  emits: ['close'],
  setup(props) {
    const dishesGroups: Ref<DishesGroup[]> = computed(() => Provider.store.getters['dishesGroups/items']);
    const dishesGroup: Ref<DishesGroup> = computed(() => Provider.store.getters['dishesGroups/item']);
    const dishSampleConstructorVisible: Ref<boolean> = ref(false);
    const dishSampleConstructorCreateMode: Ref<boolean> = ref(true);
    const dishedSamples: Ref<DishSample[]> = computed(() => Provider.store.getters['dishesSamples/items']);
    const dishSample: Ref<DishSample> = computed(() => Provider.store.getters['dishesSamples/item']);
    const dishesGroupConstructorVisible: Ref<boolean> = ref(false);
    const isCallBackModalOpen: Ref<boolean> = ref(false);

    const addDishesGroup = () => {
      dishesGroupConstructorVisible.value = true;
    };

    onBeforeMount(async () => {
      await Promise.all([Provider.store.dispatch('dishesGroups/getAll'), Provider.store.dispatch('dishesSamples/getAll')]);
      if (props.selectedSample?.id) {
        openDishSampleConstructor(props.selectedSample);
      }
    });

    const removeDishesGroup = async (id: string) => {
      await Provider.store.dispatch('dishesGroups/remove', id);
    };

    const saveDishSample = async () => {
      await Provider.store.dispatch('dishesSamples/create', dishSample.value);
      dishSampleConstructorVisible.value = false;
    };

    const addDishesSample = () => {
      dishSampleConstructorVisible.value = true;
    };

    const openDishSampleConstructor = (item?: DishSample) => {
      dishSampleConstructorVisible.value = false;
      if (item) {
        dishSample.value = item;
        dishesGroups.value.forEach((g: DishesGroup) => {
          g.dishSamples.forEach((e) => {
            e.selected = false;
          });
        });
        item.selected = true;
      }
      Provider.store.commit('dishesSamples/set', item);
      dishSampleConstructorCreateMode.value = !item;
      dishSampleConstructorVisible.value = true;
    };

    const closeDishesGroupForm = () => {
      dishesGroupConstructorVisible.value = false;
      Provider.store.commit('dishesGroups/resetItem');
    };

    const editDishesGroup = (group: DishesGroup) => {
      Provider.store.commit('dishesGroups/set', group);
      dishesGroupConstructorVisible.value = true;
    };

    const closeDishSampleConstructorVisible = async () => {
      await Provider.store.dispatch('dishesGroups/getAll');
      dishSampleConstructorVisible.value = false;
    };

    const saveGroupsOrder = () => {
      // sort(dishesGroups.value);
      dishesGroups.value.forEach(async (d: DishesGroup) => {
        await Provider.store.dispatch('dishesGroups/update', d);
      });
    };

    const dishSamplesFlat: Ref<DishSample[]> = ref([]);

    const searchDishSamples = (searchSource: string) => {
      if (searchSource === '') {
        dishSamplesFlat.value = [];
        return;
      }
      console.log(searchSource);
      dishSamplesFlat.value = [];
      dishesGroups.value.forEach((ds: DishesGroup) => {
        dishSamplesFlat.value.push(
          ...ds.dishSamples.filter((ds: DishSample) => {
            const n = ds.name.toLowerCase();
            return n.includes(searchSource.toLowerCase()) || n.includes(Strings.Translit(searchSource.toLowerCase()));
          })
        );
      });
      console.log(dishSamplesFlat);
    };

    return {
      dishSamplesFlat,
      searchDishSamples,
      saveGroupsOrder,
      closeDishSampleConstructorVisible,
      editDishesGroup,
      closeDishesGroupForm,
      dishSampleConstructorCreateMode,
      openDishSampleConstructor,
      addDishesSample,
      saveDishSample,
      dishSampleConstructorVisible,
      dishSample,
      dishedSamples,
      removeDishesGroup,
      dishesGroupConstructorVisible,
      dishesGroup,
      addDishesGroup,
      dishesGroups,
      mounted: Provider.mounted,

      isCallBackModalOpen,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';

$margin: 20px 0;

:deep(.badge > .el-badge__content.is-fixed) {
  right: 0px;
  background: #ffffff;
  color: #1979cf;
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
  background: #e6f8f6;
  margin-bottom: -21px;
}

.dishesGroup {
  position: relative;
  width: 600px;
  border: 1px solid #c4c4c4;
  padding-bottom: 10px;
  margin: 10px;
  background: #ffffff;
  padding-left: 7px;
}

.column {
  padding: 0px 6px 0px 4px;
  overflow: hidden;
  overflow-y: scroll;
  height: 650px;
}

.title {
  display: flex;
  justify-content: left;
  align-items: center;
  color: #ffffff;
  font-size: 20px;
  height: 40px;
  padding-left: 20px;
  background: #00b5a4;
  z-index: 3;
}

.tools-buttons {
  display: flex;
  justify-content: right;
  align-items: center;
}

.button-create {
  border: none;
  background: inherit;
  color: #ffe666;
  margin: 10px;
  padding: 0 15px;
  transition: 0.3s;
  cursor: pointer;
}

.button-create:hover {
  color: #d6ecf4;
}

.tools-button {
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

.icon-add {
  width: 24px;
  height: 24px;
  fill: #c3c3c3;
  cursor: pointer;
  transition: 0.3s;
  z-index: 1;
  padding-right: 3px;
}

.icon-add:hover {
  fill: #379fff;
}

.menusGroup {
  position: relative;
  width: 50%;
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
  fill: #c3c3c3;
  cursor: pointer;
  transition: 0.3s;
}

.icon-delete:hover {
  fill: #379fff;
}

.icon-edit {
  width: 16px;
  height: 16px;
  stroke: #c3c3c3;
  fill: none;
  cursor: pointer;
  transition: 0.3s;
  padding: 5px;
}

.icon-edit:hover {
  stroke: #3796eb;
}

.icon-transfer {
  width: 24px;
  height: 24px;
  fill: #838383;
  cursor: pointer;
  transition: 0.3s;
}

.icon-transfer:hover {
  fill: #1979cf;
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

.dish-item:active>.item-button {
  display: flex;
  background: #d6ecf4;
}

.dish-item:hover>.item-button {
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

.hidden-scroll {
  width: 8px;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  background: #ffffff;
}
</style>
