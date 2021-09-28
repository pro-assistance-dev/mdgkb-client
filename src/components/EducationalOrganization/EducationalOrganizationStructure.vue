<template>
  <el-container direction="vertical">
    <h2 style="text-align: center">Структура и орган управления организации</h2>
    <el-card>
      <el-timeline>
        <el-timeline-item
          v-for="manager in educationalOrganisation.educationalOrganizationManagers"
          :key="manager.id"
          center
          :timestamp="manager.role"
          placement="top"
        >
          <el-card>
            <div class="flex-row">
              <div class="doctor-img-container">
                <el-avatar :size="100" :src="manager.doctor.fileInfo.getImageUrl()"></el-avatar>
              </div>
              <div>
                <h4>{{ manager.doctor.human.getFullName() }}</h4>
                <p>{{ manager.role }}</p>
              </div>
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-card>
  </el-container>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import IEducationalOrganization from '@/interfaces/educationalOrganization/IEducationalOrganization';

export default defineComponent({
  name: 'EducationalOrganizationStructure',

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
.flex-row {
  display: flex;
}
.doctor-img-container {
  margin: 0 10px 10px 0;
}
</style>
