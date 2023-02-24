<template>
  <!-- <div style="display: flex; justify-content: space-between"> -->
  <div>
    <div>
      <div v-for="dishesGroup in menu.dishesGroups" :key="dishesGroup.id">
        <div>{{ dishesGroup.name }}</div>
        <div v-for="dish in dishesGroup.dailyMenuItems" :key="dish.id">
          {{ dish.name }}
          <button @click="menu.removeMenuItem(dish.id)">Удалить блюдо</button>
        </div>
      </div>
    </div>
    <div class="block-container">
      <div class="dishesGroup">
        <div class="tools">
          <div class="tools-title">Книга блюд</div>
          <div class="tools-buttons">
            <button class="button-create">Создать блюдо</button>
            <button class="tools-button">
              <svg class="icon-add-to-menu">
                <use xlink:href="#add-to-menu" />
              </svg>
            </button>
            <!-- <div @click="addToMenu">Добавить в меню</div>  -->
          </div>
        </div>
        <div class="column">
          <div v-for="dishesGroup in dishesGroupsSource" :key="dishesGroup.id" :name="dishesGroup.name" :title="dishesGroup.name">
            <CollapseItem :tab-id="dishesGroup.id">
              <template #inside-title>
                <div class="title-in">
                  {{ dishesGroup.name }}
                </div>
              </template>
              <template #inside-content>
                тест
                <div v-for="dishSample in dishesGroup.dishSamples" :key="dishSample">
                  <button @click="dishesGroup.toggleSelectSample(dishSample.id)">Выбрать образец</button>
                  <div @click="menu.addDishesFromSamples([dishSample])">
                    {{ dishSample.name }} {{ dishSample.selected ? 'Выбран' : '' }}
                  </div>
                </div>
              </template>
            </CollapseItem>
          </div>
        </div>
      </div>
      <div class="menusGroup">
        <div class="tools">
          <div class="tools-title">Меню</div>
          <div class="tools-buttons">
            <button class="tools-button">
              <svg class="icon-delete">
                <use xlink:href="#delete" />
              </svg>
            </button>
            <button class="tools-button">
              <svg class="icon-save">
                <use xlink:href="#save" />
              </svg>
            </button>
          </div>
        </div>
        <div class="column" />
      </div>
    </div>
  </div>
  <AddToMenu />
  <Save />
  <Delete />
</template>

<script lang="ts">
import { computed, defineComponent, PropType, Ref, ref } from 'vue';

import AddToMenu from '@/assets/svg/Buffet/AddToMenu.svg';
import Delete from '@/assets/svg/Buffet/Delete.svg';
import Save from '@/assets/svg/Buffet/Save.svg';
import CollapseItem from '@/components/Main/Collapse/CollapseItem.vue';
import IDailyMenu from '@/interfaces/IDailyMenu';
import IDishesGroup from '@/interfaces/IDishesGroup';
import IDishSample from '@/interfaces/IDishSample';
import Provider from '@/services/Provider';

export default defineComponent({
  name: 'AddDish',
  components: {
    CollapseItem,
    AddToMenu,
    Save,
    Delete,
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
}

.tools {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 32px;
  border-bottom: 1px solid #c4c4c4;
  background: #f5f6f8;
  padding: 0 10px;
  margin-bottom: 5px;
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
  height: 20px;
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
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f6f8;
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
</style>
