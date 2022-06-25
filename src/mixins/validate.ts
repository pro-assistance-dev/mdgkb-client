import { ElMessage } from 'element-plus';
import { Ref } from 'vue';

import MessageError from '@/classes/messages/MessageError';
import IForm from '@/interfaces/elements/IForm';

export default function validate(form: Ref<IForm>, hideErrorList?: boolean, fieldsList?: string[]): boolean {
  let validationResult = true;
  form.value.validate((valid: boolean, errorFields: Record<string, unknown>) => {
    if (!valid) {
      if (!ElMessage.error) {
        return;
      }
      if (hideErrorList) {
        ElMessage.error('Пожалуйста, проверьте правильность введенных данных');
      } else {
        ElMessage.error(new MessageError(errorFields));
      }
      validationResult = false;
      return false;
    }
    return true;
  });
  return validationResult;
}
