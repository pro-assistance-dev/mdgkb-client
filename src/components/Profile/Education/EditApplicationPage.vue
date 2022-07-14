<template>
  <div v-if="mounted">
    <div v-if="formValue.modComment" class="card-item">
      <h3>Общий комментарий по замечаниям</h3>
      <div v-html="formValue.modComment"></div>
    </div>

    <div class="card-item">
      <div v-if="formValue.residencyApplication?.userEdit">
        <el-form ref="questionsForm" v-model="formValue.residencyApplication" :model="formValue.residencyApplication" label-position="top">
          <AdmissionQuestionsForm :residency-application="formValue.residencyApplication" />
          <el-button size="small" type="success" @click="filledApplicationDownload">Скачать документ</el-button>
        </el-form>
      </div>
      <el-form ref="form" v-model="formValue" :model="formValue" label-position="top">
        <FieldValuesForm :form="formValue" :show-mod-comments="true" />
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { ElMessageBox } from 'element-plus';
import { computed, ComputedRef, defineComponent, onBeforeMount, onBeforeUnmount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import AdmissionQuestionsForm from '@/components/Educational/AdmissionCommittee/AdmissionQuestionsForm.vue';
import FieldValuesForm from '@/components/FormConstructor/FieldValuesForm.vue';
import IForm from '@/interfaces/IForm';
import IFormStatus from '@/interfaces/IFormStatus';
import validate from '@/mixins/validate';

export default defineComponent({
  name: 'EditApplicationPage',
  components: { FieldValuesForm, AdmissionQuestionsForm },

  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const form = ref();
    const mounted = ref(false);
    const formValue: ComputedRef<IForm> = computed(() => store.getters['formValues/item']);
    const questionsForm = ref();
    const formStatuses: ComputedRef<IFormStatus[]> = computed<IFormStatus[]>(() => store.getters['formStatuses/items']);

    const submit = async () => {
      formValue.value.validate();
      if (!validate(form, true) || !formValue.value.validated) {
        return;
      }
      formValue.value.isNew = true;
      formValue.value.setCpecifyStatus(formStatuses.value);
      if (formValue.value.residencyApplication?.id) {
        formValue.value.residencyApplication.changeUserEdit(false);
      }
      await store.dispatch('residencyApplications/updateForm', formValue.value);
      router.push('/profile/education');
    };

    const setHeaderParams = () => {
      store.commit('admin/showHeader', true);
      store.commit('admin/setHeaderParams', {
        title: 'Редактировать заявление',
        showBackButton: true,
        buttons: [{ action: submit }],
      });
    };

    onBeforeMount(async () => {
      await store.dispatch('formStatuses/getAll');
      await store.dispatch('formValues/get', route.params.id);
      setHeaderParams();
      mounted.value = true;
    });

    onBeforeUnmount(() => {
      store.commit('admin/resetState');
    });

    const filledApplicationDownload = () => {
      ElMessageBox.alert(
        'Заполните данные и распечатайте заявление,  проверьте заполненные данные, при наличии ошибок исправьте на сайте и заново распечатайте форму, заполните недостающую информацию (печатными буквами, синей ручкой), поставьте подписи в заявлении, внесите данные документа удостоверяющего личность (в соответствующую графу), поставьте финальную подпись. Отсканируйте заявление и загрузите его',
        'После закрытия этого окна скачается предзаполненное заявление',
        {
          confirmButtonText: 'OK',
          callback: () => {
            store.dispatch('residencyApplications/filledApplicationDownload', formValue.value.residencyApplication);
            return;
          },
        }
      );
      return;
    };

    return {
      formValue,
      submit,
      mounted,
      form,
      questionsForm,
      filledApplicationDownload,
    };
  },
});
</script>

<style lang="scss" scoped>
.card-item {
  margin-bottom: 10px;
}
</style>
