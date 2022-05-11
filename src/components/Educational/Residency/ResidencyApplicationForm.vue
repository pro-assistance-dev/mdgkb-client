<template>
  <div v-if="mounted">
    <el-form ref="form" v-model="residencyApplication" :model="residencyApplication" label-position="top">
      <UserForm :form="residencyApplication.formValue" :email-exists="emailExists" @findEmail="findEmail" />

      <i>
        <div>Печать документов должна быть высокого качества.</div>
        <div>При заполнении от руки – ПЕЧАТНЫМИ буквами.</div>
        <div>Не допускается исправление ошибок путем зачеркивания или с помощью корректирующих средств.</div>
        <div>
          Заявления на перевод на 1 курс ординатуры принимаются после получения результатов аттестации зачетно - экзаменационной сессии 1го
          семестра.
        </div>
        <div>
          Заявления на перевод на 2 курс ординатуры принимаются после получения результатов аттестации зачетно - экзаменационной сессии 2 го
          семестра.
        </div>
        <div>
          Заявления на перевод на 2 курс ординатуры после получения результатов аттестации зачетно - экзаменационной сессии 3 го семестра НЕ
          ПРИНИМАЮТСЯ.
        </div>
        <div>Заявления на перевод в целевую ординатуру НЕ ПРИНИМАЮТСЯ (перевод только приказом Департамента здравоохранения г. Москвы)</div>
      </i>

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

import FieldValuesForm from '@/components/FormConstructor/FieldValuesForm.vue';
import UserForm from '@/components/FormConstructor/UserForm.vue';
import IResidencyApplication from '@/interfaces/IResidencyApplication';
import IResidencyCourse from '@/interfaces/IResidencyCourse';
import IUser from '@/interfaces/IUser';
import validate from '@/mixins/validate';
import scroll from '@/services/Scroll';

export default defineComponent({
  name: 'ResidencyApplicationForm',
  components: { FieldValuesForm, UserForm },
  emits: ['close'],

  setup(_, { emit }) {
    const store = useStore();
    const mounted = ref(false);
    const residencyApplication: ComputedRef<IResidencyApplication> = computed<IResidencyApplication>(
      () => store.getters['residencyApplications/item']
    );
    const residencyCourse: Ref<IResidencyCourse> = computed<IResidencyCourse>(() => store.getters['residencyCourses/item']);
    const user: Ref<IUser> = computed(() => store.getters['auth/user']);
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
        scroll('error-block-message');
        return;
      }
      residencyApplication.value.formValue.validate();
      if (!validate(form, true) || !residencyApplication.value.formValue.validated) {
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
      console.log(residencyCourse.value);
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
