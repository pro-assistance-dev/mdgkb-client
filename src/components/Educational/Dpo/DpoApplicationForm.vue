<template>
  <div v-if="mounted">
    <el-form ref="form" v-model="dpoApplication" :model="dpoApplication" label-position="top">
      <UserForm :form="dpoApplication.formValue" :email-exists="emailExists" @findEmail="findEmail" />
      <i>
        <div>Печать документов должна быть высокого качества.</div>
        <div>При заполнении от руки – ПЕЧАТНЫМИ буквами.</div>
        <div>Не допускается исправление ошибок путем зачеркивания или с помощью корректирующих средств.</div>
        <div>
          Все копии должны быть заверены в отделе кадров организации оригинальной печатью либо нотариально (исключая документы работников
          МДГКБ).
        </div>
      </i>

      <FieldValuesForm :form="dpoApplication.formValue" />
    </el-form>
    <el-divider />
    <div style="text-align: right">
      <button class="response-btn" @click="submit">Отправить заявление</button>
    </div>
  </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, ComputedRef, defineComponent, onBeforeMount, ref, watch } from 'vue';
import { useStore } from 'vuex';

import FieldValuesForm from '@/components/FormConstructor/FieldValuesForm.vue';
import UserForm from '@/components/FormConstructor/UserForm.vue';
import IDpoApplication from '@/interfaces/IDpoApplication';
import IDpoCourse from '@/interfaces/IDpoCourse';
import IUser from '@/interfaces/IUser';
import validate from '@/mixins/validate';
import scroll from '@/services/Scroll';

export default defineComponent({
  name: 'DpoApplicationForm',
  components: { FieldValuesForm, UserForm },
  emits: ['close'],

  setup(_, { emit }) {
    const store = useStore();
    const mounted = ref(false);
    const dpoApplication: ComputedRef<IDpoApplication> = computed<IDpoApplication>(() => store.getters['dpoApplications/item']);
    const dpoCourse: ComputedRef<IDpoCourse> = computed<IDpoCourse>(() => store.getters['dpoCourses/item']);
    const user: ComputedRef<IUser> = computed(() => store.getters['auth/user']);
    const isAuth: ComputedRef<boolean> = computed(() => store.getters['auth/isAuth']);
    const emailExists: ComputedRef<boolean> = computed(() => store.getters['dpoApplications/emailExists']);
    const form = ref();

    watch(isAuth, async () => {
      store.commit('dpoApplications/setUser', user.value);
      await findEmail();
    });

    const findEmail = async () => {
      await store.dispatch('dpoApplications/emailExists', dpoCourse.value.id);
    };

    const submit = async () => {
      if (emailExists.value) {
        ElMessage({
          type: 'error',
          dangerouslyUseHTMLString: true,
          message: document.querySelector('#error-block-message')?.innerHTML || '',
        });
        scroll('error-block-message');
        return;
      }
      dpoApplication.value.formValue.validate();
      if (!validate(form, true) || !dpoApplication.value.formValue.validated) {
        return;
      }
      dpoApplication.value.formValue.clearIds();
      await store.dispatch('dpoApplications/create');
      ElMessage({
        type: 'success',
        message: 'Заявка отправлена',
      });
      emit('close');
    };

    onBeforeMount(async () => {
      store.commit('dpoApplications/resetItem');
      store.commit('dpoApplications/setFormValue', dpoCourse.value.formPattern);
      dpoApplication.value.formValue.initFieldsValues();
      store.commit('dpoApplications/setCourse', dpoCourse.value);
      store.commit('dpoApplications/setUser', user.value);
      mounted.value = true;
      await findEmail();
    });

    return {
      dpoApplication,
      dpoCourse,
      mounted,
      submit,
      user,
      isAuth,
      form,
      findEmail,
      emailExists,
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
