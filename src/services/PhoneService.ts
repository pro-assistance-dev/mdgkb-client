export default class PhoneService {
  static Format(phone: string): string {
    let value = phone;
    if (!value) {
      phone = value;
    } else {
      if ((value[0] === '7' || value[0] === '8') && value.length !== 1) value = value.slice(1);
      const phoneNumber = value.replace(/\+7|[^\d]/g, '');
      const phoneNumberLength = phoneNumber.length;
      switch (true) {
        case phoneNumberLength === 0:
          phone = '';
          break;
        case phoneNumberLength === 1 && value.length === 1 && phoneNumber === '7':
        case phoneNumberLength === 1 && value.length === 1 && phoneNumber === '8':
          phone = '+7 (';
          break;
        case phoneNumberLength < 4:
          phone = `+7 (${phoneNumber}`;
          break;
        case phoneNumberLength < 7:
          phone = `+7 (${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
          break;
        case phoneNumberLength < 9:
          phone = `+7 (${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 8)}`;
          break;
        default:
          phone = `+7 (${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 8)}-${phoneNumber.slice(8, 10)}`;
          break;
      }
    }
    return phone;
  }

  private static getPhoneRegExp(): RegExp {
    return /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
  }

  static validatePhone = (_: unknown, value: string, callback: CallableFunction): void => {
    if (PhoneService.getPhoneRegExp().test(value) || !value) {
      callback();
    } else {
      callback(new Error('Пожалуйста, введите корректный номер телефона'));
    }
  };
}
