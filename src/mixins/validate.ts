import { ElMessage } from 'element-plus';
import { Ref } from 'vue';

import MessageError from '@/classes/messages/MessageError';
import MessageSuccess from '@/classes/messages/MessageSuccess';
import IForm from '@/interfaces/elements/IForm';

export default function validate(form: Ref<IForm>): boolean {
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
    ElMessage(new MessageSuccess());
    return true;
  });
  return validationResult;
}
