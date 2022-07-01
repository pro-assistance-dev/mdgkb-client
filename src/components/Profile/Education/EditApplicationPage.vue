<template>
  <div v-if="mounted">
    <div v-if="formValue.modComment" class="card-item">
      <h3>Общий комментарий по замечаниям</h3>
      <div v-html="formValue.modComment"></div>
    </div>
    <div class="card-item">
      <el-form ref="form" v-model="formValue" :model="formValue" label-position="top">
        <FieldValuesForm :form="formValue" :show-mod-comments="true" />
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, onBeforeUnmount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import FieldValuesForm from '@/components/FormConstructor/FieldValuesForm.vue';
import IForm from '@/interfaces/IForm';
import IFormStatus from '@/interfaces/IFormStatus';
import validate from '@/mixins/validate';

export default defineComponent({
  name: 'EditApplicationPage',
  components: { FieldValuesForm },

  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const form = ref();
    const mounted = ref(false);
    const formValue: ComputedRef<IForm> = computed(() => store.getters['formValues/item']);
    const formStatuses: ComputedRef<IFormStatus[]> = computed<IFormStatus[]>(() => store.getters['formStatuses/items']);

    const submit = async () => {
      formValue.value.validate();
      if (!validate(form, true) || !formValue.value.validated) {
        return;
      }
      formValue.value.isNew = true;
      formValue.value.setCpecifyStatus(formStatuses.value);
      await store.dispatch('formValues/update', formValue.value);
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

    return {
      formValue,
      submit,
      mounted,
      form,
    };
  },
});
</script>

<style lang="scss" scoped>
.card-item {
  margin-bottom: 10px;
}
</style>
