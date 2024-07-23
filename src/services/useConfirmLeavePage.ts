import { Ref, ref } from 'vue';
import { NavigationGuardNext } from 'vue-router';

import PHelp from './PHelp';

declare type SubmitCallback = () => void;
interface IReturn {
  confirmLeave: Ref<boolean>;
  saveButtonClick: Ref<boolean>;
  formUpdated: () => void;
  beforeWindowUnload: (e: Event) => void;
  showConfirmModal: (submit: SubmitCallback, next: NavigationGuardNext) => void;
}

export default function (): IReturn {
  const confirmLeave: Ref<boolean> = ref(false);
  const saveButtonClick: Ref<boolean> = ref(false);

  const formUpdated = (): void => {
    confirmLeave.value = true;
  };

  const beforeWindowUnload = (e: Event): void => {
    if (confirmLeave.value) {
      e.preventDefault();
    }
  };

  const showConfirmModal = (submit: SubmitCallback, next: NavigationGuardNext): void => {
    if (confirmLeave.value && !saveButtonClick.value) {
      PHelp.Dialog.Save()
        .then(() => {
          submit();
          next();
        })
        .catch(() => {
          PHelp.Notification.Warning('Изменения не были сохранены');
          next();
        });
    } else {
      next();
    }
  };

  return {
    confirmLeave,
    saveButtonClick,
    beforeWindowUnload,
    formUpdated,
    showConfirmModal,
  };
}
