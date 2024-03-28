enum Trigger {
  Blur = 'blur',
}

export default class ValidationRule {
  required = true;
  message = '';
  trigger: Trigger = Trigger.Blur;

  static Create(message: string): ValidationRule {
    const item = new ValidationRule();
    item.message = message;
    return item;
  }
}
