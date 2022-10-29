<template>
  <PageWrapper v-if="mounted" title="Питание и диеты">
    <FiltersWrapper>
      <template #header-left-top>
        <div class="route-block">
          <button v-if="selectedGroup" class="diet-router" @click="toMenu">Мeню&nbsp;выбора/</button>
          <div v-for="item in DietRouter" :key="item.id">
            <button v-if="item.goBack == 'toDiet'" class="diet-router" @click="toDiet">{{ item.name }}/</button>
            <button v-if="item.goBack == 'toAge'" class="diet-router" @click="toAge">{{ item.name }}/</button>
            <button v-if="item.goBack == 'noLink'" class="diet-router-no-link" @click="toAge" >{{ item.name }}</button>
          </div>
        </div>
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
          <h2 v-if="selectedDiet && selectedAge" style="text-align: center">{{ selectedDiet.siteName }}</h2>
          <DietPage v-if="selectedDiet && selectedAge" :timetable="selectedAge.timetable" />
          <div v-if="motherDiet && selectedAge">
            <h2 v-if="motherDiet" style="text-align: center">{{ motherDiet.siteName }}</h2>
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

import { v4 as uuidv4 } from 'uuid';

export default defineComponent({
  name: 'DietsSelect',
  components: { DietPage, PageWrapper, FiltersWrapper },

  setup() {
    const selectedGroup: Ref<IDietGroup | undefined> = ref(undefined);
    const selectedDiet: Ref<IDiet | undefined> = ref(undefined);
    const motherDiet: Ref<IDiet | undefined> = ref(undefined);
    const selectedAge: Ref<IDietAge | undefined> = ref(undefined);
    const dietsGroups: ComputedRef<IDietGroup[]> = computed<IDietGroup[]>(() => Provider.store.getters['dietsGroups/items']);
    const DietRouter: { id: string, name: string, goBack: string }[] = [];
    const load = async () => {
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
        DietRouter.push({id: uuidv4(), name: age.name, goBack: "noLink"});
        DietRouter[0].goBack = "toAge";
        if (DietRouter[2].goBack) {
          DietRouter[1].goBack = "toAge";
          DietRouter[0].goBack = "toDiet";
        }
    };

    const selectDiet = (diet: IDiet): void => {
      selectedDiet.value = diet;
      DietRouter[0].goBack = "toDiet";
      DietRouter.push({id: uuidv4(), name: diet.siteName, goBack: "noLink"});

      if (selectedDiet.value?.dietAges.length === 1) {
        selectAge(selectedDiet.value?.dietAges[0]);
        DietRouter.pop();
        DietRouter[1].goBack = "noLink";
      }
    };

    const selectGroup = (group: IDietGroup): void => {
      selectedGroup.value = group;
      DietRouter.push({id: uuidv4(), name: group.name, goBack: "noLink"});
      if (selectedGroup.value?.diets.length === 1) {
        selectDiet(selectedGroup.value?.diets[0]);
        DietRouter.pop();
        DietRouter[0].goBack = "noLink";
      }
    };

    const toMenu  = (): void => {
      selectedAge.value = undefined;
      selectedGroup.value = undefined;
      selectedDiet.value = undefined;
      DietRouter.pop();
      DietRouter.pop();
      DietRouter.pop();
      DietRouter.pop();
      return;
    };

    const toDiet  = (): void => {
      if (selectedGroup.value?.diets.length === 1) {
        selectedGroup.value = undefined;
        selectedAge.value = undefined;
        selectedDiet.value = undefined;
        DietRouter.pop();

      } else {
        selectedAge.value = undefined;
        selectedDiet.value = undefined;
        DietRouter.pop();
        DietRouter[0].goBack = "noLink";
        if (DietRouter[1].goBack) {
          DietRouter[0].goBack = "toDiet";
          DietRouter.pop()
        }
        return;
      }
    };

    const toAge  = (): void => {
      if (selectedDiet.value?.dietAges.length === 1) {
      selectedAge.value = undefined;
      selectedDiet.value = undefined;
      DietRouter.pop();
      DietRouter[0].goBack = "noLink";
      } else {
        selectedAge.value = undefined;
        DietRouter.pop();
        DietRouter[0].goBack = "noLink";
        if (DietRouter[1]) {
          DietRouter[0].goBack = "toDiet";
          DietRouter[1].goBack = "noLink";
        }
      }
      return;
    };
    

    return {
      selectAge,
      selectDiet,
      selectGroup,
      selectedAge,
      selectedDiet,
      selectedGroup,
      dietsGroups,
      mounted: Provider.mounted,
      motherDiet,
      toMenu,
      toDiet,
      toAge,
      DietRouter,
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
  margin:0;
  padding:0;
  text-decoration: none;
  display: inline-block;
  border: none;
  background-color: #ffffff;
}

.diet-router {
  font-size: 14px;
  margin:0;
  padding:0;
  cursor: pointer;
  color: $site_gray;
  white-space: nowrap;
  height: 20px;
}

.diet-router:hover {
  color: $site_dark_gray;
}

.diet-router-no-link {
  margin:0;
  padding:0;
  color: $site_dark_gray;
  white-space: nowrap;
  height: 25px;
  font-size: 14px;
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
  cursor: pointer;
  color: $site_gray;
  font-size: 20px;
  height: 40px;
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
  padding-left: 20px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: left;
  width: 400px;
  font-size: 14px;
  border-radius: $normal-border-radius;
  color: $site_gray;
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
  padding-left: 20px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: left;
  width: 150px;
  font-size: 14px;
  border-radius: $normal-border-radius;
  margin-left: 30px;
  color: $site_gray;
}

.field-item-2:hover {
  background: #2754eb;
  color: #ffffff;
}

.field-item-3 {
  padding-left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  margin: 25px 10px 0 10px;
  color: $site_gray;
}


.choice-item-router {
  display: inline-block;
  position: absolute;
  top: 150px;
}

.route-block {
  display: flex;
  justify-content: left;
  align-items: center;
}




</style>
