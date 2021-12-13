import { NavigationGuardNext } from 'vue-router';

import IAdminButtonParams from '@/interfaces/admin/IAdminButtonParams';

export default class AdminButtonParams implements IAdminButtonParams {
  text = 'Сохранить';
  type = 'success';
  condition = true;
  action?: undefined | ((next?: NavigationGuardNext | undefined) => Promise<void>) | (() => Promise<void>) | (() => void);

  constructor(adminButtonParams?: IAdminButtonParams) {
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
