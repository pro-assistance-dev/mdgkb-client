<template>
  <div v-if="mounted">
    <el-form ref="form" v-model="residencyApplication" :model="residencyApplication" label-position="top">
      <el-button @click="filledApplicationDownload">Скачать предзаполненное заявление</el-button>
      <UserForm
        :form="residencyApplication.formValue"
        :email-exists="emailExists"
        :active-fields="UserFormFields.CreateWithAllUserFields({ userSnils: true })"
        @findEmail="findEmail"
      />
      <ResidencyApplicationAchievements :residency-application="residencyApplication" />

      <el-form-item v-if="residencyCourse.isThisYear()">
        <el-checkbox v-model="residencyApplication.paid" label="Ординатрура по договору об оказании образовательных платных услуг" />
      </el-form-item>
      <el-form-item v-if="residencyCourse.isThisYear()">
        <el-checkbox v-model="residencyApplication.main" label="Заявление подаётся на дополнительную специальность" />
      </el-form-item>
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

import UserFormFields from '@/classes/UserFormFields';
import ResidencyApplicationAchievements from '@/components/Educational/Residency/ResidencyApplicationAchievements.vue';
import FieldValuesForm from '@/components/FormConstructor/FieldValuesForm.vue';
import UserForm from '@/components/FormConstructor/UserForm.vue';
import IResidencyApplication from '@/interfaces/IResidencyApplication';
import IResidencyCourse from '@/interfaces/IResidencyCourse';
import IUser from '@/interfaces/IUser';
import validate from '@/mixins/validate';
import Provider from '@/services/Provider';
import scroll from '@/services/Scroll';

export default defineComponent({
  name: 'ResidencyApplicationForm',
  components: { FieldValuesForm, UserForm, ResidencyApplicationAchievements },
  emits: ['close'],
  setup(_, { emit }) {
    const mounted = ref(false);
    const residencyApplication: ComputedRef<IResidencyApplication> = computed<IResidencyApplication>(
      () => Provider.store.getters['residencyApplications/item']
    );
    const residencyCourse: Ref<IResidencyCourse> = computed<IResidencyCourse>(() => Provider.store.getters['residencyCourses/item']);
    const user: Ref<IUser> = computed(() => Provider.store.getters['auth/user']);
    const isAuth: Ref<boolean> = computed(() => Provider.store.getters['auth/isAuth']);
    const emailExists: ComputedRef<boolean> = computed(() => Provider.store.getters['residencyApplications/emailExists']);
    const form = ref();

    watch(isAuth, async () => {
      Provider.store.commit('residencyApplications/setUser', user.value);
      await findEmail();
    });

    const findEmail = async () => {
      await Provider.store.dispatch('residencyApplications/emailExists', residencyCourse.value.id);
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
      await Provider.store.dispatch('residencyApplications/create');
      ElMessage({
        type: 'success',
        message: 'Заявка отправлена',
      });
      emit('close');
    };

    onBeforeMount(async () => {
      Provider.store.commit('residencyApplications/resetItem');
      Provider.store.commit('residencyApplications/setFormValue', residencyCourse.value.formPattern);
      residencyApplication.value.formValue.initFieldsValues();
      Provider.store.commit('residencyApplications/setCourse', residencyCourse.value);
      Provider.store.commit('residencyApplications/setUser', user.value);
      await Provider.store.dispatch('pointsAchievements/getAll');
      await findEmail();
      mounted.value = true;
    });

    const filledApplicationDownload = async () => {
      residencyApplication.value.formValue.validate();
      // if (!validate(form, true) || !residencyApplication.value.formValue.validated) {
      //   return;
      // }
      await Provider.store.dispatch('residencyApplications/filledApplicationDownload', residencyApplication.value);
    };

    return {
      filledApplicationDownload,
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
