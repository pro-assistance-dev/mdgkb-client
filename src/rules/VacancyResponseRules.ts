import UserRules from '@/rules/UserRules';

export default {
  user: UserRules,
  scan: {
    fileSystemPath: { required: true, message: 'Пожалуйста, приложите файл', trigger: 'blur' },
  },
};
