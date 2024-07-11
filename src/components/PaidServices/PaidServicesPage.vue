<template>
  <div v-if="scrollOffset >= 300" class="spacer">&nbsp;</div>
  <div class="paid-services">
    <h1>Платные услуги</h1>
    <div :class="{ fixed: scrollOffset >= 300 }">
      <el-card style="max-width: 1344px; margin: 0 auto 20px; border-radius: 10px">
        <div class="sum-card">
          <div class="sum">Сумма: {{ sum }} рублей.</div>
          <h2 v-if="scrollOffset >= 150" style="margin: 0">Платные услуги</h2>
          <PButton skin="profile" text="Очистить выбор" width="130px" margin="0" @click="clearSelectedService()" />
        </div>
      </el-card>
    </div>

    <div v-if="mounted">
      <PaidServicesTable ref="ginService" :services="paidServices" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, Ref, ref } from 'vue';

import PaidServicesTable from '@/components/PaidServices/PaidServicesTable.vue';
import IPaidService from '@/interfaces/IPaidService';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'PaidServices',
  components: { PaidServicesTable },
  setup() {
    let sum = ref(0);
    const scrollOffset = ref(0);
    const previousOffset = ref(0);
    const rememberedOffset = ref(0);
    const paidServices: Ref<IPaidService[]> = computed<IPaidService[]>(() => Provider.store.getters['paidServices/items']);

    const handleScroll = () => {
      if (scrollOffset.value > previousOffset.value && rememberedOffset.value != 0) {
        rememberedOffset.value = 0;
      }
      previousOffset.value = scrollOffset.value;
      scrollOffset.value = window.scrollY;
    };

    const load = async () => {
      await Provider.store.dispatch('paidServices/getAll');
    };

    Hooks.onBeforeMount(load);

    onMounted(() => window.addEventListener('scroll', handleScroll));
    onUnmounted(() => window.removeEventListener('scroll', handleScroll));

    return {
      mounted: Provider.mounted,
      paidServices,
      // clearSelectedService,
      sum,
      scrollOffset,
      previousOffset,
      rememberedOffset,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
.sum {
  height: 100%;
  display: flex;
  align-items: center;
}

.sum-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.affix {
  width: 100%;
  .sum-card {
    text-align: center;
  }
}

.paid-services {
  text-align: center;
  margin-bottom: 400px;
}

.fixed {
  position: fixed;
  top: 57px;
  left: 0;
  width: 100%;
  z-index: 100;
}

.spacer {
  width: 100%;
  height: 80px;
}
</style>
