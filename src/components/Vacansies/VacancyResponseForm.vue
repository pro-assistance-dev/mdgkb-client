<template>
  <!-- <el-dialog
    v-if="mounted && vacancyResponse.opened && documentsTypes"
    v-model="vacancyResponse.opened"
    title="Отклик на вакансию"
    width="80%"
  > -->
  <div v-if="mounted" class="contact-form">
    <el-form v-model="vacancyResponse" label-width="120px" label-position="top">
      <HumanForm :store-module="'vacancies'" />
      <el-form-item v-for="(email, i) in vacancyResponse.human.contactInfo.emails" :key="email.id" label="Email" label-width="120px">
        <el-input v-model="vacancyResponse.human.contactInfo.emails[i].address"></el-input>
      </el-form-item>
      <el-form-item
        v-for="(phone, i) in vacancyResponse.human.contactInfo.telephoneNumbers"
        :key="phone.id"
        label="Телефон"
        label-width="120px"
      >
        <el-input v-model="vacancyResponse.human.contactInfo.telephoneNumbers[i].number"></el-input>
      </el-form-item>
      <el-form-item label="Информация" label-width="120px">
        <el-input v-model="vacancyResponse.coverLetter" type="textarea" :rows="10"></el-input>
      </el-form-item>

      <el-form-item v-for="(documentType, i) in documentsTypes" :key="documentType.id" :label="documentType.name">
        <UploaderSingleScan :file-info="vacancyResponse.vacancyResponsesToDocuments[i].document.documentsScans[0].scan" />
      </el-form-item>

      <div class="right-button">
        <button type="success" @click.prevent="sendResponse()">Отправить форму</button>
      </div>
    </el-form>
  </div>
  <!-- </el-dialog> -->
</template>

<script lang="ts">
import { ElNotification } from 'element-plus';
import { computed, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
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
    const router = useRouter();
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
      await store.dispatch('vacancyResponses/create', vacancyResponse.value);
      store.commit('vacancies/resetVacancyResponse');
      vacancyResponse.value.initDocuments(documentsTypes.value);
      ElNotification({ title: 'Отклик на вакансию', message: 'Форма успешно отправлена', type: 'success' });
      router.push('/vacancies');
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
:deep(.avatar-uploader-cover) {
  text-align: unset;
}
</style>
