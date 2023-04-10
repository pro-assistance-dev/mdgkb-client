<template>
  <h2 style="text-align: center">Запись на прием</h2>
  <div v-if="mounted" class="card-item">
    <div class="flex-row">
      <div class="calendar-zone">
        <AppointmentsCalendar @chooseDay="chooseDay" />
        <hr class="gray-border" />
        <div v-if="chosenDay">
          <div class="middle-header">Время записи</div>
          <AppointmentsSlots @chooseSlot="chooseSlot" />
        </div>
        <hr class="gray-border" />
        <div class="contancts">
          <b>Круглосуточный</b> многоканальный номер для записи на медицинские услуги, отмены записи и переноса:
          <p><a href="tel:+7 (495) 959-88-00">+7 (495) 959-88-00</a>, <a href="tel:+7 (495) 959-88-03">+7 (495) 959-88-03</a></p>
          <p>
            <img src="@/assets/img/wheelchair.png" alt="" /> При записи на прием к врачу или диагностическое исследование маломобильного
            пациента сообщите о его особенностях оператору.
          </p>
        </div>
      </div>
      <div class="form-zone">
        <!-- <div v-for="appointmentType in appointmentsTypes" :key="appointmentType.id" @click="selectType(appointmentType)">
          {{ appointmentType.name }}
        </div> -->
        <!--        <div v-if="createChildMode" class="card-item">-->
        <!--          <ChildForm @createChild="createChild" />-->
        <!--        </div>-->
        <el-form ref="form" v-model="appointment" :model="appointment" label-position="top">
          <el-form-item
            label="Тип записи"
            prop="appointmentTypeId"
            :rules="[{ required: true, message: 'Необходимо выбрать тип записи', trigger: 'blur' }]"
          >
            <el-select v-model="appointmentsType" value-key="id" style="width: 100%" placeholder="Выберите тип записи" @change="selectType">
              <el-option v-for="item in appointmentsTypes" :key="item.id" :label="item.name" :value="item"> </el-option>
            </el-select>
          </el-form-item>
          <UserForm
            :form="appointment.formValue"
            :active-fields="UserFormFields.CreateWithAllChildFields(UserFormFields.CreateWithFullName())"
          />
          <FieldValuesForm v-if="appointment.formValue" :form="appointment.formValue" />

          <!-- <AppointmentForm @createChildMode="changeCreateChildMode" /> -->
        </el-form>
      </div>
    </div>
    <div class="center-button">
      <button class="green-button" @click.prevent="submit">Записаться</button>
      <!--            <AppointmentModal v-if="isAppointmentModalOpen" @close="isAppointmentModalOpen = false" />-->
    </div>
  </div>
</template>

<script lang="ts">
import { ElNotification } from 'element-plus';
import { computed, ComputedRef, defineComponent, Ref, ref } from 'vue';

import Appointment from '@/classes/Appointment';
import AppointmentType from '@/classes/AppointmentType';
import User from '@/classes/User';
import UserFormFields from '@/classes/UserFormFields';
import AppointmentsCalendar from '@/components/AppointmentsPage/AppointmentsCalendar.vue';
import AppointmentsSlots from '@/components/AppointmentsPage/AppointmentsSlots.vue';
import FieldValuesForm from '@/components/FormConstructor/FieldValuesForm.vue';
import UserForm from '@/components/FormConstructor/UserForm.vue';
import Hooks from '@/services/Hooks/Hooks';
import { DataTypes } from '@/services/interfaces/DataTypes';
import { Operators } from '@/services/interfaces/Operators';
import Provider from '@/services/Provider/Provider';
import validate from '@/services/validate';

