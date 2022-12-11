<template>
  <div class="block-container">
    <div class="dishesGroup">
      <div class="tools">
        <div class="tools-title">
          Книга блюд
          <button class="tools-button">
            <svg class="icon-edit">
              <use xlink:href="#profile-edit"></use>
            </svg>
          </button>
          <div class="search">
            <DishSearchBar :is-search-page="true" @search="search" />
          </div>
        </div>
        <div class="tools-buttons">
          <button v-show="dishesSelected()" class="tools-button" @click="addToMenu">
            <svg class="icon-add-to-menu">
              <use xlink:href="#add-to-menu"></use>
            </svg>
          </button>
        </div>
      </div>
      <div class="column">
        <div>
          <CollapsContainer v-for="dishesGroup in dishesGroups" :key="dishesGroup.id" :tab-id="dishesGroup.id" :collapsed="true">
            <template #inside-title>
              <div class="title-in">
                {{ dishesGroup.name }}
              </div>
            </template>
            <template #inside-content>
              <div class="scroll-container">
                <div
                  v-for="dishSample in dishesGroup.getSamplesNotFromMenu(menu)"
                  :key="dishSample.id"
                  class="group"
                  :class="{ checked: dishSample.selected }"
                  @click="selectSample(dishSample)"
                >
                  <div class="group-item">
                    <label :for="999">
                      <div class="dish-item">
                        <div class="left-field">{{ dishSample.name }}</div>
                        <div class="right-field">{{ dishSample.weight }} гр/{{ dishSample.price }},00руб/{{ dishSample.caloric }}ккал</div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </template>
          </CollapsContainer>
        </div>
      </div>
    </div>
  </div>
  <Edit />
  <AddToMenu />
  <Save />
  <Delete />
</template>

<script lang="ts">
import { computed, defineComponent, PropType, Ref, ref } from 'vue';

import AddToMenu from '@/assets/svg/Buffet/AddToMenu.svg';
import Delete from '@/assets/svg/Buffet/Delete.svg';
import Edit from '@/assets/svg/Buffet/Edit.svg';
import Save from '@/assets/svg/Buffet/Save.svg';
import DishSearchBar from '@/components/admin/AdminDishes/DishSearchBar.vue';
import CollapsContainer from '@/components/Main/CollapsContainer/CollapsContainer.vue';
import IDailyMenu from '@/interfaces/IDailyMenu';
import IDishesGroup from '@/interfaces/IDishesGroup';
import IDishSample from '@/interfaces/IDishSample';
import Provider from '@/services/Provider';
import removeFromClass from '@/services/removeFromClass';

export default defineComponent({
  name: 'DishBook',
  components: {
    CollapsContainer,
    AddToMenu,
    Save,
    Delete,
    Edit,
    DishSearchBar,
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
  setup(props) {
    const dishesGroupsSource: Ref<IDishesGroup[]> = computed(() => Provider.store.getters['dishesGroups/items']);
    const dishesGroups: Ref<IDishesGroup[]> = ref(dishesGroupsSource.value.filter((d: IDishesGroup) => d.dishSamples.length > 0));

    const addToMenu = () => {
      const dishesSamples: IDishSample[] = [];
      dishesGroupsSource.value.forEach((dgs: IDishesGroup) => {
        dgs.dishSamples.forEach((ds: IDishSample) => {
          if (ds.selected) {
            dishesSamples.push(ds);
            ds.selected = false;
          }
        });
      });
      props.menu.addDishesFromSamples(dishesSamples);
      Provider.store.dispatch('dailyMenus/update', props.menu);
    };

    const selectSample = (dishSample: IDishSample): void => {
      dishSample.selected = !dishSample.selected;
    };

    const dishesSelected = (): boolean => {
      return dishesGroups.value.some((dg: IDishesGroup) => dg.dishSamples.some((ds: IDishSample) => ds.selected));
    };

    return {
      dishesSelected,
      selectSample,
      addToMenu,
      dishesGroupsSource,
      dishesGroups,
      mounted: Provider.mounted,
      schema: Provider.schema,
      removeFromClass,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/base-style.scss';

.block-container {
  width: 100%;
  background: #f9fafb;
  height: 100%;
}

.dishesGroup {
  width: 100%;
  padding-bottom: 10px;
  height: 100%;
}

.column {
  padding: 0px 2px 0px 8px;
  overflow: hidden;
  overflow-y: scroll;
  height: 100%;
  min-width: 350px;
}

.tools {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 32px;
  border-bottom: 1px solid #d8d9db;
  background: #ffffff;
  padding: 0 10px;
  margin-bottom: 5px;
  width: 100%;
}

.tools-title {
  display: flex;
  justify-content: left;
  align-items: center;
  color: #1979cf;
  font-size: 16px;
  min-width: 400px;
}

.tools-buttons {
  display: flex;
  justify-content: right;
  align-items: center;
}

.tools-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f6f8;
  border-radius: none;
  border: none;
  height: 24px;
}

.button-create {
  height: 20px;
  border: 1px solid #1979cf;
  border-radius: 15px;
  background: #d6ecf4;
  color: #1979cf;
  margin: 10px 10px 10px 0;
  transition: 0.3s;
  width: 130px;
}

.button-create:hover {
  background: #1979cf;
  color: #ffffff;
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
  margin-right: 10px;
}

.icon-add-to-menu:hover {
  fill: #3796eb;
}

.scroll-container {
  max-height: 30vh;
  overflow: hidden;
  overflow-y: scroll;
  margin-right: 24px;
}

.group:hover {
  background: #a8dcef;
}

.group:active {
  background: #d6ecf4;
}

.group-item {
  display: flex;
  align-items: center;
  width: 100%;
}

.dish-item {
  height: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.group:last-child {
  margin-bottom: 15px;
}

.left-field {
  display: flex;
  align-items: center;
  justify-content: left;
}

.right-field {
  display: flex;
  align-items: center;
  justify-content: right;
  color: #7c8295;
  font-size: 10px;
}

.group-item label {
  font-size: 14px;
  color: #343e5c;
  margin: 3px 20px;
  padding: 0px 8px 0 8px;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
}

.group-item input {
  position: absolute;
  opacity: 0;
  z-index: -1;
}

.group-item label::after {
  position: absolute;
  right: 0;
  top: 0;
  display: block;
  text-align: center;
  -webkit-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s;
}

.checked {
  background: #d6ecf4;
}

.icon-edit {
  width: 16px;
  height: 16px;
  stroke: #343e5c;
  fill: none;
  margin-left: 10px;
  cursor: pointer;
  transition: 0.3s;
}

.icon-edit:hover {
  stroke: #3796eb;
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

.search {
  margin-left: 10px;
  width: 210px;
}
</style>
