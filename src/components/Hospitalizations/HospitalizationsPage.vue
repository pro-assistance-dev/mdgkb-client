<template>
  <PageWrapper title="Госпитализация">
    <div style="width: 90%">
      <el-steps v-if="activeStep < 4" align-center :active="activeStep" finish-status="success" class="steps centered">
        <el-step v-for="(step, i) in steps" :key="step" :class="{ 'success-step': activeStep > i }" :title="step" @click="toStep(i)" />
      </el-steps>

      <HospitalizationsTable v-if="activeStep === 0" @selectHospitalization="submitStep" />
      <div v-if="activeStep === 1" class="card-item centered" style="display: flex; flex-direction: column; align-items: center">
        <div>
          <FilterSelect
            placeholder="Отделение"
            :options="schema.division.options"
            :table="schema.doctor.tableName"
            :col="schema.doctor.divisionId"
            @load="selectDivision"
          />
          <a @click="activeStep++"> Я не знаю, какое отделение мне нужно </a>
        </div>
      </div>
      <div v-if="activeStep === 2" class="card-item centered">
        <DatePicker v-model="hospitalization.date" class="secondQuestion" @change="activeStep++" /><br />
        <a @click="activeStep++"> Я не знаю, какая дата мне нужна </a>
      </div>
      <div v-if="activeStep === 3" class="card-item centered">
        <el-form ref="userForm" v-model="hospitalization" :model="hospitalization" label-position="left" label-width="300px">
          <UserForm
            :form="hospitalization.formValue"
            :active-fields="UserFormFields.CreateWithAllChildFields(UserFormFields.CreateWithFullName())"
          />
          <FieldValuesForm :form="hospitalization.formValue" />
        </el-form>
      </div>

      <div v-if="activeStep === 3" class="navigate-buttons">
        <button :disabled="buttonOff" class="forward-btn" @click="submitStep">
          <span>{{ getButtonName() }}</span>
        </button>
      </div>
      <div v-if="activeStep > 3">
        <h2>Ваше заявление успешно отправлено, статус заявления можно посмотреть в личном кабинете</h2>
        <el-button @click="$router.push('/main')">На главную</el-button>
      </div>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
import { ElLoading, ElNotification } from 'element-plus';
import { computed, ComputedRef, defineComponent, Ref, ref, watch } from 'vue';

import Division from '@/classes/Division';
import User from '@/classes/User';
import UserFormFields from '@/classes/UserFormFields';
import DatePicker from '@/components/DatePicker.vue';
import FilterSelect from '@/components/Filters/FilterSelect.vue';
import FieldValuesForm from '@/components/FormConstructor/FieldValuesForm.vue';
import UserForm from '@/components/FormConstructor/UserForm.vue';
import HospitalizationsTable from '@/components/Hospitalizations/HospitalizationsTable.vue';
import PageWrapper from '@/components/PageWrapper.vue';
import IHospitalization from '@/interfaces/IHospitalization';
import IUser from '@/interfaces/IUser';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';
import scroll from '@/services/Scroll';

