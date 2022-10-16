<template>
  <el-container v-if="mounted" direction="vertical">
    <h2 style="text-align: center">Структура и орган управления организации</h2>
    <el-card>
      <!-- <el-timeline> -->
        <el-timeline-item
          v-for="manager in educationalOrganisation.educationalOrganizationManagers"
          :key="manager.id"
          center
          placement="top"
        >
          <el-card>
            <!-- <div class="vice-doctor"> -->
            <!-- <div v-for="head in heads" :key="head.id" class="vice-doctor-info">
              <div class="vice-doctor-avatar">
                <div class="doctor-avatar">
                  <img :src="head.human.photo.getImageUrl()" alt="alt" @error="head.human.photo.errorImg($event, 'doctor-default.webp')" />
                </div>
              </div>
              <div class="vice-doctor-title">
                <h3 class="vice-doctor-title-h3">{{ head.human.getFullName() }}</h3>
                <h2 class="vice-doctor-title-h2">{{ head.position }}</h2>
                <ContactBlock :contact-info="head.contactInfo" />
              </div>
              <div class="contact-h3">
                <div class="item">
                  <svg v-if="head.timetable.getOnlyWorkDays().length" class="icon-time">
                    <use xlink:href="#time"></use>
                  </svg>
                </div>
                <div class="time-block">
                  <div v-for="workDay in head.timetable.getOnlyWorkDays()" :key="workDay" class="item">{{ workDay }}</div>
                </div>
              </div>
            </div>
          </div> -->
            <div class="flex-row">
              <div class="doctor-img-container">
                <el-avatar :size="200" :src="manager.doctor.human.photoMini.getImageUrl()"></el-avatar>
              </div>
              <div class="doctor-info">
                <h4 class="doctor-name">{{ manager.doctor.human.getFullName() }}</h4>
                <p>{{ manager.role }}</p>
                <ContactsBlock :contact-info="manager.doctor.human.contactInfo" />
                <div class="contact-h3">
                  <div class="item">
                    <svg  class="icon-time">
                      <use xlink:href="#time"></use>
                    </svg>
                  </div>
                  <div class="time-block">
                    <span class="item">Вт: с 11:00 до 13:00</span>
                    <span class="item">Пн: с 11:00 до 13:00</span>
                  </div>
                </div>
              </div>
            </div>
          </el-card>
        </el-timeline-item>
      <!-- </el-timeline> -->
    </el-card>
  </el-container>
  <Time />
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import IEducationalOrganization from '@/interfaces/IEducationalOrganization';
import ContactsBlock from '@/components/ContactsBlock.vue';
import Time from '@/assets/svg/StructurePage/Time.svg';

export default defineComponent({
  name: 'StructurePage',
  components: { ContactsBlock, Time },

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

.flex-row {
  width: 100%;
  display: flex;
  justify-content: left;
}

.doctor-info {
  display: block;
  margin-left: 20px;
  width: 100%;
}
:deep(.el-timeline-item__wrapper) {
  width: 100%;
}

.doctor-name {
  font-family: Roboto, Verdana, sans-serif;
  font-size: 18px;
  color: #343D5C;
  padding-bottom: 10px;
  font-weight: bold;
  margin: 15px 0 0 0;
}
p {
  margin: 0;
}

.contact-h3 {
  display: flex;
  justify-content: left;
  font-family: Roboto, Verdana, sans-serif;
  font-size: 12px;
  font-weight: lighter;
  color: #4a4a4a;
  align-content: center;
  text-align: center;
  margin-top: 5px;
}

.item {
  display: flex;
  flex-direction: row;
  padding-right: 10px;
  width: auto;
  align-items: center;
  text-align: left;
}

.icon-time {
  margin-left: 1px;
  width: 20px;
  height: 20px;
  fill: #2754eb;
}
.time-block {
  display: block;
}

</style>
