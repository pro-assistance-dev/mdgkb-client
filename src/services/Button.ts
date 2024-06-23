import { ComputedRef, Ref } from 'vue';
import { NavigationGuardNext } from 'vue-router';

import Statuses from './types/Statuses';

type actionFunction = ((next?: NavigationGuardNext | undefined) => Promise<void>) | (() => Promise<void>) | (() => void);

type Text = string | ComputedRef<string> | Ref<string>;
type Condition = boolean | ComputedRef<boolean> | Ref<boolean>;
type Action = undefined | actionFunction | ComputedRef<actionFunction>;

export default class Button {
  text?: Text = 'Сохранить';
  type?: Statuses = Statuses.Success;
  condition?: Condition = true;
  action?: Action;

  constructor(text: Text, action: Action, t: Statuses, condition?: Condition) {
    this.text = text;
    this.type = t;
    this.action = action;
    if (condition !== undefined) {
      this.condition = condition;
    }
  }

  static Success(text: Text, action: Action, condition?: Condition): Button {
    return new Button(text, action, Statuses.Success, condition);
  }
  static Warning(text: Text, action: Action, condition?: Condition): Button {
    return new Button(text, action, Statuses.Warning, condition);
  }
  static Error(text: Text, action: Action, condition?: Condition): Button {
    return new Button(text, action, Statuses.Error, condition);
  }
}
