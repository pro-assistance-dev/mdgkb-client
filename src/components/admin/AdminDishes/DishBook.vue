<template>
  <div class="block-container">
    <div class="dishesGroup">
      <div class="tools">
        <div class="tools-title">
          Книга блюд
          <!-- <button class="tools-button">
            <svg class="icon-edit">
              <use xlink:href="#profile-edit"></use>
            </svg>
          </button> -->
        </div>
        <div class="tools-buttons">
          <!-- <button class="button-create">Создать блюдо</button> -->
          <button class="tools-button" @click="addToMenu">
            <svg class="icon-add-to-menu">
              <use xlink:href="#add-to-menu"></use>
            </svg>
          </button>
        </div>
      </div>
      <div class="column">
        <!-- <div v-for="dishesGroupItem in dishesGroups" :key="dishesGroupItem.id"> -->
        <div>
          <!-- <CollapsContainer :tab-id="dishesGroupItem.id" :collapsed="true"> -->
          <CollapsContainer :tab-id="1" :collapsed="true">
            <template #inside-title>
              <div class="title-in">
                <!-- {{ dishesGroupItem.name }} -->
                Первые блюда
              </div>
            </template>
            <template #inside-content>
              <!-- <div class="group" v-for="dishSampleItem in dishedSamples" :key="dishSampleItem.id"> -->
              <div class="group">
                <div class="group-item">
                  <input :id="999" type="checkbox" />
                  <label :for="999">
                    <div class="dish-item">
                      <div class="left-field">Суп диетический</div>
                      <div class="right-field">50 гр/25,00руб/100ккал</div>
                    </div>
                  </label>
                </div>

                <div class="group-item">
                  <input :id="998" type="checkbox" />
                  <label :for="998">
                    <div class="dish-item">
                      <div class="left-field">Суп с фрикадельками</div>
                      <div class="right-field">50 гр/25,00руб/100ккал</div>
                    </div>
                  </label>
                </div>

                <div class="group-item">
                  <input :id="997" type="checkbox" />
                  <label :for="997">
                    <div class="dish-item">
                      <div class="left-field">Суп с вермишелью</div>
                      <div class="right-field">50 гр/25,00руб/100ккал</div>
                    </div>
                  </label>
                </div>

                <div class="group-item">
                  <input :id="996" type="checkbox" />
                  <label :for="996">
                    <div class="dish-item">
                      <div class="left-field">Бульон куриный</div>
                      <div class="right-field">50 гр/25,00руб/100ккал</div>
                    </div>
                  </label>
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
    const dishesGroups: Ref<IDishesGroup[]> = ref(dishesGroupsSource.value.filter((d: IDishesGroup) => d.dailyMenuItems.length > 0));

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
    };

    return {
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
  min-width: 200px;
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

.group-item label:hover {
  background: #e5e5e5;
}

.group-item input:checked ~ label {
  background: #d6ecf4;
}

.icon-edit {
  width: 16px;
  height: 16px;
  stroke: #a3a9be;
  fill: none;
  margin-left: 10px;
  cursor: pointer;
}

.icon-edit:hover {
  stroke: #3796eb;
}
</style>
