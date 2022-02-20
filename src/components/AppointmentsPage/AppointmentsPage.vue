<template>
  <div v-if="mount">
    <el-row :gutter="40">
      <el-col :xl="6" :lg="6" :md="24" class="calendar">
        <ModeButtons :second-mode-active="omsMode" :store-mode="false" first-mode="ОМС" second-mode="ДМС" @changeMode="changeMode" />
      </el-col>
      <el-col :xl="18" :lg="18" :md="24">
        <div class="flex-row card-item">
          <div class="form">
            <el-form>
              <el-form-item>
                <el-input placeholder="ФИО пациента"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input placeholder="Адрес регистрации пациента"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input placeholder="Email"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input placeholder="Телефон"></el-input>
              </el-form-item>
              <el-form-item v-if="!appointment.mrt">
                <el-input placeholder="Специальность врача"></el-input>
              </el-form-item>
              <el-form-item v-if="!appointment.mrt">
                <el-input placeholder="Врач"></el-input>
              </el-form-item>
              <el-form-item>
                <el-checkbox v-model="appointment.mrt" label="МРТ/КТ" placeholder="МРТ/КТ"></el-checkbox>
              </el-form-item>
              <el-form-item v-if="appointment.mrt">
                <el-checkbox v-model="appointment.mrtAnesthesia" label="Требуется анастезия" placeholder="МРТ/КТ"></el-checkbox>
              </el-form-item>
              <el-form-item v-if="appointment.mrt">
                <el-input v-model="appointment.mrtZone" placeholder="Зона для исппледования МРТ/КТ"></el-input>
              </el-form-item>
              <el-form-item v-if="appointment.oms">
                <el-input placeholder="Номер направления"></el-input>
              </el-form-item>
              <el-form-item v-if="appointment.oms">
                <el-input placeholder="Номер поликлиники"></el-input>
              </el-form-item>
              <el-form-item v-if="appointment.oms">
                <el-date-picker placeholder="Дата выдачи направления"></el-date-picker>
              </el-form-item>
            </el-form>
            <div class="center-button">
              <el-button native-type="reset" class="green-button" round @click="sendApplication">Записаться</el-button>
            </div>
          </div>
          <hr class="gray-border" />
          <div class="calendar-zone">
            <AppointmentsCalendar @chooseDay="chooseDay" />
            <hr class="gray-border" />
            <AppointmentsSlots v-if="chosenDay" />
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import AppointmentsCalendar from '@/components/AppointmentsPage/AppointmentsCalendar.vue';
import AppointmentsSlots from '@/components/AppointmentsPage/AppointmentsSlots.vue';
import ModeButtons from '@/components/ModeButtons.vue';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import { Operators } from '@/interfaces/filters/Operators';
import IAppointment from '@/interfaces/IAppointment';
export default defineComponent({
  name: 'AppointmentsPage',
  components: {
    AppointmentsSlots,
    AppointmentsCalendar,
    ModeButtons,
  },

  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const chosenDay: Ref<string | undefined> = ref();
    const mount = ref(false);
    const omsMode: Ref<boolean> = ref(route.path === '/appointments/oms');
    const appointment: ComputedRef<IAppointment> = computed(() => store.getters['appointments/item']);

    onBeforeMount(async () => {
      appointment.value.oms = omsMode.value;
      await store.dispatch('meta/getSchema');
      mount.value = true;
    });

    const changeMode = async (omsModeActive: boolean) => {
      omsMode.value = omsModeActive;
      appointment.value.oms = omsMode.value;
      if (omsModeActive) {
        await router.replace('/appointments/oms');
      } else {
        await router.replace('/appointments/dms');
      }
    };

    const sendApplication = async () => {
      console.log(1);
    };

    const chooseDay = (day: string) => {
      chosenDay.value = day;
    };

    return {
      chooseDay,
      chosenDay,
      appointment,
      sendApplication,
      omsMode,
      changeMode,
      Operators,
      DataTypes,
      mount,
    };
  },
});
</script>

<style scoped lang="scss">
.center-button {
  text-align: center;
}
.green-button {
  background: #31af5e;
  color: white;
  &:hover {
    background: darken(#31af5e, 5%);
    color: white;
  }
}
.flex-row {
  margin-top: 10px;
  justify-content: space-between;
}
.calendar-zone {
  width: 450px;
}

.form {
  width: 400px;
  height: 100%;
  margin-right: 20px;
}

.gray-border {
  border: 1px solid #f0f2f7;
}
.appointment-container {
  display: flex;
  justify-content: space-between;
}

.white-block {
}
</style>
