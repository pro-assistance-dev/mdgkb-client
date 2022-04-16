<template>
  <div v-if="mounted && educationalOrganisation.educationalOrganizationAcademics.length" class="flex">
    <div v-for="item in educationalOrganisation.educationalOrganizationAcademics" :key="item.id" class="doctors-wrapper">
      <DoctorInfoCard :doctor="item.doctor" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import DoctorInfoCard from '@/components/Doctors/DoctorInfoCard.vue';
import IEducationalOrganization from '@/interfaces/IEducationalOrganization';

export default defineComponent({
  name: 'PostgraduateAcademics',
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

<style lang="scss" scoped>
.flex {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  row-gap: 20px;
  margin-top: 20px;
}

.card-content {
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 30px;
  width: 100%;

  .card-header {
    text-align: center;
  }

  .footer {
    margin-top: 50px;
    text-align: center;
  }
  h2 {
    margin: 0;
  }

  .article-body {
    text-align: justify;
  }

  .doctors-wrapper {
    margin-top: 10px;
  }
}

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
