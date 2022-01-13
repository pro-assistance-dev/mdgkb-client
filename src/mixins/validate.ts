import { ElMessage } from 'element-plus';
import { Ref } from 'vue';

import MessageError from '@/classes/messages/MessageError';
import MessageSuccess from '@/classes/messages/MessageSuccess';
import IForm from '@/interfaces/elements/IForm';

export default function validate(form: Ref<IForm>, ignoreSuccess?: boolean): boolean {
  let validationResult = true;
  form.value.validate((valid: boolean, errorFields: Record<string, unknown>) => {
    if (!valid) {
      if (!ElMessage.error) {
        return;
      }
      ElMessage.error(new MessageError(errorFields));
      validationResult = false;
      return false;
    }
    if (!ignoreSuccess) {
      ElMessage(new MessageSuccess());
    }
    return true;
  });
  return validationResult;
}
