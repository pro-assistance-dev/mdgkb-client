<template>
  <div v-if="formPatternCopy.withPersonalDataAgreement" style="margin-top: 10px">
    <el-checkbox v-model="formValueCopy.agreedWithPersonalDataAgreement">
      <a :href="formPatternCopy?.personalDataAgreement?.getFileUrl()" target="_blank"> Согласие на обработку персональных данных </a>
    </el-checkbox>
    <div v-if="formValueCopy.showPersonalDataAgreementError && !formValueCopy.agreedWithPersonalDataAgreement" class="form-item-error">
      Необходимо согласие на обработку персональных данных
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, PropType, ref } from 'vue';

import Form from '@/classes/Form';

export default defineComponent({
  name: 'PersonalDataAgreement',
  props: {
    formValue: {
      type: Object as PropType<Form>,
      required: true,
    },
    formPattern: {
      type: Object as PropType<Form>,
      required: true,
    },
  },

  setup(props) {
    const formValueCopy = ref(new Form());
    const formPatternCopy = ref(new Form());

    onBeforeMount(() => {
      formValueCopy.value = props.formValue;
      formPatternCopy.value = props.formPattern;
    });

    return {
      formValueCopy,
      formPatternCopy,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
.form-item-error {
  color: #f56c6c;
  font-size: 12px;
  line-height: 1;
  padding-top: 4px;
}
</style>
