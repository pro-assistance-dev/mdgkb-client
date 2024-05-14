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

<script lang="ts">
import { computed, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import IPaidProgram from '@/interfaces/IPaidProgram';

export default defineComponent({
  name: 'PaidProgramPage',
  components: {},
  setup() {
    const store = useStore();
    const route = useRoute();
    const mounted: Ref<boolean> = ref(false);
    const form = ref();
    const paidProgram: Ref<IPaidProgram> = computed<IPaidProgram>(() => store.getters['paidPrograms/item']);

    onBeforeMount(async () => {
      await store.dispatch('paidPrograms/get', route.params['id']);
      mounted.value = true;
    });

    return {
      mounted,
      paidProgram,
      form,
    };
  },
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
