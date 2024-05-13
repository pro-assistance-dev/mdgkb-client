<template>
  <div v-if="mounted">
    <el-form ref="form" v-model="residencyApplication" :model="residencyApplication" label-position="top">
      <UserForm
        :form="residencyApplication.formValue"
        :email-exists="emailExists"
        :active-fields="UserFormFields.CreateWithFullName({ userSnils: true })"
        @findEmail="findEmail"
      />
      <FieldValuesForm :form="residencyApplication.formValue" />
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

import ResidencyApplication from '@/classes/ResidencyApplication';
import ResidencyCourse from '@/classes/ResidencyCourse';
import User from '@/classes/User';
import UserFormFields from '@/classes/UserFormFields';
import FieldValuesForm from '@/components/FormConstructor/FieldValuesForm.vue';
import UserForm from '@/components/FormConstructor/UserForm.vue';
import scroll from '@/services/Scroll';
import validate from '@/services/validate';

export default defineComponent({
  name: 'ResidencyApplicationForm',
  components: { FieldValuesForm, UserForm },
  emits: ['close'],
  setup(_, { emit }) {
    const store = useStore();
    const mounted = ref(false);
    const residencyApplication: ComputedRef<ResidencyApplication> = computed<ResidencyApplication>(
      () => store.getters['residencyApplications/item']
    );
    const residencyCourse: Ref<ResidencyCourse> = computed<ResidencyCourse>(() => store.getters['residencyCourses/item']);
    const user: Ref<User> = computed(() => store.getters['auth/user']);
    const isAuth: Ref<boolean> = computed(() => store.getters['auth/isAuth']);
    const emailExists: ComputedRef<boolean> = computed(() => store.getters['residencyApplications/emailExists']);
    const form = ref();

    watch(isAuth, async () => {
      store.commit('residencyApplications/setUser', user.value);
      await findEmail();
    });

    const findEmail = async () => {
      await store.dispatch('residencyApplications/emailExists', residencyCourse.value.id);
    };

    const submit = async () => {
      if (emailExists.value) {
        ElMessage({
          type: 'error',
          dangerouslyUseHTMLString: true,
          message: document.querySelector('#error-block-message')?.innerHTML || '',
        });
        scroll('#error-block-message');
        return;
      }
      residencyApplication.value.formValue.validate();
      if (!validate(form, true) || !residencyApplication.value.formValue.validated) {
        ElMessage({
          type: 'warning',
          message: 'Проверьте корректность заполнения заявки',
        });
        return;
      }
      residencyApplication.value.formValue.clearIds();
      await store.dispatch('residencyApplications/create');
      ElMessage({
        type: 'success',
        message: 'Заявка отправлена',
      });
      emit('close');
    };

    onBeforeMount(async () => {
      store.commit('residencyApplications/resetItem');
      store.commit('residencyApplications/setFormValue', residencyCourse.value.formPattern);
      residencyApplication.value.formValue.initFieldsValues();
      store.commit('residencyApplications/setCourse', residencyCourse.value);
      store.commit('residencyApplications/setUser', user.value);
      await findEmail();
      mounted.value = true;
    });

    return {
      residencyApplication,
      residencyCourse,
      mounted,
      submit,
      user,
      isAuth,
      form,
      findEmail,
      emailExists,
      UserFormFields,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
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
