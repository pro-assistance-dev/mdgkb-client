<template>
  <h4>Как записаться</h4>
  <div v-if="hospitalization.isMoscowReferral()">
    Запись на плановую госпитализацию в ГБУЗ «Морозовская ДГКБ ДЗМ» пациентов, прикрепленных к московским поликлиникам, производится через
    детскую поликлинику по месту жительства
  </div>
  <div v-else>
    <div class="card">
      <div class="flex-between-columm front">
        <div class="card-content">
          <div class="title">Через кабинет плановой госпитализации</div>
          <div class="text">Корпус 1А, 1 этаж, кабинет «1406»</div>
          <div class="text">С 9:00 до 16:00 с воскресенья по четверг</div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="flex-between-columm front">
        <div class="card-content">
          <div class="title">Через контакты отделения</div>

          <div v-if="hospitalization.selectedHospitalisation.division.hospitalizationDoctor">
            {{ hospitalization.selectedHospitalisation.division.hospitalizationDoctor.human.getFullName() }}
          </div>
          <div v-if="hospitalization.selectedHospitalisation.division.hospitalizationContactInfo">
            {{ hospitalization.selectedHospitalisation.division.hospitalizationContactInfo.emails[0] }}
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="flex-between-columm front">
        <div class="card-content">
          <div class="title">Через форму на сайте</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent } from 'vue';
import { useStore } from 'vuex';

import HospitalizationType from '@/classes/hospitalizations/HospitalizationType';

export default defineComponent({
  name: 'HospitalizationsHowSendApplication',
  setup() {
    const store = useStore();
    const hospitalization: ComputedRef<HospitalizationType> = computed(() => store.getters['hospitalizations/selectedHospitalisation']);

    return {
      hospitalization,
    };
  },
});
</script>

<style lang="scss" scoped>
$card-border-radius: 15px;
$card-content-padding: 15px;
$card-content-outpadding: 0px;
$card-width: 300px;

.card {
  background: #ffffff;
  background-clip: padding-box;
  border-radius: 5px;
  border: rgba(0, 0, 0, 0.05) solid 1px;
  height: 100%;
  width: $card-width;
  transition: all 0.2s;
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 5px, rgba(0, 0, 0, 0.1) 0px -1px 3px, rgba(0, 0, 0, 0.1) 0px 4px 6px,
      rgba(0, 0, 0, 0.1) 0px 2px 3px, rgba(0, 0, 0, 0.1) 0px -3px 5px;
  }

  .transition-box {
    border-radius: 5px;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 2;
    background: rgba(255, 255, 255);
    color: #000000;
    text-align: justify;
    transition: all 0.5s;

    .content {
      text-align: left;
    }
    .container {
      padding: $card-content-padding;
    }
    .read-more {
      text-align: center;
    }
  }

  .card-content {
    padding-left: $card-content-padding;
    padding-right: $card-content-padding;
    max-height: 200px;
    overflow: hidden;
    overflow-wrap: break-word;
    background: #ffffff;
    height: 100%;

    .title {
      font-size: 16px;
      font-weight: bold;
      color: #343e5c;
      margin-top: 10px;
    }

    .text {
      font-size: 14px;
      font-weight: normal;
      color: #4a4a4a;
      margin-top: 5px;
      :deep(p) {
        margin: 0;
      }
    }
  }
}
</style>
