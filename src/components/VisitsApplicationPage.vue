<template>
  <div v-if="mounted" class="form-container">
    <h2>Заявка на оформление пропуска</h2>
    <div class="card-item">
      <el-form ref="form" :model="visitsApplication" label-position="top" :rules="rules">
        <UserForm
          :validate-email="false"
          :form="visitsApplication.formValue"
          :active-fields="UserFormFields.CreateWithAllChildFields({ userPhone: true })"
        />
        <el-form-item label="Выберите отделение" prop="division">
          <el-select v-model="visitsApplication.division" value-key="id" placeholder="Выберите отделение">
            <el-option v-for="item in divisions" :key="item.id" :label="item.name" :value="item"> </el-option>
          </el-select>
          <!-- TODO ошибка -->
          <!-- <RemoteSearch :key-value="schema.division.key" @select="selectDivision" />
          <div>Выбранное отделение: {{ visitsApplication.division.name }}</div> -->
        </el-form-item>
        <el-form-item>
          <template #label>
            <div @click.prevent>
              <span>Даты и время, назначенные для плановой госпитализации (осмотра)</span>
              <el-button style="margin-left: 10px" size="mini" type="success" @click="visitsApplication.addVisit()">Добавить</el-button>
            </div>
          </template>
          <div v-for="(item, i) in visitsApplication.visits" :key="i" style="margin-bottom: 10px">
            <el-date-picker v-model="item.date" type="datetime" :default-value="new Date()" />
            <el-button
              v-if="visitsApplication.visits.length > 1"
              style="margin-left: 10px"
              size="mini"
              icon="el-icon-close"
              type="danger"
              @click="visitsApplication.removeVisit(i)"
            />
          </div>
        </el-form-item>
        <el-form-item>
          <template #label>
            <div @click.prevent>
              <span>Для оформления пропуска на въезд</span>
              <el-button
                v-if="!visitsApplication.withCar"
                style="margin-left: 10px"
                size="mini"
                type="success"
                @click="visitsApplication.changeWithCar(true)"
              >
                Добавить данные об автомобиле
              </el-button>
              <el-button v-else style="margin-left: 10px" size="mini" type="danger" @click="visitsApplication.changeWithCar(false)">
                Убрать данные об автомобиле
              </el-button>
            </div>
          </template>
          <!-- <div style="margin: 5px">Для оформления пропуска на въезд:</div> -->
          <div v-if="visitsApplication.withCar">
            <el-form-item label="Номер автомобиля" :rules="rules.userCarNumber" prop="formValue.user.human.carNumber">
              <el-input v-model="visitsApplication.formValue.user.human.carNumber" placeholder="Номер автомобиля"></el-input>
            </el-form-item>
            <el-form-item label="Марка автомобиля" :rules="rules.userCarModel" prop="formValue.user.human.carModel">
              <el-input v-model="visitsApplication.formValue.user.human.carModel" placeholder="Марка автомобиля"></el-input>
            </el-form-item>
          </div>
        </el-form-item>
        <FieldValuesForm :form="visitsApplication.formValue" />
        <PersonalDataAgreement :form-value="visitsApplication.formValue" :form-pattern="gate.formPattern" />
        <div class="footer">
          <el-button round type="success" @click.prevent="submit()">Отправить форму</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, ComputedRef, defineComponent, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import Division from '@/classes/Division';
import UserFormFields from '@/classes/UserFormFields';
import FieldValuesForm from '@/components/FormConstructor/FieldValuesForm.vue';
import PersonalDataAgreement from '@/components/FormConstructor/PersonalDataAgreement.vue';
import UserForm from '@/components/FormConstructor/UserForm.vue';
import IGate from '@/interfaces/IGate';
import ISearchObject from '@/interfaces/ISearchObject';
import IUser from '@/interfaces/IUser';
import IVisitsApplication from '@/interfaces/IVisitsApplication';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider/Provider';
import validate from '@/services/validate';

export default defineComponent({
  name: 'VisitsApplicationPage',
  components: {
    UserForm,
    FieldValuesForm,
    PersonalDataAgreement,
  },

  setup() {
    const route = useRoute();
    const visitsApplication: ComputedRef<IVisitsApplication> = computed(() => Provider.store.getters['visitsApplications/item']);
    const gate: ComputedRef<IGate> = computed(() => Provider.store.getters['gates/item']);
    const divisions: ComputedRef<Division[]> = computed(() => Provider.store.getters['divisions/items']);
    const division: ComputedRef<Division> = computed(() => Provider.store.getters['divisions/item']);
    const isAuth: ComputedRef<boolean> = computed(() => Provider.store.getters['auth/isAuth']);
    const user: ComputedRef<IUser> = computed(() => Provider.store.getters['auth/user']);
    const form = ref();
    const rules = ref({
      division: [{ required: true, message: 'Необходимо выбрать отделение', trigger: 'change' }],
      userCarNumber: [{ required: true, message: 'Пожалуйста, укажите номер автомобиля', trigger: 'blur' }],
      userCarModel: [{ required: true, message: 'Пожалуйста, укажите марку автомобиля', trigger: 'blur' }],
    });

    watch(isAuth, async () => {
      Provider.store.commit('visitsApplications/setUser', user.value);
    });

    const submit = async () => {
      visitsApplication.value.formValue.validate();
      if (!validate(form, true) || !visitsApplication.value.formValue.validated) {
        return;
      }
      visitsApplication.value.formValue.clearIds();
      await Provider.store.dispatch('visitsApplications/create');
      ElMessage({
        type: 'success',
        message: 'Форма успешно отправлена',
      });
      Provider.router.go(-1);
    };

    const load = async () => {
      await Provider.store.dispatch('divisions/getAll');
      await Provider.store.dispatch('gates/get', route.params['gateId']);
      Provider.store.commit('visitsApplications/resetItem');
      Provider.store.commit('visitsApplications/setFormValue', gate.value.formPattern);
      visitsApplication.value.formValue.initFieldsValues();
      Provider.store.commit('visitsApplications/setGate', gate.value);
      Provider.store.commit('visitsApplications/setUser', user.value);
      Provider.store.commit('visitsApplications/setInitVisit');
    };

    Hooks.onBeforeMount(load);

    const selectDivision = async (event: ISearchObject) => {
      visitsApplication.value.divisionId = event.id;
      await Provider.store.dispatch('divisions/get', event.id);
      visitsApplication.value.division = new Division(division.value);
    };

    return {
      selectDivision,
      visitsApplication,
      mounted: Provider.mounted,
      schema: Provider.schema,
      form,
      submit,
      UserFormFields,
      rules,
      gate,
      divisions,
      user,
    };
  },
});
</script>

<style lang="scss" scoped>
.form-container {
  margin: 0 10px;
  h2 {
    text-align: center;
  }
  .footer {
    text-align: right;
    margin-top: 20px;
  }
}
</style>
