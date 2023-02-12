<template>
  <div v-if="mounted">
    <el-form ref="form" v-model="postgraduateApplication" :model="postgraduateApplication" label-position="top">
      <UserForm :form="postgraduateApplication.formValue" :email-exists="emailExists" @findEmail="findEmail" />

      <i>
        <div>Печать документов должна быть высокого качества.</div>
        <div>При заполнении от руки – ПЕЧАТНЫМИ буквами.</div>
        <div>Не допускается исправление ошибок путем зачеркивания или с помощью корректирующих средств.</div>
        <div>
          Все копии должны быть заверены в отделе кадров организации оригинальной печатью либо нотариально (исключая документы работников
          МДГКБ).
        </div>
      </i>

      <FieldValuesForm :form="postgraduateApplication.formValue" />
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

import PostgraduateApplication from '@/classes/PostgraduateApplication';
import PostgraduateCourse from '@/classes/PostgraduateCourse';
import FieldValuesForm from '@/components/FormConstructor/FieldValuesForm.vue';
import UserForm from '@/components/FormConstructor/UserForm.vue';
import IUser from '@/interfaces/IUser';
import scroll from '@/services/Scroll';
import validate from '@/services/validate';

export default defineComponent({
  name: 'PostgraduateApplicationForm',
  components: { FieldValuesForm, UserForm },
  emits: ['close'],

  setup(_, { emit }) {
    const store = useStore();
    const mounted = ref(false);
    const postgraduateApplication: ComputedRef<PostgraduateApplication> = computed<PostgraduateApplication>(
      () => store.getters['postgraduateApplications/item']
    );
    const postgraduateCourse: Ref<PostgraduateCourse> = computed<PostgraduateCourse>(() => store.getters['postgraduateCourses/item']);
    const user: Ref<IUser> = computed(() => store.getters['auth/user']);
    const isAuth: Ref<boolean> = computed(() => store.getters['auth/isAuth']);
    const emailExists: ComputedRef<boolean> = computed(() => store.getters['postgraduateApplications/emailExists']);
    const form = ref();

    watch(isAuth, async () => {
      store.commit('postgraduateApplications/setUser', user.value);
      await findEmail();
    });

    const findEmail = async () => {
      await store.dispatch('postgraduateApplications/emailExists', postgraduateCourse.value.id);
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
      postgraduateApplication.value.formValue.validate();
      if (!validate(form, true) || !postgraduateApplication.value.formValue.validated) {
        return;
      }
      postgraduateApplication.value.formValue.clearIds();
      await store.dispatch('postgraduateApplications/create');
      ElMessage({
        type: 'success',
        message: 'Заявка отправлена',
      });
      emit('close');
    };

    onBeforeMount(async () => {
      store.commit('postgraduateApplications/resetItem');
      store.commit('postgraduateApplications/setFormValue', postgraduateCourse.value.formPattern);
      postgraduateApplication.value.formValue.initFieldsValues();
      store.commit('postgraduateApplications/setCourse', postgraduateCourse.value);
      store.commit('postgraduateApplications/setUser', user.value);
      await findEmail();
      mounted.value = true;
    });

    return {
      postgraduateApplication,
      postgraduateCourse,
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
