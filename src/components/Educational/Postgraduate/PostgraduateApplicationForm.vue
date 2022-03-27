<template>
  <div v-if="mounted">
    <el-form ref="form" v-model="postgraduateApplication" :model="postgraduateApplication" label-position="top">
      <el-form-item
        v-if="!user.email"
        label="Электронная почта"
        prop="user.email"
        :rules="[{ required: true, message: 'Необходимо указать email', trigger: 'blur' }]"
      >
        <el-input v-model="postgraduateApplication.user.email" placeholder="Электронная почта"></el-input>
      </el-form-item>
      <el-form-item v-if="!user.human.surname" label="Фамилия" prop="user.human.surname">
        <el-input v-model="postgraduateApplication.user.human.surname" placeholder="Фамилия"></el-input>
      </el-form-item>
      <el-form-item v-if="!user.human.name" label="Имя" prop="user.human.name">
        <el-input v-model="postgraduateApplication.user.human.name" placeholder="Имя"></el-input>
      </el-form-item>
      <el-form-item v-if="!user.human.patronymic" label="Отчество" prop="user.human.patronymic">
        <el-input v-model="postgraduateApplication.user.human.patronymic" placeholder="Отчество"></el-input>
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

      <FieldValuesForm :form="postgraduateCourse.formPattern" />
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
import IPostgraduateApplication from '@/interfaces/IPostgraduateApplication';
import IPostgraduateCourse from '@/interfaces/IPostgraduateCourse';
import IUser from '@/interfaces/IUser';
import validate from '@/mixins/validate';

export default defineComponent({
  name: 'PostgraduateApplicationForm',
  components: { FieldValuesForm },
  emits: ['close'],

  setup(_, { emit }) {
    const store = useStore();
    const mounted = ref(false);
    const postgraduateApplication: ComputedRef<IPostgraduateApplication> = computed<IPostgraduateApplication>(
      () => store.getters['postgraduateApplications/item']
    );
    const postgraduateCourse: Ref<IPostgraduateCourse> = computed<IPostgraduateCourse>(() => store.getters['postgraduateCourses/item']);
    const user: Ref<IUser> = computed(() => store.getters['auth/user']);
    const isAuth: Ref<boolean> = computed(() => store.getters['auth/isAuth']);
    const form = ref();

    watch(isAuth, () => {
      postgraduateApplication.value.user = user.value;
    });

    const submit = async () => {
      postgraduateCourse.value.formPattern.validate();
      if (!validate(form, true) || !postgraduateCourse.value.formPattern.validated) {
        return;
      }
      postgraduateApplication.value.fieldValues = postgraduateCourse.value.formPattern.fieldValues;
      // store.commit('postgraduateApplications/setFieldValues', postgraduateCourse.value.formPattern);
      await store.dispatch('postgraduateApplications/create');
      ElMessage({
        type: 'success',
        message: 'Заявка отправлена',
      });
      emit('close');
    };

    onBeforeMount(async () => {
      store.commit('postgraduateApplications/resetItem');
      postgraduateCourse.value.formPattern.initFieldsValues();
      // postgraduateApplication.value.initFieldsValues(postgraduateCourse.value.formPattern.fields);
      postgraduateApplication.value.postgraduateCourse = postgraduateCourse.value;
      postgraduateApplication.value.user = user.value;
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
