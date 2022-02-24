<template>
  <h2>Международное сотрудничество</h2>
  <div class="card-item">
    <ul>
      <li>
        <a
          target="_blank"
          href="http://xn--90adclrioar.xn--p1ai/wp-content/uploads/2021/02/%D0%9C%D0%B5%D0%B6%D0%B4%D1%83%D0%BD%D0%B0%D1%80%D0%BE%D0%B4%D0%BD%D0%BE%D0%B5-%D1%81%D0%BE%D1%82%D1%80%D1%83%D0%B4%D0%BD%D0%B8%D1%87%D0%B5%D1%81%D1%82%D0%B2%D0%BE.pdf"
        >
          Международное сотрудничество
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import IEducationalOrganization from '@/interfaces/IEducationalOrganization';

export default defineComponent({
  name: 'InternationalPage',

  setup() {
    const mounted = ref(false);
    const store = useStore();

    // const rules = ref(SideOrganizationRules);
    const educationalOrganisation: Ref<IEducationalOrganization> = computed(
      () => store.getters['educationalOrganization/educationalOrganization']
    );
    const filteredDoctors = computed(() => store.getters['doctors/filteredDoctors']);

    onBeforeMount(async () => {
      await store.dispatch('educationalOrganization/get');
      mounted.value = true;
    });

    return {
      filteredDoctors,
      mounted,
      // rules,
      educationalOrganisation,
    };
  },
});
</script>
<style lang="scss" scoped>
@import '@/assets/styles/elements/ordinatura.scss';
.el-descriptions__label {
  font-size: 15px;
}
</style>