export default defineComponent({
  name: 'AppointmentsPage',
  components: {
    // ChildForm,
    // AppointmentForm,
    AppointmentsSlots,
    AppointmentsCalendar,
    // ModeButtons,
    FieldValuesForm,
    UserForm,
  },

  setup() {
    const chosenDay: Ref<string> = ref(new Date().toString());
    const user: Ref<User> = computed(() => Provider.store.getters['auth/user']);
    const appointment: ComputedRef<Appointment> = computed(() => Provider.store.getters['appointments/item']);
    const appointmentsTypes: ComputedRef<AppointmentType[]> = computed(() => Provider.store.getters['appointmentsTypes/items']);
    const appointmentsType: Ref<AppointmentType> = computed(() => Provider.store.getters['appointmentsTypes/item']);
    const createChildMode: Ref<boolean> = ref(false);
    const form = ref();

    const load = async () => {
      await Provider.store.dispatch('appointmentsTypes/getAll');
      appointment.value.formValue.user = new User(user.value);
    };

    Hooks.onBeforeMount(load);

    const sendApplication = async () => {
      await Provider.store.dispatch('appointments/create', appointment.value);
    };

    const chooseDay = (day: Record<string, string>) => {
      appointment.value.date = new Date(day.id);
      console.log(appointment.value.date);
      chosenDay.value = day.toString();
    };

    const chooseSlot = (slot: string) => {
      appointment.value.time = slot;
    };

    const changeCreateChildMode = () => {
      createChildMode.value = true;
    };

    // const createChild = async (child: IChild) => {
    //   Provider.store.commit('auth/addChild', child);
    //   await Provider.store.dispatch('children/create', child);
    //   // if (appointment.value.user) {
    //   //   appointment.value.user.children.push(child);
    //   // }
    //   createChildMode.value = false;
    // };

    const submit = async () => {
      if (!validate(form)) return;
      await Provider.store.dispatch('appointments/create', appointment.value);
      Provider.store.commit('appointments/resetItem');
      ElNotification({
        title: 'Запись к врачу',
        message: 'Запись успешно создана!',
        type: 'success',
        duration: 2000,
      });
    };

    const selectType = async (appointmentType: AppointmentType) => {
      Provider.store.commit('appointmentsTypes/set', appointmentType);
      appointment.value.appointmentType = new AppointmentType(appointmentType);
      appointment.value.appointmentTypeId = appointmentType.id;
      appointment.value.formValue.reproduceFromPattern(appointmentsType.value.formPattern);
      // appointment.value.formValue = new Form(appointmentType.formPattern);
      // appointment.value.formValue.user = new User(user.value);
      // appointment.value.formValue.initFieldsValues();
      // appointment.value.formValue.clearIds();
    };

    return {
      selectType,
      // createChild,
      createChildMode,
      changeCreateChildMode,
      chooseSlot,
      chooseDay,
      chosenDay,
      appointment,
      sendApplication,
      Operators,
      DataTypes,
      submit,
      appointmentsTypes,
      mounted: Provider.mounted,
      appointmentsType,
      UserFormFields,
      form,
    };
  },
});
</script>

<style scoped lang="scss">
.middle-header {
  font-weight: 400;
  font-size: 18px;
  text-align: center;
  margin-bottom: 10px;
}

.center-button {
  margin-top: 10px;
  text-align: center;
}
// .green-button {
//   background: #31af5e;
//   color: white;
//   &:hover {
//     background: darken(#31af5e, 5%);
//     color: white;
//   }
// }

.green-button {
  background: #0bae57;
  border-radius: 40px;
  border: none;
  font-family: roboto;
  font-size: 1rem;
  color: #ffffff;
  margin-left: 5px;
  margin-top: 30px;
  padding: 10px 25px;
  text-align: center;
  &:hover {
    cursor: pointer;
    background-color: #2b9b53;
  }
}

.card-item {
  margin-top: 10px;
}
.flex-row {
  display: flex;
  // justify-content: space-between;
}
.form-zone {
  margin-left: 30px;
  width: 100%;
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

.contancts {
  margin: 20px 0;
  img {
    height: 15px;
  }
}
</style>
