<template>
  <PageWrapper v-if="mounted" title="Диеты">
    <el-button v-if="selectedGroup" @click="toBack">Назад</el-button>
    <template v-if="!selectedGroup">
      <el-button v-for="dietGroup in dietsGroups" :key="dietGroup.id" @click="selectGroup(dietGroup)">
        {{ dietGroup.name }}
      </el-button>
    </template>
    <template v-if="selectedGroup && !selectedDiet">
      <el-button v-for="diet in selectedGroup.diets" :key="diet.id" @click="selectDiet(diet)">
        {{ diet.siteName }}
      </el-button>
    </template>
    <template v-if="selectedDiet && !selectedAge">
      <el-button v-for="dietAge in selectedDiet.dietAges" :key="dietAge.id" @click="selectAge(dietAge)">
        {{ dietAge.name }}
      </el-button>
    </template>
    <DietPage v-if="selectedDiet && selectedAge" :timetable="selectedAge.timetable" :mother-timetable="selectedDiet" />
  </PageWrapper>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, Ref, ref } from 'vue';

import DietPage from '@/components/Diets/DietPage.vue';
import PageWrapper from '@/components/PageWrapper.vue';
import IDiet from '@/interfaces/IDiet';
import IDietAge from '@/interfaces/IDietAge';
import IDietGroup from '@/interfaces/IDietGroup';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';

export default defineComponent({
  name: 'DietsPage',
  components: { DietPage, PageWrapper },

  setup() {
    const selectedGroup: Ref<IDietGroup | undefined> = ref(undefined);
    const selectedDiet: Ref<IDiet | undefined> = ref(undefined);
    const selectedAge: Ref<IDietAge | undefined> = ref(undefined);
    const dietsGroups: ComputedRef<IDietGroup[]> = computed<IDietGroup[]>(() => Provider.store.getters['dietsGroups/items']);
    const load = async () => {
      // Provider.store.dispatch('meta/getOptions', Provider.schema.value.agePeriod);
      await loadDiets();
    };

    Hooks.onBeforeMount(load);

    const loadDiets = async () => {
      await Provider.store.dispatch('dietsGroups/getAll', Provider.filterQuery.value);
    };

    const selectAge = (age: IDietAge): void => {
      selectedAge.value = age;
    };

    const selectDiet = (diet: IDiet): void => {
      selectedDiet.value = diet;
      if (selectedDiet.value?.dietAges.length === 1) {
        selectAge(selectedDiet.value?.dietAges[0]);
      }
    };

    const selectGroup = (group: IDietGroup): void => {
      selectedGroup.value = group;
      if (selectedGroup.value?.diets.length === 1) {
        selectDiet(selectedGroup.value?.diets[0]);
      }
    };

    const toBack = (): void => {
      if (selectedAge.value) {
        selectedAge.value = undefined;
        if (selectedDiet.value?.dietAges.length === 1) {
          selectedDiet.value = undefined;
        }
        if (selectedGroup.value?.diets.length === 1) {
          selectedDiet.value = undefined;
        }
        if (selectedGroup.value?.diets.length === 1) {
          selectedGroup.value = undefined;
        }
        return;
      }
      if (selectedDiet.value) {
        if (selectedDiet.value?.dietAges.length === 1) {
          selectedAge.value = undefined;
        }
        if (selectedGroup.value?.diets.length === 1) {
          selectedGroup.value = undefined;
        }
        selectedDiet.value = undefined;
        return;
      }
      if (selectedGroup.value) {
        selectedGroup.value = undefined;
        return;
      }
    };

    return {
      toBack,
      selectAge,
      selectDiet,
      selectGroup,
      selectedAge,
      selectedDiet,
      selectedGroup,
      dietsGroups,
      mounted: Provider.mounted,
    };
  },
});
</script>

<style scoped lang="scss"></style>