export default defineComponent({
  name: 'HospitalizationsPage',
  components: {
    DatePicker,
    FilterSelect,
    PageWrapper,
    HospitalizationsTable,
    UserForm,
    FieldValuesForm,
  },
  setup() {
    const steps = ['Выберите тип госпитализации', 'Выберите отделение', 'Выберите дату', 'Укажите свои данные'];

    const userForm = ref();
    const user: Ref<IUser> = computed(() => Provider.store.getters['auth/user']);
    const activeStep: Ref<number> = ref(0);
    const buttonOff: Ref<boolean> = ref(false);
    const hospitalization: ComputedRef<IHospitalization> = computed(() => Provider.store.getters['hospitalizations/item']);

    const getPDF = (id: string) => {
      Provider.store.dispatch('hospitalizations/pdf', id);
    };

    const load = async () => {
      await Provider.store.dispatch('meta/getSchema');
      await Provider.store.dispatch('meta/getOptions', Provider.schema.value.division);

      // await Provider.store.dispatch('hospitalizationsTypes/getAll');
    };

    Hooks.onBeforeMount(load);

    const isAuth: ComputedRef<boolean> = computed(() => Provider.store.getters['auth/isAuth']);

    watch(isAuth, async () => {
      hospitalization.value.formValue.user = new User(user.value);
    });

    const submit = (): void => {
      hospitalization.value.formValue.clearIds();
      Provider.store.dispatch('hospitalizations/create');
    };

    const toStep = async (stepNum: number) => {
      await scroll('#responce-form');
      if (stepNum >= activeStep.value) {
        return;
      }
      activeStep.value = stepNum;
    };

    const submitStep = async () => {
      if (activeStep.value === 0) {
        activeStep.value++;
        hospitalization.value.formValue.user = new User(user.value);
        return;
      }
      hospitalization.value.formValue.validate();
      if (activeStep.value === 2 && !hospitalization.value.formValue.validated) {
        ElNotification.error({
          dangerouslyUseHTMLString: true,
          message: hospitalization.value.formValue.getErrorMessage(),
        });
        return;
      }
      activeStep.value++;
      if (activeStep.value > 3) {
        buttonOff.value = true;
        const loading = ElLoading.service({
          lock: true,
          text: 'Загрузка',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)',
        });
        await submit();
        buttonOff.value = false;
        loading.close();
        return;
      }
      clearAllValidate();
    };

    const clearAllValidate = (): void => {
      userForm.value.clearValidate();
    };

    const getButtonName = (): string => {
      return activeStep.value < 2 ? 'Перейти к следующему шагу' : 'Отправить';
    };
    const selectedDivision: ComputedRef<Division> = computed(() => Provider.store.getters['divisions/item']);

    const selectDivision = async (divisionId?: string) => {
      if (divisionId) {
        Provider.filterQuery.value.setParams(Provider.schema.value.division.id, divisionId);
        await Provider.store.dispatch('divisions/get', Provider.filterQuery.value);
        hospitalization.value.divisionId = divisionId;
        hospitalization.value.division = selectedDivision.value;
      }
      activeStep.value++;
    };

    return {
      selectDivision,
      schema: Provider.schema,
      submitStep,
      buttonOff,
      getButtonName,
      toStep,
      activeStep,
      steps,
      submit,
      UserFormFields,
      hospitalization,
      getPDF,
    };
  },
});
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
}
.attention {
  text-indent: 0.5em;
  color: #ff4d3b;
  font-weight: bold;
}

.wrapper {
  display: flex;
  justify-content: space-evenly;
}

.hospitalization-table-wrapper {
  background: white;
}

.hospitalization-table {
  width: 100%;
  text-align: center;
}

.hospitalization-button {
  margin: 10px 0;
  width: 230px;
  font-weight: bold;
  font-size: 14px;
  border-radius: 10px;
  padding: 15px 0px;
  height: auto;
  letter-spacing: 2px;
  color: white;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.application {
  background-color: #31af5e;
  &:hover {
    cursor: pointer;
    background-color: darken(#31af5e, 10%);
  }
}

.docs {
  background-color: #2754eb;
  &:hover {
    cursor: pointer;
    background-color: darken(#2754eb, 10%);
  }
}

.navigate-buttons {
  text-align: center;
  margin: 10px;
  .forward-btn {
    margin: 10px;
    text-align: center;
    border-radius: 20px;
    background-color: #31af5e;
    padding: 10px 20px;
    height: auto;
    letter-spacing: 2px;
    color: white;
    border: 1px solid rgb(black, 0.05);
    &:hover {
      cursor: pointer;
      background-color: lighten(#31af5e, 10%);
    }
    &:disabled {
      background-color: #76cc94;
      cursor: auto;
    }
  }
  .back-btn {
    margin: 10px;
    text-align: center;
    border-radius: 20px;
    padding: 10px 20px;
    height: auto;
    letter-spacing: 2px;
    color: white;
    border: 1px solid rgb(black, 0.05);
    &:hover {
      cursor: pointer;
      background-color: lighten(#31af5e, 10%);
    }
    &:disabled {
      background-color: #76cc94;
      cursor: auto;
    }
    background-color: #f49524;
  }
}

:deep(.steps) {
  margin-bottom: 20px;

  .el-step__title {
    line-height: unset;
    margin-top: 10px;
  }
}
</style>
