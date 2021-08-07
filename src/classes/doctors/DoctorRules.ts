import HumanRules from '@/classes/HumanRules';

export default {
  education: [{ required: true, message: 'Необходимо указать образование', trigger: 'blur' }],
  schedule: [{ required: true, message: 'Необходимо указать график работы', trigger: 'blur' }],
  tags: [{ required: true, message: 'Необходимо указать тэги', trigger: 'blur' }],
  human: HumanRules,
};
