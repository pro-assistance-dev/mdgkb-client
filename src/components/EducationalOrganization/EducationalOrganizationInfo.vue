<template>
  <el-container direction="vertical">
    <el-card>
      <el-descriptions :column="1" border direction="vertical" title="Основные сведения">
        <el-descriptions-item v-for="prop in educationalOrganisation.educationalOrganizationProperties" :key="prop.id" :label="prop.name">
          {{ prop.value }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </el-container>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import IEducationalOrganization from '@/interfaces/educationalOrganization/IEducationalOrganization';

export default defineComponent({
  name: 'EducationalOrganizationInfo',

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

<style>
.el-descriptions__label {
  font-size: 15px;
}
</style>
