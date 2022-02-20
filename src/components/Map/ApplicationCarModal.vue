<template>
  <el-dialog v-model="isOpen" :title="entranceName" @closed="close">
    <el-form ref="form" :model="applicationCard" :rules="rules" label-width="200px">
      <el-form-item prop="user.email" label="Email">
        <el-input v-model="applicationCard.user.email" placeholder="Email"></el-input>
      </el-form-item>
      <el-form-item prop="date" label="Дата:">
        <el-date-picker v-model="applicationCard.date" format="DD.MM.YYYY HH:mm" type="datetime" placeholder="Дата" />
      </el-form-item>
      <el-form-item prop="carBrand" label="Государственный регистрационный знак автомобиля:">
        <el-input v-model="applicationCard.carBrand" placeholder="Государственный регистрационный знак автомобиля"></el-input>
      </el-form-item>
      <el-form-item prop="carNumber" label="Марка автомобиля:">
        <el-input v-model="applicationCard.carNumber" placeholder="Марка автомобиля"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="submit">Заказать</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';

import IApplicationCar from '@/interfaces/IApplicationCar';
import validate from '@/mixins/validate';
export default defineComponent({
  name: 'ApplicationCarModal',
  props: {
    entranceName: {
      type: String,
      required: true,
    },
  },

  setup() {
    const store = useStore();
    const form = ref();
    const isOpen: ComputedRef<boolean> = computed(() => store.getters['applicationsCars/isCarModalOpen']);
    const applicationCard: ComputedRef<IApplicationCar> = computed(() => store.getters['applicationsCars/item']);
    const isAuth = computed(() => store.getters['auth/isAuth']);
    const rules = {
      carBrand: [{ required: true, message: 'Необходимо указать гос.знак автомобиля', trigger: 'blur' }],
      carNumber: [{ required: true, message: 'Необходимо указать марку автомобиля', trigger: 'blur' }],
      date: [{ type: 'date', required: true, message: 'Необходимо указать дату', trigger: 'change' }],
    };

    const close = () => {
      store.commit('applicationsCars/toggleCarModal', false);
    };

    const submit = async () => {
      if (!validate(form)) {
        return;
      }
      await store.dispatch('applicationsCars/create');
      close();
    };

    return {
      isAuth,
      isOpen,
      close,
      applicationCard,
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
