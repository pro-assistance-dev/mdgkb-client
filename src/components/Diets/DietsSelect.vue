<template>
  <PageWrapper v-if="mounted" title="Питание и диеты">
    <FiltersWrapper>
      <template #header-left-top>
          <button class="back" v-if="selectedGroup" @click="toBack">Назад</button>
          <div class="field-2">
            <template v-if="!selectedGroup">
              <div v-for="dietGroup in dietsGroups" :key="dietGroup.id" class="field-item-3">
                <button class="choice-item"  @click="selectGroup(dietGroup)">
                  {{ dietGroup.name }}
                </button>
              </div>
            </template>
          </div>
      </template>
      <template #header-left-bottom>
        <template v-if="selectedGroup && !selectedDiet">
          <div class="field">
            <button class="field-item" v-for="diet in selectedGroup.diets" :key="diet.id" @click="selectDiet(diet)">
              {{ diet.siteName }}
            </button>
          </div>
        </template>
        <template v-if="selectedDiet && !selectedAge">
          <div class="field-2">
            <button class="field-item-2" v-for="dietAge in selectedDiet.dietAges" :key="dietAge.id" @click="selectAge(dietAge)">
              {{ dietAge.name }}
            </button>
          </div>
        </template>
      </template>
      <template #footer>
        <div class="page">
          <DietPage v-if="selectedDiet && selectedAge" :timetable="selectedAge.timetable" :mother-timetable="selectedDiet" />
        </div>
      </template> 
    </FiltersWrapper>
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
import FiltersWrapper from '@/components/Filters/FiltersWrapper.vue';

export default defineComponent({
  name: 'DietsPage',
  components: { DietPage, PageWrapper, FiltersWrapper  },

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
  position:relative;
}

.choice-item:after {
  display:block;
  content: '';
  width:95%;
  height:6px;
  margin-top:10px;
  transition: transform 0.3s ease-in-out;
  border-radius:20px;
  padding:0 1px;
  transition:.3s linear;
}

.choice-item:hover:after{
  height:6px;
  background:transparent;
  border-radius:6px;
  border:1px solid #2754EB;
  background:#2754EB;
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
  background: #2754EB;
  color:#ffffff;

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
  background: #2754EB;
  color:#ffffff; 
}

.field-item-3 {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  margin: 25px 10px 0 10px;
}


</style>
