<template>
  <el-form>
    <template v-if="!isAuth">
      <el-form-item>
        <el-input placeholder="ФИО пациента"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="Адрес регистрации пациента"></el-input>
      </el-form-item>
    </template>
    <template v-else>
      <el-select>
        <el-option v-for="child in appointment.user.children" :key="child.id" :value="child.id" :label="child.human.getFullName()">
        </el-option>
      </el-select>
    </template>
    <el-form-item v-if="!isAuth">
      <el-input v-model="appointment.user.email" placeholder="Email"></el-input>
    </el-form-item>
    <el-form-item v-if="!isAuth">
      <el-input v-model="appointment.user.phone" placeholder="Телефон"></el-input>
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
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import IAppointment from '@/interfaces/IAppointment';
export default defineComponent({
  name: 'AppointmentForm',
  components: {},

  setup() {
    const store = useStore();
    const chosenDay: Ref<string | undefined> = ref();
    const mount = ref(false);
    const appointment: ComputedRef<IAppointment> = computed(() => store.getters['appointments/item']);
    const isAuth = computed(() => store.getters['auth/isAuth']);
    return {
      isAuth,
      chosenDay,
      appointment,
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
