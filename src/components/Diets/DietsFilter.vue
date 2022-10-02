<template>
  <FiltersWrapper>
    <template #header-right>
      <div class="age-select">
        <div class="title">Возраст</div>
        <div class="age-select">
          <el-select v-model="selectedDiet" class="m-2" placeholder="Возраст" @change="selectAge">
            <el-option v-for="item in getAgeOptions()" :key="item.id" :label="item.name" :value="item" />
          </el-select>
        </div>
      </div>
    </template>
    <template #header-left-top>
      <div class="item">
        <el-form-item style="margin: 0">
          <el-checkbox v-model="onlyDiabete" label="при диабете"></el-checkbox>
        </el-form-item>
      </div>
      <!-- <FilterCheckbox
        label='Обладатели статуса "Московский врач"'
        :table="schema.doctor.tableName"
        :col="schema.doctor.mosDoctorLink"
        :data-type="DataTypes.Boolean"
        :operator="Operators.NotNull"
        @load="$emit('load')"
      /> -->
      <div class="item">
        <el-form-item style="margin: 0">
          <el-checkbox v-model="onlyDiabete" label="для матерей"></el-checkbox>
        </el-form-item>
      </div>
    </template>
    <template #header-left-bottom>
      <!-- <el-form :style="{ maxWidth: `${maxWidth}${typeof maxWidth === 'number' ? 'px' : ''}` }">
          <el-form-item> -->
      <div class="menu-select">
        <div class="title">Меню</div>
        <div class="select">
          <el-select v-model="selectedDiet" class="m-2" placeholder="Диета" @change="selectDiet">
            <el-option v-for="item in getDietsOptions()" :key="item.id" :label="item.name" :value="item" />
          </el-select>
        </div>
      </div>
      <!-- </el-form-item>
        </el-form> -->
      <!-- <RemoteSearch :key-value="schema.diet.key" :max-width="300" placeholder="поиск" @select="selectSearch" /> -->
      <!-- <FilterCheckbox
        label='Обладатели статуса "Московский врач"'
        :table="schema.doctor.tableName"
        :col="schema.doctor.mosDoctorLink"
        :data-type="DataTypes.Boolean"
        :operator="Operators.NotNull"
        @load="$emit('load')"
      /> -->
      <!-- <FilterCheckbox
        label="С отзывами"
        :table="schema.doctor.tableName"
        :col="schema.doctor.commentsCount"
        :data-type="DataTypes.Number"
        :operator="Operators.Gt"
        @load="$emit('load')"
      /> -->
    </template>

    <template v-if="doctorsMode" #footer>
      строка под фильтрами *
      <!-- <SortList :models="createSortModels()" @load="$emit('load')" /> -->
    </template>
  </FiltersWrapper>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, Ref, ref } from 'vue';

import FiltersWrapper from '@/components/Filters/FiltersWrapper.vue';
import IDiet from '@/interfaces/IDiet';
import Provider from '@/services/Provider';
// import { DataTypes } from '@/interfaces/filters/DataTypes';
// import { Operators } from '@/interfaces/filters/Operators';

export default defineComponent({
  name: 'DietsFilter',
  components: { FiltersWrapper },

  setup() {
    const mounted = ref(false);
    const selectDiet = (diet: IDiet) => {
      Provider.store.commit('diets/set', diet);
    };
    const selectedDiet: Ref<IDiet> = computed(() => Provider.store.getters['diets/item']);
    const onlyDiabete: Ref<boolean> = ref(false);
    const getDietsOptions = (): IDiet[] => {
      return diets.value.filter((d: IDiet) => {
        if (onlyDiabete.value) {
          return d.diabetes;
        }
        return true;
      });
    };

    const getAgeOptions = (): IDiet[] => {
      return [];
    };

    const diets: Ref<IDiet[]> = computed(() => Provider.store.getters['diets/items']);

    onMounted(async () => {
      mounted.value = true;
    });

    return {
      getDietsOptions,
      getAgeOptions,
      onlyDiabete,
      selectedDiet,
      selectDiet,
      diets,
      mounted,
      // Operators,
      // DataTypes,
      schema: Provider.schema,
    };
  },
});
</script>

<style scoped lang="scss">
.item {
  margin-right: 20px;
}

.age-select {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  font-size: 14px;
  color: #606266;
}

.menu-select {
  display: flex;
  justify-content: left;
  width: 100%;
}

.title {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
}

.select {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 800px;
}

.age-select {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
}

:deep(.el-input__inner) {
  border-radius: 20px;
  border: 1px solid #e3e8f0;
  width: 100%;
}

:deep(.el-select) {
  width: 100%;
}
</style>
