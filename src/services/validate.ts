import { ElNotification } from 'element-plus';
import { Ref } from 'vue';

import IForm from '@/services/interfaces/IForm';

import Message from './classes/Message';

export default function validate(form: Ref<IForm>, hideErrorList?: boolean, fieldsList?: string[]): boolean {
  let validationResult = true;
  form.value.validate((valid: boolean, errorFields: Record<string, unknown>) => {
    if (!valid) {
      if (!ElNotification.error) {
        return;
      }
      if (hideErrorList) {
        Message.Error('Пожалуйста, проверьте правильность введенных данных');
      } else {
        Message.Error(Message.FormMessage(errorFields));
      }
      validationResult = false;
      return validationResult;
    }
    return validationResult;
  });
  return validationResult;
}
