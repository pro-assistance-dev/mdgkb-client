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

  <h2 style="text-align: center">Педагогический состав</h2>
  <el-card v-if="educationalOrganisation.teachers.length" class="card-content">
    <div v-for="item in educationalOrganisation.teachers" :key="item.id" class="doctors-wrapper">
      <DoctorInfoCard :doctor="item.doctor" :division="item.doctor.division" />
    </div>
  </el-card>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import DoctorInfoCard from '@/components/Doctors/DoctorInfoCard.vue';
import IEducationalOrganization from '@/interfaces/IEducationalOrganization';

export default defineComponent({
  name: 'ManagersPage',
  components: { DoctorInfoCard },
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
