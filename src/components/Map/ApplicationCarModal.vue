<template>
  <el-dialog v-model="isOpen" :title="gate.name" @closed="close">
    <el-form ref="form" :model="applicationCar" :rules="rules" label-width="200px">
      <el-form-item prop="user.email" label="Email">
        <el-input v-model="applicationCar.user.email" placeholder="Email"></el-input>
      </el-form-item>
      <el-form-item prop="date" label="Дата:">
        <el-date-picker v-model="applicationCar.date" format="DD.MM.YYYY HH:mm" type="datetime" placeholder="Дата" />
      </el-form-item>
      <el-form-item prop="carBrand" label="Государственный регистрационный знак автомобиля:">
        <el-input v-model="applicationCar.carBrand" placeholder="Государственный регистрационный знак автомобиля"></el-input>
      </el-form-item>
      <el-form-item prop="carNumber" label="Марка автомобиля:">
        <el-input v-model="applicationCar.carNumber" placeholder="Марка автомобиля"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="submit">Заказать</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, PropType, ref, watch } from 'vue';
import { useStore } from 'vuex';

import User from '@/classes/User';
import IApplicationCar from '@/interfaces/IApplicationCar';
import IGate from '@/interfaces/IGate';
import validate from '@/mixins/validate';
export default defineComponent({
  name: 'ApplicationCarModal',
  props: {
    gate: {
      type: Object as PropType<IGate>,
      required: true,
    },
  },

  setup(props) {
    const store = useStore();
    const form = ref();
    const isOpen: ComputedRef<boolean> = computed(() => store.getters['applicationsCars/isCarModalOpen']);
    const applicationCar: ComputedRef<IApplicationCar> = computed(() => store.getters['applicationsCars/item']);
    const isAuth = computed(() => store.getters['auth/isAuth']);
    const rules = {
      carBrand: [{ required: true, message: 'Необходимо указать гос.знак автомобиля', trigger: 'blur' }],
      carNumber: [{ required: true, message: 'Необходимо указать марку автомобиля', trigger: 'blur' }],
      date: [{ type: 'date', required: true, message: 'Необходимо указать дату', trigger: 'change' }],
    };

    const user = computed(() => store.getters['auth/user']);

    const close = () => {
      store.commit('applicationsCars/toggleCarModal', false);
    };

    const submit = async () => {
      if (!validate(form)) {
        return;
      }
      applicationCar.value.gateId = props.gate.id;
      await store.dispatch('applicationsCars/create');
      close();
    };

    watch(user, () => (applicationCar.value.user = user.value ? new User(user.value) : new User()), { deep: true });

    return {
      isAuth,
      isOpen,
      close,
      applicationCar,
      rules,
      form,
      submit,
    };
  },
});
</script>

<style lang="scss" scoped>
:deep(.el-form-item__label) {
  line-height: 1.2;
}
</style>
