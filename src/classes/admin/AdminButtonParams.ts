import { ComputedRef } from 'vue';
import { NavigationGuardNext } from 'vue-router';

import IAdminButtonParams from '@/interfaces/admin/IAdminButtonParams';

export default class AdminButtonParams implements IAdminButtonParams {
  text?: string = 'Сохранить';
  type?: string = 'success';
  condition?: boolean | ComputedRef<boolean> = true;
  action?: undefined | ((next?: NavigationGuardNext | undefined) => Promise<void>) | (() => Promise<void>) | (() => void);

  constructor(adminButtonParams?: AdminButtonParams) {
    if (!adminButtonParams) {
      return;
    }
    if (adminButtonParams.text) {
      this.text = adminButtonParams.text;
    }
    if (adminButtonParams.type) {
      this.type = adminButtonParams.type;
    }
    if (adminButtonParams.condition !== undefined) {
      this.condition = adminButtonParams.condition;
    }
    this.action = adminButtonParams.action;
  }
}
