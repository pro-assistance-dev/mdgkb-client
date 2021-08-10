import { Ref } from 'vue';

import IForm from '@/interfaces/elements/IForm';

export default function validate(form: Ref<IForm>): boolean {
  let validationResult = false;
  form.value.validate((valid: boolean) => {
    validationResult = valid;
  });
  return validationResult;
}
