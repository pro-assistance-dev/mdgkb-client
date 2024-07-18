<template>
  <div class="container">
    <div class="program-header">
      <!--      <div>{{ paidProgram.paidProgramsGroup.name }}</div>-->
      <div class="prog">
        {{ paidProgram.name }}
      </div>
    </div>
    <div class="program-body">
      <div class="program-body-services">
        <div
          v-for="servicesGroup in paidProgram.getSelectedPackage().paidProgramServicesGroups"
          :key="servicesGroup.id"
          class="program-body-services-card"
        >
          <h5>{{ servicesGroup.name }}</h5>
        </div>
      </div>
      <div class="program-body-options">
        <div v-for="optionsGroup in paidProgram.paidProgramOptionsGroups" :key="optionsGroup.id">
          <h4>{{ optionsGroup.name }}</h4>
          <ul>
            <li v-for="option in optionsGroup.paidProgramOptions" :key="option.id">
              <button
                :class="{ 'option-selected': option.selected }"
                :disabled="!option.available"
                @click="paidProgram.selectOption(option)"
              >
                {{ option.name }}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';

import IPaidProgram from '@/interfaces/IPaidProgram';

const route = useRoute();
const mounted: Ref<boolean> = ref(false);
const paidProgram: IPaidProgram = PaidProgramsStore.Item();

onBeforeMount(async () => {
  await PaidProgramsStore.Get(route.params['id']);
  mounted.value = true;
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
.program {
  &-body {
    display: flex;

    &-services {
      &-card {
        background: #7a7a7a;
      }
    }

    &-options {
      display: flex;
    }
  }
}

.option-selected {
  background: red;
  color: #01bcee;
}
</style>
