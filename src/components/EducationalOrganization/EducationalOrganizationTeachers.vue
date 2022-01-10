<template>
  <el-container direction="vertical">
    <h2 style="text-align: center">Педагогический состав</h2>

    <el-card v-if="educationalOrganisation.educationalOrganizationTeachers.length" class="card-content">
      <div v-for="item in educationalOrganisation.educationalOrganizationTeachers" :key="item.id" class="doctors-wrapper">
        <DoctorInfoCard :doctor="item.doctor" :division="item.doctor.division" />
      </div>
    </el-card>
  </el-container>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import DoctorInfoCard from '@/components/DoctorInfoCard.vue';
import IEducationalOrganization from '@/interfaces/educationalOrganization/IEducationalOrganization';

export default defineComponent({
  name: 'EducationalOrganizationTeachers',
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
.el-descriptions__label {
  font-size: 15px;
}
.flex-row {
  display: flex;
}
.doctor-img-container {
  margin: 0 10px 10px 0;
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
