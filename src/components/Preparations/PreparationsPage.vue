<template>
  <div class="header-center">
    <h1>Подготовки к исследованиям</h1>
  </div>
  <div class="header-center">
    <h2 v-if="curStep < 2">ВЫБЕРИТЕ СПОСОБ ОПЛАТЫ, ИССЛЕДОВАНИЕ И ПРЕДПОЛАГАЕМУЮ ДАТУ</h2>
    <el-button v-if="curStep === 0" @click="curStep = 1">омс</el-button>
    <el-button v-if="curStep === 0" @click="curStep = 1">дмс</el-button>
  </div>
  <div v-if="curStep === 1" style="display: flex; margin: 0 25%">
    <div>
      <h2>Инструментальные</h2>
      <div v-for="preparition in preparations.filter((p) => !p.laboratory)" :key="preparition.id">
        <span class="preparation" @click="toStepTwo(preparition)">{{ preparition.name }}</span>
      </div>
    </div>
    <div>
      <h2>Лабораторные</h2>
      <div v-for="preparition in preparations.filter((p) => p.laboratory)" :key="preparition.id">
        <span class="preparation" @click="toStepTwo(preparition)">{{ preparition.name }}</span>
      </div>
    </div>
  </div>
  <div v-if="curStep === 2" style="margin: 0 25%">
    <div class="header-center">
      <h2>ОЗНАКОМЬТЕСЬ С РЕКОМЕНДАЦИЯМИ И ПРАВИЛАМИ ПОДГОТОВКИ К ИССЛЕДОВАНИЮ</h2>
    </div>
    <ul v-for="groupRules in preparation.preparationRulesGroups.slice(0, 5)" :key="groupRules.id">
      <li>
        {{ groupRules.name }}
        <ul>
          <li v-for="rule in groupRules.preparationRules" :key="rule">{{ rule.name }}</li>
        </ul>
      </li>
    </ul>
    <el-checkbox v-model="curStepTwoAgree">Я подверждаю, что ознакомился</el-checkbox>
    <div>
      <el-button @click="toStepOne()">Назад</el-button>
      <el-button :disabled="!curStepTwoAgree" @click="toStepThree()">Далее</el-button>
    </div>
  </div>
  <div v-if="curStep === 3" style="margin: 0 25%">
    <h2>ОЗНАКОМЬТЕСЬ С УСЛОВИЯ ХРАНЕНИЯ ВЗЯТИЯ, СДАЧИ И ХРАНЕНИЯ БИОМАТЕРИАЛА</h2>
    <ul v-for="groupRules in preparation.preparationRulesGroups.slice(5)" :key="groupRules.id">
      <li>
        {{ groupRules.name }}
        <ul>
          <li v-for="rule in groupRules.preparationRules" :key="rule">{{ rule.name }}</li>
        </ul>
      </li>
    </ul>
    <el-checkbox v-model="curStepThreeAgree">Я подверждаю, что ознакомился</el-checkbox>
    <div>
      <el-button @click="toStepOne()">Назад</el-button>
      <el-button :disabled="!curStepThreeAgree" @click="toStepFour()">Далее</el-button>
    </div>
  </div>
  <div v-if="curStep === 4">
    <div class="header-center">
      <h2>ПОЖАЛУЙСТА, УКАЖИТЕ ДАННЫЕ И ПРЕДОСТАВЬТЕ НЕОБХОДИМЫЕ ДОКУЕНТЫ</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, Ref, ref } from 'vue';

import Preparation from '@/classes/Preparation';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'PreparationsPage',
  async setup() {
    const preparations: ComputedRef<Preparation[]> = computed<Preparation[]>(() => Provider.store.getters['preparations/items']);
    const preparation: ComputedRef<Preparation> = computed<Preparation>(() => Provider.store.getters['preparations/item']);
    const curStep: Ref<number> = ref(0);
    const curStepTwoAgree: Ref<boolean> = ref(false);
    const curStepThreeAgree: Ref<boolean> = ref(false);

    Hooks.onBeforeMount(async () => {
      await Provider.store.dispatch('preparations/getAll');
    });

    const toStepTwo = (selectedPreparation: Preparation): void => {
      Provider.store.commit('preparations/set', selectedPreparation);
      curStep.value = 2;
    };

    const toStepOne = (): void => {
      curStepTwoAgree.value = false;
      curStep.value = 1;
    };

    const toStepFour = (): void => {
      curStep.value = 4;
    };

    const toStepThree = (): void => {
      if (!preparation.value.laboratory) {
        toStepFour();
        return;
      }
      curStep.value = 3;
    };

    return {
      curStepThreeAgree,
      toStepThree,
      toStepFour,
      toStepOne,
      curStepTwoAgree,
      preparation,
      toStepTwo,
      curStep,
      preparations,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/collapse.scss';

.preparation {
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}
</style>
