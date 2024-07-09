<template>
  <el-descriptions :column="1" border>
    <el-descriptions-item v-if="activeFields.userEmail" label="Электронная почта">{{ formValue.user.email }}</el-descriptions-item>
    <el-descriptions-item v-if="activeFields.userName || activeFields.userSurname || activeFields.userPatronymic" label="ФИО">
      {{ formValue.user.human.getFullName() }}
    </el-descriptions-item>
    <el-descriptions-item v-if="activeFields.userSnils" label="СНИЛС">
      {{ formValue.user.human.snils }}
    </el-descriptions-item>
    <el-descriptions-item v-if="activeFields.userDateBirth" label="Дата рождения">
      {{ $dateTimeFormatter.format(formValue.user.human.dateBirth) }}
    </el-descriptions-item>
    <el-descriptions-item v-if="activeFields.userPlaceBirth" label="Место рождения">
      {{ formValue.user.human.placeBirth }}
    </el-descriptions-item>
    <el-descriptions-item v-if="activeFields.userIsMale" label="Пол">
      {{ formValue.user.human.getGender(true) }}
    </el-descriptions-item>
    <el-descriptions-item v-if="activeFields.userPhone" label="Телефон">
      {{ formValue.user.phone }}
    </el-descriptions-item>
    <el-descriptions-item v-if="activeFields.userPostIndex" label="Почтовый индекс">
      {{ formValue.user.human.postIndex }}
    </el-descriptions-item>
    <el-descriptions-item v-if="activeFields.userAddress" label="Адрес">
      {{ formValue.user.human.address }}
    </el-descriptions-item>
    <el-descriptions-item v-if="activeFields.userCitizenship" label="Гражданство">
      {{ formValue.user.human.citizenship }}
    </el-descriptions-item>
    <el-descriptions-item v-if="activeFields.userCarNumber && formValue.user.human.carNumber" label="Номер автомобиля">
      {{ formValue.user.human.carNumber }}
    </el-descriptions-item>
    <el-descriptions-item v-if="activeFields.userCarModel && formValue.user.human.carModel" label="Марка автомобиля">
      {{ formValue.user.human.carModel }}
    </el-descriptions-item>

    <!-- Child info -->
    <el-descriptions-item v-if="activeFields.childName || activeFields.childSurname || activeFields.childPatronymic" label="ФИО пациента">
      {{ formValue?.child?.human.getFullName() }}
    </el-descriptions-item>
    <el-descriptions-item v-if="activeFields.childDateBirth" label="Дата рождения пациента">
      {{ $dateTimeFormatter.format(formValue?.child?.human.dateBirth) }}
    </el-descriptions-item>
    <el-descriptions-item v-if="activeFields.childIsMale" label="Пол пациента">
      {{ formValue?.child?.human.getGender(true) }}
    </el-descriptions-item>
  </el-descriptions>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, PropType, ref } from 'vue';

import Form from '@/classes/Form';
import UserFormFields from '@/classes/UserFormFields';

export default defineComponent({
  name: 'AdminUserInfo',

  props: {
    form: {
      type: Object as PropType<Form>,
      required: true,
    },
    activeFields: {
      type: Object as PropType<UserFormFields>,
      default: UserFormFields.CreateWithFullName(),
    },
  },

  setup(props) {
    const formValue = ref(new Form());

    onBeforeMount(() => {
      formValue.value = props.form;
    });

    return {
      formValue,
    };
  },
});
</script>
