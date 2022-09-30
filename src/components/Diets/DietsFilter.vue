<template>
  <FiltersWrapper>
    <template #header-right>
      <!-- <FilterSelect
        :max-width="200"
        placeholder="Возраст"
        :options="schema.diet.options"
        :table="schema.diet.tableName"
        :col="schema.diet.agePeriodId"
        :data-type="DataTypes.String"
        :operator="Operators.Eq"
        @load="$emit('load')"
      /> -->
      Возраст
    </template>
    <template #header-left-top>
      <el-form-item style="margin: 0">
        <el-checkbox v-model="onlyDiabete"></el-checkbox>
      </el-form-item>
      <!-- <FilterCheckbox
        label='Обладатели статуса "Московский врач"'
        :table="schema.doctor.tableName"
        :col="schema.doctor.mosDoctorLink"
        :data-type="DataTypes.Boolean"
        :operator="Operators.NotNull"
        @load="$emit('load')"
      /> -->
      при диабете, для матерей
    </template>
    <template #header-left-bottom>
      <!-- <el-form :style="{ maxWidth: `${maxWidth}${typeof maxWidth === 'number' ? 'px' : ''}` }">
          <el-form-item> -->
      <el-select v-model="selectedDiet" class="m-2" placeholder="Диета" @change="selectDiet">
        <el-option v-for="item in getDietsOptions()" :key="item.id" :label="item.name" :value="item" />
      </el-select>
      <!-- </el-form-item>
        </el-form> -->
      <!-- <RemoteSearch :key-value="schema.diet.key" :max-width="300" placeholder="поиск" @select="selectSearch" /> -->
      вторая строка, тут будет меню выбора
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

    const diets: Ref<IDiet[]> = computed(() => Provider.store.getters['diets/items']);

    onMounted(async () => {
      mounted.value = true;
    });

    return {
      getDietsOptions,
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

<style scoped lang="scss"></style>
