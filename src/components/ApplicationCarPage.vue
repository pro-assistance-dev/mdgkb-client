<template>
  <div v-if="mounted" class="form-container">
    <h2>Заявка на оформление пропуска</h2>
    <div class="card-item">
      <el-form ref="form" :model="applicationCar" label-position="top" :rules="rules">
        <UserForm
          :validate-email="false"
          :form="applicationCar.formValue"
          :active-fields="UserFormFields.CreateWithAllChildFields({ userPhone: true })"
        />
        <el-form-item label="Выберите отделение" prop="division">
          <el-select v-model="applicationCar.division" value-key="id" placeholder="Выберите отделение">
            <el-option v-for="item in divisions" :key="item.id" :label="item.name" :value="item"> </el-option>
          </el-select>
          <!-- TODO ошибка -->
          <!-- <RemoteSearch :key-value="schema.division.key" @select="selectDivision" />
          <div>Выбранное отделение: {{ applicationCar.division.name }}</div> -->
        </el-form-item>
        <el-form-item>
          <template #label>
            <div @click.prevent>
              <span>Даты и время, назначенные для плановой госпитализации (осмотра)</span>
              <el-button style="margin-left: 10px" size="mini" type="success" @click="applicationCar.addVisit()">Добавить</el-button>
            </div>
          </template>
          <div v-for="(item, i) in applicationCar.visits" :key="i" style="margin-bottom: 10px">
            <el-date-picker v-model="item.date" type="datetime" :default-value="new Date()" />
            <el-button
              v-if="applicationCar.visits.length > 1"
              style="margin-left: 10px"
              size="mini"
              icon="el-icon-close"
              type="danger"
              @click="applicationCar.removeVisit(i)"
            />
          </div>
        </el-form-item>
        <FieldValuesForm :form="applicationCar.formValue" />
        <PersonalDataAgreement :form-value="applicationCar.formValue" :form-pattern="gate.formPattern" />
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

import Division from '@/classes/buildings/Division';
import UserFormFields from '@/classes/UserFormFields';
import FieldValuesForm from '@/components/FormConstructor/FieldValuesForm.vue';
import PersonalDataAgreement from '@/components/FormConstructor/PersonalDataAgreement.vue';
import UserForm from '@/components/FormConstructor/UserForm.vue';
import IDivision from '@/interfaces/buildings/IDivision';
import IApplicationCar from '@/interfaces/IApplicationCar';
import IGate from '@/interfaces/IGate';
import ISearchObject from '@/interfaces/ISearchObject';
import IUser from '@/interfaces/IUser';
import validate from '@/mixins/validate';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';

export default defineComponent({
  name: 'ApplicationCarPage',
  components: {
    UserForm,
    FieldValuesForm,
    PersonalDataAgreement,
  },

  setup() {
    const route = useRoute();
    const applicationCar: ComputedRef<IApplicationCar> = computed(() => Provider.store.getters['applicationsCars/item']);
    const gate: ComputedRef<IGate> = computed(() => Provider.store.getters['gates/item']);
    const divisions: ComputedRef<IDivision[]> = computed(() => Provider.store.getters['divisions/divisions']);
    const division: ComputedRef<IDivision> = computed(() => Provider.store.getters['divisions/division']);
    const isAuth: ComputedRef<boolean> = computed(() => Provider.store.getters['auth/isAuth']);
    const user: ComputedRef<IUser> = computed(() => Provider.store.getters['auth/user']);
    const form = ref();
    const rules = ref({
      division: [{ required: true, message: 'Необходимо выбрать отделение', trigger: 'change' }],
    });

    watch(isAuth, async () => {
      Provider.store.commit('applicationsCars/setUser', user.value);
    });

    const submit = async () => {
      applicationCar.value.formValue.validate();
      if (!validate(form, true) || !applicationCar.value.formValue.validated) {
        return;
      }
      applicationCar.value.formValue.clearIds();
      await Provider.store.dispatch('applicationsCars/create');
      ElMessage({
        type: 'success',
        message: 'Форма успешно отправлена',
      });
      Provider.router.go(-1);
    };

    const load = async () => {
      await Provider.store.dispatch('divisions/getAll');
      await Provider.store.dispatch('gates/get', route.params['gateId']);
      Provider.store.commit('applicationsCars/resetItem');
      Provider.store.commit('applicationsCars/setFormValue', gate.value.formPattern);
      applicationCar.value.formValue.initFieldsValues();
      Provider.store.commit('applicationsCars/setGate', gate.value);
      Provider.store.commit('applicationsCars/setUser', user.value);
      Provider.store.commit('applicationsCars/setInitVisit');
    };

    Hooks.onBeforeMount(load);

    const selectDivision = async (event: ISearchObject) => {
      applicationCar.value.divisionId = event.id;
      await Provider.store.dispatch('divisions/get', event.id);
      applicationCar.value.division = new Division(division.value);
    };

    return {
      selectDivision,
      applicationCar,
      mounted: Provider.mounted,
      schema: Provider.schema,
      form,
      submit,
      UserFormFields,
      rules,
      gate,
      divisions,
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
