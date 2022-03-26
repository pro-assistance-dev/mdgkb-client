<template>
  <div v-if="mounted">
    <el-form ref="form" v-model="dpoApplication" :model="dpoApplication" label-position="top">
      <el-form-item
        v-if="!user.email"
        label="Электронная почта"
        prop="user.email"
        :rules="[{ required: true, message: 'Необходимо указать email', trigger: 'blur' }]"
      >
        <el-input v-model="dpoApplication.user.email"></el-input>
      </el-form-item>
      <el-form-item v-if="!user.human.surname" label="Фамилия" prop="user.human.surname">
        <el-input v-model="dpoApplication.user.human.surname"></el-input>
      </el-form-item>
      <el-form-item v-if="!user.human.name" label="Имя" prop="user.human.name">
        <el-input v-model="dpoApplication.user.human.name"></el-input>
      </el-form-item>
      <el-form-item v-if="!user.human.patronymic" label="Отчество" prop="user.human.patronymic">
        <el-input v-model="dpoApplication.user.human.patronymic"></el-input>
      </el-form-item>

      <i>
        <div>Печать документов должна быть высокого качества.</div>
        <div>При заполнении от руки – ПЕЧАТНЫМИ буквами.</div>
        <div>Не допускается исправление ошибок путем зачеркивания или с помощью корректирующих средств.</div>
        <div>
          Все копии должны быть заверены в отделе кадров организации оригинальной печатью либо нотариально (исключая документы работников
          МДГКБ).
        </div>
      </i>

      <FieldValuesForm :form="dpoCourse.formPattern" />
    </el-form>
    <el-divider />
    <div style="text-align: right">
      <button class="response-btn" @click="submit">Отправить заявление</button>
    </div>
  </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';
import { useStore } from 'vuex';

import FieldValuesForm from '@/components/FormConstructor/FieldValuesForm.vue';
import IDpoApplication from '@/interfaces/IDpoApplication';
import IDpoCourse from '@/interfaces/IDpoCourse';
import IUser from '@/interfaces/IUser';
import validate from '@/mixins/validate';

export default defineComponent({
  name: 'DpoApplicationForm',
  components: { FieldValuesForm },
  emits: ['close'],

  setup(_, { emit }) {
    const store = useStore();
    const mounted = ref(false);
    const dpoApplication: ComputedRef<IDpoApplication> = computed<IDpoApplication>(() => store.getters['dpoApplications/item']);
    const dpoCourse: Ref<IDpoCourse> = computed<IDpoCourse>(() => store.getters['dpoCourses/item']);
    const user: Ref<IUser> = computed(() => store.getters['auth/user']);
    const isAuth: Ref<boolean> = computed(() => store.getters['auth/isAuth']);
    const form = ref();

    watch(isAuth, () => {
      store.commit('dpoApplications/setUser', user.value);
    });

    const submit = async () => {
      dpoCourse.value.formPattern.validate();
      if (!validate(form, true)) {
        return;
      }
      store.commit('dpoApplications/setFieldValues', dpoCourse.value.formPattern);
      await store.dispatch('dpoApplications/create');
      ElMessage({
        type: 'success',
        message: 'Заявка отправлена',
      });
      emit('close');
    };

    onBeforeMount(async () => {
      store.commit('dpoApplications/resetItem');
      dpoCourse.value.formPattern.initFieldsValues();
      // dpoApplication.value.initFieldsValues(dpoCourse.value.formPattern.fields);
      store.commit('dpoApplications/setCourse', dpoCourse.value);
      store.commit('dpoApplications/setUser', user.value);
      mounted.value = true;
    });

    return {
      dpoApplication,
      dpoCourse,
      mounted,
      submit,
      user,
      isAuth,
      form,
    };
  },
});
</script>

<style lang="scss" scoped>
:deep(.el-form-item__label) {
  line-height: 1.2;
}
//:deep(a) {
//  color: blue !important;
//}

a {
  color: #2754eb;
  text-decoration: none;
  &:hover {
    cursor: pointer;
    color: darken(#2754eb, 30%);
  }
}
</style>
