<template>
  <el-container direction="vertical">
    <h2 style="text-align: center">Учёный совет</h2>

    <el-card v-if="educationalOrganisation.educationalOrganizationAcademics.length" class="card-content">
      <div v-for="item in educationalOrganisation.educationalOrganizationAcademics" :key="item.id" class="doctors-wrapper">
        <DoctorInfoCard :doctor="item.doctor" />
      </div>
    </el-card>
  </el-container>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import DoctorInfoCard from '@/components/Doctors/DoctorInfoCard.vue';
import IEducationalOrganization from '@/interfaces/educationalOrganization/IEducationalOrganization';

export default defineComponent({
  name: 'EducationalOrganizationAcademics',
  components: { DoctorInfoCard },
  setup() {
    const mounted = ref(false);
    const store = useStore();

    // const rules = ref(SideOrganizationRules);
    const educationalOrganisation: Ref<IEducationalOrganization> = computed(
      () => store.getters['educationalOrganization/educationalOrganization']
    );

    onBeforeMount(async () => {
      await store.dispatch('educationalOrganization/get');
      mounted.value = true;
    });

    return {
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
.flex-row {
  display: flex;
}
.doctor-img-container {
  margin: 0 10px 10px 0;
}
</style>
