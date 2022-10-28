<template>
  <PageWrapper v-if="mounted" title="Питание и диеты">
    <FiltersWrapper>
      <template #header-left-top>
        <button v-if="selectedGroup" class="back" @click="toBack">Назад</button>
        <div class="field-2">
          <template v-if="!selectedGroup">
            <div v-for="dietGroup in dietsGroups" :key="dietGroup.id" class="field-item-3">
              <button class="choice-item" @click="selectGroup(dietGroup)">
                {{ dietGroup.name }}
              </button>
            </div>
          </template>
        </div>
      </template>
      <template #header-left-bottom>
        <template v-if="selectedGroup && !selectedDiet">
          <div class="field">
            <button v-for="diet in selectedGroup.diets" :key="diet.id" class="field-item" @click="selectDiet(diet)">
              {{ diet.siteName }}
            </button>
          </div>
        </template>
        <template v-if="selectedDiet && !selectedAge">
          <div class="field-2">
            <button v-for="dietAge in selectedDiet.dietAges" :key="dietAge.id" class="field-item-2" @click="selectAge(dietAge)">
              {{ dietAge.name }}
            </button>
          </div>
        </template>
      </template>
      <template #footer>
        <div class="page">
          <h3 v-if="selectedDiet && selectedAge" style="text-align: left; color:#A1A7BD; margin:10px 0px 20px 20px">{{ selectedDiet.siteName }}</h3>
          <DietPage v-if="selectedDiet && selectedAge" :timetable="selectedAge.timetable" />
          <div v-if="motherDiet && selectedAge">
            <h3 v-if="motherDiet" style="text-align: left; color:#A1A7BD; margin:10px 0px 20px 20px">{{ motherDiet.siteName }}</h3>
            <DietPage v-if="selectedDiet && selectedAge && motherDiet" :timetable="motherDiet.dietAges[0].timetable" />
            <div></div>
          </div>
        </div>
      </template>
    </FiltersWrapper>
  </PageWrapper>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, Ref, ref } from 'vue';

import DietPage from '@/components/Diets/DietPage.vue';
import FiltersWrapper from '@/components/Filters/FiltersWrapper.vue';
import PageWrapper from '@/components/PageWrapper.vue';
import IDiet from '@/interfaces/IDiet';
import IDietAge from '@/interfaces/IDietAge';
import IDietGroup from '@/interfaces/IDietGroup';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';

export default defineComponent({
  name: 'DietsPage',
  components: { DietPage, PageWrapper, FiltersWrapper },

  setup() {
    const selectedGroup: Ref<IDietGroup | undefined> = ref(undefined);
    const selectedDiet: Ref<IDiet | undefined> = ref(undefined);
    const motherDiet: Ref<IDiet | undefined> = ref(undefined);
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
      if (selectedAge.value && selectedGroup.value && selectedDiet.value?.motherDietId) {
        dietsGroups.value.forEach((dg: IDietGroup) => {
          const md = dg.diets.find((d: IDiet) => d.id === selectedDiet.value?.motherDietId);
          if (md) {
            motherDiet.value = md;
          }
        });
      }
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
      motherDiet,
    };
  },
});
</script>

<style scoped lang="scss">
@import '@/assets/styles/elements/base-style.scss';

.container-160 {
  height: 160px;
}
.header-choice {
  height: 100px;
  background: #ffffff;
}

button {
  height: 40px;
  font-size: 20px;
  text-decoration: none;
  display: inline-block;
  border: none;
  background-color: #ffffff;
  cursor: pointer;
  color: $site_gray;
}

button:hover {
  color: $site_dark_gray;
}

.back {
  color: $site_gray;
  font-size: 16px;
}

.back:hover {
  color: $site_dark_gray;
}

.choice-item {
  display: inline-block;
  position: relative;
}

.choice-item:after {
  display: block;
  content: '';
  width: 95%;
  height: 6px;
  margin-top: 10px;
  transition: transform 0.3s ease-in-out;
  border-radius: 20px;
  padding: 0 1px;
  transition: 0.3s linear;
}

.choice-item:hover:after {
  height: 6px;
  background: transparent;
  border-radius: 6px;
  border: 1px solid #2754eb;
  background: #2754eb;
}

.page {
  width: 100%;
}

.field {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
}

.field-item {
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: left;
  width: 400px;
  font-size: 14px;
  border-radius: $normal-border-radius;
}

.field-item:hover {
  background: #2754eb;
  color: #ffffff;
}

.field-2 {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
}

.field-item-2 {
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: left;
  width: 150px;
  font-size: 14px;
  border-radius: $normal-border-radius;
  margin-left: 30px;
}

.field-item-2:hover {
  background: #2754eb;
  color: #ffffff;
}

.field-item-3 {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  margin: 25px 10px 0 10px;
}
</style>
