<template>
  <div style="display: flex; justify-content: space-between">
    <div>
      <div v-for="dishesGroup in menu.dishesGroups" :key="dishesGroup.id">
        <div>{{ dishesGroup.name }}</div>
        <div v-for="dish in dishesGroup.dailyMenuItems" :key="dish.id">
          {{ dish.name }}
          <button @click="menu.removeMenuItem(dish.id)">Удалить блюдо</button>
        </div>
      </div>
    </div>
    <div>
      <div @click="addToMenu">Добавить в меню</div>
    </div>
    <div>
      <el-collapse>
        <el-collapse-item
          v-for="dishesGroup in dishesGroupsSource"
          :key="dishesGroup.id"
          :name="dishesGroup.name"
          :title="dishesGroup.name"
        >
          <div v-for="dishSample in dishesGroup.dishSamples" :key="dishSample">
            <button @click="dishesGroup.toggleSelectSample(dishSample.id)">Выбрать образец</button>
            <div @click="menu.addDishesFromSamples([dishSample])">{{ dishSample.name }} {{ dishSample.selected ? 'Выбран' : '' }}</div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, Ref, ref } from 'vue';

import IDailyMenu from '@/interfaces/IDailyMenu';
import IDishesGroup from '@/interfaces/IDishesGroup';
import IDishSample from '@/interfaces/IDishSample';
import Provider from '@/services/Provider';
import removeFromClass from '@/services/removeFromClass';
export default defineComponent({
  name: 'AddDish',
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
</style>
