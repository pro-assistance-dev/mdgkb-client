<template>
  <el-form>
    <template v-if="!isAuth">
      <el-form-item>
        <el-input placeholder="ФИО пациента"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="Адрес регистрации пациента"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="appointment.child.human.surname" placeholder="Фамилия" />
        <el-input v-model="appointment.child.human.name" placeholder="Имя" />
        <el-input v-model="appointment.child.human.patronymic" placeholder="Отчество" />
      </el-form-item>
    </template>
    <template v-else>
      <el-form-item>
        <el-select v-model="appointment.childId" placeholder="Выберите ребёнка">
          <el-option v-for="child in appointment.user.children" :key="child.id" :value="child.id" :label="child.human.getFullName()">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="createChildModeOn">Добавить ребёнка</el-button>
      </el-form-item>
    </template>
    <el-form-item v-if="!isAuth">
      <el-input v-model="appointment.user.email" placeholder="Email"></el-input>
    </el-form-item>
    <el-form-item v-if="!isAuth">
      <el-input v-model="appointment.user.phone" placeholder="Телефон"></el-input>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import IAppointment from '@/interfaces/IAppointment';
import ISchema from '@/interfaces/schema/ISchema';

export default defineComponent({
  name: 'AppointmentForm',
  components: {
    // DatePicker
  },
  emits: ['createChildMode'],
  setup(props, { emit }) {
    const store = useStore();
    const chosenDay: Ref<string | undefined> = ref();
    const mount = ref(false);
    const appointment: ComputedRef<IAppointment> = computed(() => store.getters['appointments/item']);
    const isAuth = computed(() => store.getters['auth/isAuth']);
    const schema: Ref<ISchema> = computed(() => store.getters['meta/schema']);
    const createChildMode: Ref<boolean> = ref(false);

    onBeforeMount(async () => {
      await store.dispatch('meta/getSchema');
      await store.dispatch('meta/getOptions', schema.value.specialization);
      // if (!isAuth.value) {
      //   appointment.value.child = new Child();
      // }
      mount.value = true;
    });

    const createChildModeOn = () => {
      // appointment.value.child = new Child();
      // appointment.value.child.userId = user.value.id;
      createChildMode.value = true;
      emit('createChildMode', true);
    };

    const createChildModeOff = () => {
      // appointment.value.child = undefined;
      // appointment.value.childId = undefined;
      emit('createChildMode', false);
    };

    return {
      createChildMode,
      schema,
      isAuth,
      chosenDay,
      appointment,
      mount,
      createChildModeOn,
      createChildModeOff,
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
