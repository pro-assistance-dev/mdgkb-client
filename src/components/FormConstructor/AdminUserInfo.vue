<template>
  <el-descriptions :column="1" border>
    <el-descriptions-item v-if="activeFields.userEmail" label="Email">{{ formValue.user.email }}</el-descriptions-item>
    <el-descriptions-item v-if="activeFields.userName || activeFields.userSurname || activeFields.userPatronymic" label="ФИО">
      {{ formValue.user.human.getFullName() }}
    </el-descriptions-item>
    <el-descriptions-item v-if="activeFields.userDateBirth" label="Дата рождения">
      {{ $dateTimeFormatter.format(formValue.user.human.dateBirth) }}
    </el-descriptions-item>
    <el-descriptions-item v-if="activeFields.userIsMale" label="Пол">
      {{ formValue.user.human.isMale }}
    </el-descriptions-item>
    <el-descriptions-item v-if="activeFields.userPhone" label="Телефон">
      {{ formValue.user.phone }}
    </el-descriptions-item>
    <el-descriptions-item v-if="activeFields.childName || activeFields.childSurname || activeFields.childPatronymic" label="ФИО пациента">
      {{ formValue?.child?.human.getFullName() }}
    </el-descriptions-item>
    <el-descriptions-item v-if="activeFields.childDateBirth" label="Дата рождения пациента">
      {{ $dateTimeFormatter.format(formValue?.child?.human.dateBirth) }}
    </el-descriptions-item>
    <el-descriptions-item v-if="activeFields.childIsMale" label="Пол пациента">
      {{ formValue?.child?.human.isMale }}
    </el-descriptions-item>
  </el-descriptions>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';

import UserFormFields from '@/classes/UserFormFields';
import IForm from '@/interfaces/IForm';
import IUserFormFields from '@/interfaces/IUserFormFields';

export default defineComponent({
  name: 'AdminUserInfo',

  props: {
    form: {
      type: Object as PropType<IForm>,
      required: true,
    },
    activeFields: {
      type: Object as PropType<IUserFormFields>,
      default: UserFormFields.CreateWithFullName(),
    },
  },

  setup(props) {
    const formValue: Ref<IForm | undefined> = ref();

    onBeforeMount(() => {
      formValue.value = props.form;
    });

    return {
      formValue,
    };
  },
});
</script>
