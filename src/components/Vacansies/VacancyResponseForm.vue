<template>
  <el-dialog v-if="mounted && vacancyResponse.opened" v-model="vacancyResponse.opened" title="Отклик на вакансию" width="80%">
    <div class="contact-form">
      <el-form v-model="vacancyResponse">
        <HumanForm :store-module="'vacancies'" />
        <el-form-item v-for="(email, i) in vacancyResponse.human.contactInfo.emails" :key="email.id" label="Email" label-width="100px">
          <el-input v-model="vacancyResponse.human.contactInfo.emails[i].address"></el-input>
        </el-form-item>
        <el-form-item
          v-for="(phone, i) in vacancyResponse.human.contactInfo.telephoneNumbers"
          :key="phone.id"
          label="Телефон"
          label-width="100px"
        >
          <el-input v-model="vacancyResponse.human.contactInfo.telephoneNumbers[i].number"></el-input>
        </el-form-item>
        <el-form-item label="Информация" label-width="100px">
          <el-input v-model="vacancyResponse.coverLetter" type="textarea" :rows="10"></el-input>
        </el-form-item>
        <el-form-item v-for="(documentType, i) in documentsTypes" :key="documentType.id" :label="documentType.name">
          <UploaderSingleScan :file-info="vacancyResponse.vacancyResponsesToDocuments[i].document.scans[0]" />
        </el-form-item>

        <div class="right-button">
          <el-button type="success" @click="sendResponse()">Откликнуться</el-button>
        </div>
      </el-form>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import HumanForm from '@/components/admin/HumanForm.vue';
import UploaderSingleScan from '@/components/UploaderSingleScan.vue';
import IDocumentType from '@/interfaces/document/IDocumentType';
import IVacancyResponse from '@/interfaces/vacancyResponse/IVacancyResponse';

export default defineComponent({
  name: 'VacancyResponseForm',
  components: { HumanForm, UploaderSingleScan },
  setup() {
    const filter = ref('');
    const store = useStore();
    const mounted = ref(false);
    const vacancyResponse: Ref<IVacancyResponse> = computed(() => store.getters['vacancies/vacancyResponse']);
    const documentsTypes: Ref<IDocumentType[]> = computed(() => store.getters['documentTypes/items']);

    onBeforeMount(async () => {
      await store.dispatch('documentTypes/getDocumentsTypesForTables');
      await store.dispatch('documentTypes/getAll');
      vacancyResponse.value.initDocuments(documentsTypes.value);
      mounted.value = true;
    });

    const sendResponse = async () => {
      await store.dispatch('vacancies/createResponse', vacancyResponse.value);
      store.commit('vacancies/resetVacancyResponse');
      vacancyResponse.value.initDocuments(documentsTypes.value);
    };

    return {
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
.right-button {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}
</style>
