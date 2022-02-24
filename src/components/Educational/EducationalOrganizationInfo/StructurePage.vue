<template>
  <el-container v-if="mounted" direction="vertical">
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
    <div class="card-item">
      <ul>
        <li v-for="file in files" :key="file.url">
          <a target="_blank" :href="file.url" :download="file.download">{{ file.download }}</a>
        </li>
      </ul>
    </div>
  </el-container>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import IEducationalOrganization from '@/interfaces/IEducationalOrganization';

export default defineComponent({
  name: 'StructurePage',

  setup() {
    const mounted = ref(false);
    const store = useStore();

    // const rules = ref(SideOrganizationRules);

    const fileInfos = ['Положение об отделе постдипломного образования'];

    const files: any = [];
    const educationalOrganisation: Ref<IEducationalOrganization> = computed(
      () => store.getters['educationalOrganization/educationalOrganization']
    );
    const filteredDoctors = computed(() => store.getters['doctors/filteredDoctors']);

    onBeforeMount(async () => {
      await store.dispatch('educationalOrganization/get');

      const url = process.env.VUE_APP_STATIC_URL + '/educ/info/struct/';
      fileInfos.forEach((f: string, i: number) => {
        files.push({ url: url + i + '.pdf', download: f });
      });
      mounted.value = true;
    });

    return {
      files,
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
