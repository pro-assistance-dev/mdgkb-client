export default [
  {
    required: true,
    // pattern: /(^\+7 \(\d{3}\) \d{3} \d{2} \d{2}$)|(^\d{3}$)/,
    message: 'Введите телефон в формате: +7 (123) 456 78 90 или в формате 123',
    trigger: 'blur',
  },
  // { type: 'tel', message: 'Укажите корректный номер телефона.', trigger: 'blur' },
];
