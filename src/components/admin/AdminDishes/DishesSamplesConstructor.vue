<template>
  <div style="display: flex; justify-content: space-between">
    <div>
      <div>
        <button @click="addDishesGroup">Создать категорию</button>
      </div>
      <div v-if="dishesGroupConstructorVisible">
        <el-form-item>
          <el-input v-model="dishesGroup.name" placeholder="Введите название"></el-input>
        </el-form-item>
        <el-button @click="saveDishesGroup">Сохранить</el-button>
      </div>

      <div v-for="dishesGroupItem in dishesGroups" :key="dishesGroupItem.id">
        <div>{{ dishesGroupItem.name }}</div>
        <el-button @click="removeDishesGroup(dishesGroupItem.id)">Удалить</el-button>
      </div>
    </div>
    <div>
      <div>
        <button @click="addDishesSample">Создать блюдо</button>
      </div>
      <div v-show="dishSampleConstructorVisible">
        <el-form-item>
          <el-input v-model="dishSample.name" placeholder="Введите название"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input-number v-model="dishSample.caloric" placeholder="Калории"></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-input-number v-model="dishSample.weight" placeholder="Выход, грамм"></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-input-number v-model="dishSample.price" placeholder="Цена"></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-select v-model="dishSample.dishesGroupId" filterable placeholder=" " style="width: 365px">
            <el-option v-for="item in dishesGroups" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-button @click="saveDishSample">Сохранить</el-button>
      </div>

      <div v-for="dishSampleItem in dishedSamples" :key="dishSampleItem.id">
        <div>{{ dishSampleItem.name }}</div>
        <el-button @click="removeDishSample(dishSampleItem.id)">Удалить</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';

import IDailyMenu from '@/interfaces/IDailyMenu';
import IDishesGroup from '@/interfaces/IDishesGroup';
import IDishSample from '@/interfaces/IDishSample';
import Provider from '@/services/Provider';
import removeFromClass from '@/services/removeFromClass';
export default defineComponent({
  name: 'DishesSamplesConstructor',
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
  setup() {
    const dishesGroups: Ref<IDishesGroup[]> = computed(() => Provider.store.getters['dishesGroups/items']);
    const dishesGroup: Ref<IDishesGroup> = computed(() => Provider.store.getters['dishesGroups/item']);
    const dishSampleConstructorVisible: Ref<boolean> = ref(false);

    const dishedSamples: Ref<IDishSample[]> = computed(() => Provider.store.getters['dishesSamples/items']);
    const dishSample: Ref<IDishSample> = computed(() => Provider.store.getters['dishesSamples/item']);
    const dishesGroupConstructorVisible: Ref<boolean> = ref(false);

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
