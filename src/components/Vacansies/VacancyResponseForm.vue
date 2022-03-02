<template>
  <div v-if="mounted" class="contact-form">
    <el-form ref="vacancyResponseForm" :model="vacancyResponse" label-width="120px" label-position="top" :rules="rules">
      <div v-if="!isAuth" class="flex-row justify-center mt-1 mb-1">
        <el-button @click="register">Зарегистрируйтесь для доступа ко всем возможностям</el-button>
      </div>
      <template v-if="!isAuth">
        <div class="flex-row">
          <el-form-item label="Фамилия" prop="user.human.surname">
            <el-input v-model="vacancyResponse.user.human.surname"></el-input>
          </el-form-item>
          <el-form-item label="Имя" prop="user.human.name">
            <el-input v-model="vacancyResponse.user.human.name"></el-input>
          </el-form-item>
          <el-form-item label="Отчество" prop="user.human.patronymic">
            <el-input v-model="vacancyResponse.user.human.patronymic"></el-input>
          </el-form-item>
        </div>
        <div class="flex-row justify-space-around">
          <el-form-item label="Дата рождения" prop="user.human.dateBirth">
            <el-date-picker
              v-model="vacancyResponse.user.human.dateBirth"
              type="date"
              format="DD.MM.YYYY"
              placeholder="Выберите дату"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="Пол" prop="user.human.isMale">
            <el-select v-model="vacancyResponse.user.human.isMale" placeholder="Выберите пол">
              <el-option label="Мужчина" :value="true"></el-option>
              <el-option label="Женщина" :value="false"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="flex-row">
          <el-form-item prop="user.email" label="Email" label-width="120px">
            <el-input v-model="vacancyResponse.user.email"></el-input>
          </el-form-item>
          <el-form-item label="Телефон" label-width="120px" prop="user.phone">
            <el-input v-model="vacancyResponse.user.phone"></el-input>
          </el-form-item>
        </div>
      </template>
      <el-form-item label="Сопроводительное письмо" label-width="120px">
        <el-input v-model="vacancyResponse.coverLetter" type="textarea" :rows="10"></el-input>
      </el-form-item>
      <div class="flex-row">
        <el-form-item
          v-for="(documentType, i) in documentsTypes"
          :key="documentType.id"
          :rules="rules.scan.fileSystemPath"
          :prop="'vacancyResponsesToDocuments.' + i + '.document.documentsScans[0].scan.id'"
          label-width="100px"
          :label="documentType.name"
        >
          <UploaderSingleScan :file-info="vacancyResponse.vacancyResponsesToDocuments[i].document.documentsScans[0].scan" />
        </el-form-item>
      </div>
      <div class="right-button">
        <button type="success" @click.prevent="sendResponse()">Отправить форму</button>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElNotification } from 'element-plus';
import { computed, defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import User from '@/classes/User';
import UploaderSingleScan from '@/components/UploaderSingleScan.vue';
import IDocumentType from '@/interfaces/document/IDocumentType';
import IVacancyResponse from '@/interfaces/vacancyResponse/IVacancyResponse';
import validate from '@/mixins/validate';
import VacancyResponseRules from '@/rules/VacancyResponseRules';

export default defineComponent({
  name: 'VacancyResponseForm',
  components: { UploaderSingleScan },
  props: {
    vacancyId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const filter = ref('');
    const store = useStore();
    const router = useRouter();
    const mounted = ref(false);
    const vacancyResponse: Ref<IVacancyResponse> = computed(() => store.getters['vacancies/vacancyResponse']);
    const documentsTypes: Ref<IDocumentType[]> = computed(() => store.getters['documentTypes/items']);
    const rules = ref(VacancyResponseRules);
    const vacancyResponseForm = ref();

    const isAuth = computed(() => store.getters['auth/isAuth']);
    const user = computed(() => store.getters['auth/user']);

    onBeforeMount(async () => {
      await store.dispatch('documentTypes/getDocumentsTypesForTables');
      await store.dispatch('documentTypes/getAll');
      vacancyResponse.value.initDocuments(documentsTypes.value);
      vacancyResponse.value.vacancyId = props.vacancyId;
      mounted.value = true;
    });

    const sendResponse = async () => {
      if (!validate(vacancyResponseForm, true)) {
        return;
      }
      await store.dispatch('vacancyResponses/create', vacancyResponse.value);
      store.commit('vacancies/resetVacancyResponse');
      vacancyResponse.value.initDocuments(documentsTypes.value);
      ElNotification({ title: 'Отклик на вакансию', message: 'Форма успешно отправлена', type: 'success' });
      await router.push('/vacancies');
    };
    const register = () => store.commit('auth/openModal');

    watch(user, () => (vacancyResponse.value.user = user.value ? new User(user.value) : new User()), { deep: true });

    return {
      user,
      register,
      isAuth,
      vacancyResponseForm,
      rules,
      mounted,
      documentsTypes,
      sendResponse,
      vacancyResponse,
      filter,
    };
  },
});
</script>

<style lang="scss" scoped>
.flex-row {
  justify-content: left;
  display: flex;
  flex-wrap: wrap;
  gap: 80px;
}

.justify-center {
  justify-content: center;
}
.right-button {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}
:deep(.avatar-uploader-cover) {
  text-align: unset;
}

.mt-1 {
  margin-top: 10px;
}
.mb-1 {
  margin-bottom: 10px;
}
</style>
