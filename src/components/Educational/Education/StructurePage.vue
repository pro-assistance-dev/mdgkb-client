<template>
  <el-container direction="vertical">
    <div class="v-item">
      <h3>ГЛАВНЫЙ ВРАЧ</h3>
    </div>
    <svg class="icon-arrow">
      <use xlink:href="#bxs_down-arrow"></use>
    </svg>
    <div class="v-item">
      <h3>ЗАМЕСТИТЕЛЬ ГЛАВНОГО ВРАЧА ПО МЕДИЦИНСКОЙ ЧАСТИ И НАУЧНО-ОБРАЗОВАТЕЛЬНОЙ РАБОТЕ</h3>
    </div>
    <svg class="icon-arrow">
      <use xlink:href="#bxs_down-arrow"></use>
    </svg>
    <div class="v-item">
      <h3>ОТДЕЛ ПОСТДИПЛОМНОГО ОБРАЗОВАНИЯ</h3>
    </div>
    <div class="field-50"></div>

    <el-card>
      <el-timeline>
        <el-timeline-item v-for="(manager, i) in educationalManagers" :key="manager.id" center placement="top">
          <el-card>
            <div class="flex-row">
              <div class="doctor-img-container">
                <el-avatar :size="200" :src="manager.doctor.employee.human.photoMini.getImageUrl()"></el-avatar>
              </div>
              <div class="doctor-info">
                <div>
                  <h4 v-if="i === 2" class="doctor-name">Отдел Постдипломного образования</h4>
                  <h4 class="doctor-name">{{ manager.role }}</h4>
                </div>

                <p>{{ manager.doctor.employee.human.getFullName() }}</p>
                <div v-if="i === 2" style="font-size: 12px"><b>Место нахождения:</b> Москва, 4-й Добрынинский переулок 1/9 корпус 11</div>
                <ContactsBlock :contact-info="manager.doctor.employee.human.contactInfo" />
                <div v-if="i !== 2" class="contact-h3">
                  <div class="item">
                    <svg class="icon-time">
                      <use xlink:href="#time"></use>
                    </svg>
                  </div>
                  <div class="time-block">
                    <span v-if="i === 0" class="item">Прием граждан ведёт во вторник и пятницу с 11:00 до 13:00</span>
                    <span v-if="i === 1" class="item">Прием граждан и медработников в понедельник и четверг с 14:00 до 16:00</span>
                  </div>
                </div>
              </div>
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
      <span class="info-text">
        <a target="_blank" href="/files/pol.pdf" download="Положение об отделе постдипломного образования" class="info-text"
          >Положение об отделе постдипломного образования</a
        ></span
      >
    </el-card>
  </el-container>
  <Time />
  <Arrow />
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount } from 'vue';

import Arrow from '@/assets/svg/StructurePage/Arrow.svg';
import Time from '@/assets/svg/StructurePage/Time.svg';
import EducationalManager from '@/classes/EducationalManager';
import ContactsBlock from '@/components/ContactsBlock.vue';
import EducationOrganizationManagersSortsLib from '@/services/Provider/libs/sorts/EducationanlManagersSortsLib';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'StructurePage',
  components: { ContactsBlock, Time, Arrow },

  setup() {
    const educationalManagers: ComputedRef<EducationalManager[]> = computed(() => Provider.store.getters['educationalManagers/items']);
    onBeforeMount(async () => {
      Provider.setSortModel(EducationOrganizationManagersSortsLib.byOrder());
      await Provider.store.dispatch('educationalManagers/getAll', Provider.filterQuery.value);
    });

    return {
      educationalManagers,
    };
  },
});
</script>
<style lang="scss" scoped>
@import '@/assets/styles/elements/ordinatura.scss';
@import '@/assets/styles/elements/base-style.scss';

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
  color: #343d5c;
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

h3 {
  margin: 0px;
  font-weight: normal;
  margin: 0 20px;
}

.v-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60px;
  border-radius: $normal-border-radius;
  border: 1px solid rgb(black, 0.1);
  margin: 20px 20px 20px 0;
  background: #ffffff;
  color: #343d5c;
}

.icon-arrow {
  display: flex;
  width: 50px;
  height: 50px;
  fill: #ffffff;
  margin-left: auto;
  margin-right: auto;
}

.field-50 {
  height: 50px;
}
</style>
