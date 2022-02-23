<template>
  <div v-if="mount">
    <el-row :gutter="40">
      <el-col :xl="6" :lg="6" :md="24" class="calendar">
        <ModeButtons :second-mode-active="omsMode" :store-mode="false" first-mode="ОМС" second-mode="ДМС" @changeMode="changeMode" />
      </el-col>
      <el-col :xl="18" :lg="18" :md="24">
        <div class="card-item">
          <div class="flex-row">
            <div class="form">
              <AppointmentForm />
            </div>
            <hr class="gray-border" />
            <div class="calendar-zone">
              <AppointmentsCalendar @chooseDay="chooseDay" />
              <hr class="gray-border" />
              <div v-if="chosenDay">
                <div class="middle-header">Время записи</div>
                <AppointmentsSlots />
              </div>
            </div>
          </div>
          <div class="center-button">
            <el-button native-type="reset" class="green-button" round @click="sendApplication">Записаться</el-button>
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

import AppointmentForm from '@/components/AppointmentsPage/AppointmentForm.vue';
import AppointmentsCalendar from '@/components/AppointmentsPage/AppointmentsCalendar.vue';
import AppointmentsSlots from '@/components/AppointmentsPage/AppointmentsSlots.vue';
import ModeButtons from '@/components/ModeButtons.vue';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import { Operators } from '@/interfaces/filters/Operators';
import IAppointment from '@/interfaces/IAppointment';
export default defineComponent({
  name: 'AppointmentsPage',
  components: {
    AppointmentForm,
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
.middle-header {
  font-weight: 400;
  font-size: 18px;
  text-align: center;
}

.center-button {
  margin-top: 10px;
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

.card-item {
  margin-top: 10px;
}
.flex-row {
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
