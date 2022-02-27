import HumanRules from '@/rules/HumanRules';

export default {
  email: { required: true, message: 'Пожалуйста, укажите email', trigger: 'blur' },
  phone: { required: true, message: 'Пожалуйста, укажите телефон', trigger: 'blur' },
  human: HumanRules,
};
