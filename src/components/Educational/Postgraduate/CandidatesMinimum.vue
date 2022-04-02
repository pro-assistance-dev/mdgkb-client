<template>
  <div class="candidate-container">
    <div class="card-flex-container card-item">
      <div class="bottom-footer">
        <SharesBlock title="Кандидатский экзамен" description="Кандидатские экзамены в МДГКБ" :url="$buildUrl('candidate')" />
        <button class="response-btn" @click="openRespondForm">Подать заявление</button>
      </div>
    </div>
    <div v-if="showForm" id="responce-form" class="card-item" style="padding: 30px">
      <h2 class="title article-title">Форма для подачи заявления</h2>
      <el-divider />
      <CandidateApplicationForm style="margin-top: 20px" @close="closeRespondForm" />
    </div>
    <div v-for="docType in documentTypes" :key="docType.id">
      <h3>{{ docType.documentType.name }}</h3>
      <DocumentsList :documents="docType.documentType.documents" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import DocumentsList from '@/components/Educational/Dpo/DocumentsList.vue';
import CandidateApplicationForm from '@/components/Educational/Postgraduate/CandidateApplicationForm.vue';
import SharesBlock from '@/components/SharesBlock.vue';
import ICandidateDocumentType from '@/interfaces/ICandidateDocumentType';
import ICandidateExam from '@/interfaces/ICandidateExam';
import ISchema from '@/interfaces/schema/ISchema';
import scroll from '@/services/Scroll';

export default defineComponent({
  name: 'CandidatesMinimum',
  components: { CandidateApplicationForm, DocumentsList, SharesBlock },
  setup() {
    const store = useStore();
    const candidateExam: Ref<ICandidateExam> = computed<ICandidateExam>(() => store.getters['candidateExams/item']);
    const mounted = ref(false);
    const schema: Ref<ISchema> = computed(() => store.getters['meta/schema']);
    const documentTypes: ComputedRef<ICandidateDocumentType[]> = computed(() => store.getters['candidateDocumentTypes/items']);
    const showForm: Ref<boolean> = ref(false);
    const showFormFunc = () => {
      showForm.value = true;
    };

    const openRespondForm = async () => {
      await showFormFunc();
      scroll('responce-form');
    };
    const closeRespondForm = () => {
      showForm.value = false;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    onBeforeMount(async () => {
      await store.dispatch('candidateDocumentTypes/getAll');
      const route = useRoute();
      await store.dispatch('candidateExams/get');
      mounted.value = true;
      if (route.query.respondForm) {
        openRespondForm();
      }
    });

    // const loadMore = async () => {
    //   const lastCursor = postgraduateCourses.value[postgraduateCourses.value.length - 1].description;
    // filterQuery.value.pagination.setLoadMore(lastCursor, schema.value.postgraduateCourse.name, schema.value.postgraduateCourse.tableName);
    // await store.dispatch('postgraduateCourses/getAll', filterQuery.value);
    // };

    return {
      documentTypes,
      mounted,
      candidateExam,
      // loadMore,
      showForm,
      openRespondForm,
      closeRespondForm,
    };
  },
});
</script>

<style scoped lang="scss">
$side-container-max-width: 300px;
$medical-profile-content-max-width: 1000px;
$card-margin-size: 30px;

.candidate-container {
  margin-top: 20px;
}

.bottom-footer {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
.title-icon {
  text-align: center;
  float: left;
  padding: 20px;
  background: #2754eb;
  border-radius: 5px;
  margin: 30px;
}

.article-title {
  color: #4a4a4a;
}

.card-item-title {
  color: #4a4a4a;
  width: 100%;
}

.medical-profile-page-container {
  display: flex;
  justify-content: center;
  width: 100%;
  margin: $card-margin-size 0;
}

.side-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: $side-container-max-width;
  margin-right: $card-margin-size;

  .side-item {
    margin-bottom: $card-margin-size;
  }
}

.medical-profile-content-container {
  max-width: $medical-profile-content-max-width;
  width: 100%;
}

.add-comment {
  margin: 50px 0 50px 0;
}

.box-card {
  margin: 10px 0 10px 0;
}

h2,
h3 {
  margin-top: 0;
  color: black;
  text-align: center;
}
h3 {
  font-size: 20px;
}

.card-content {
  margin-left: auto;
  margin-right: auto;
}

:deep(p) {
  text-align: justify;
}

// :deep(a) {
//   color: inherit !important;
// }

:deep(blockquote) {
  border-left: 5px solid #2467a6;
  margin-left: 0;
  padding-left: 50px;
}

.recent-news-item {
  display: flex;
  flex-direction: column;
  padding: 10px;
  cursor: pointer;
  .item-title {
    font-weight: 600;
  }
  .item-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
  }
  .icon {
    user-select: none;
    display: flex;
    align-items: center;
    transition: all 0.2s;
    margin-right: 3px;
  }
  .anticon {
    padding-right: 5px;
    font-size: 16px;
  }
}
h4 {
  color: black;
  margin: 15px 0 0 10px;
}
.item-footer {
  color: #a1a7bd;
}

:deep(.cell-row) {
  cursor: pointer;
}
.el-divider {
  margin: 10px 0 0;
}
// :deep(.cell) {
// padding: 0 !important;
// }
.recent-news-footer {
  margin: 10px;
  margin-bottom: 15px;
  text-align: center;
  button {
    background-color: #2754eb;
    border-radius: 40px;
    color: #ffffff;
    padding: 12px 23px;
    font-size: 14px;
    border: none;
    transition: background-color 0.25s ease;
    &:hover {
      cursor: pointer;
      background-color: darken(#2754eb, 10%);
    }
  }
}

.card-meta {
  display: flex;
  margin-top: 10px;
}

.share {
  display: flex;
  align-items: center;
  img {
    margin-left: 15px;
    height: 25px;
  }
  .anticon {
    margin: 5px;
    font-size: 30px;
  }
  .share-item {
    .colored {
      display: none;
    }
    &:hover {
      .colored {
        display: unset;
        transform: scale(1.1);
      }
      .black {
        display: none;
      }
    }
  }
}
:deep(.response-btn) {
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
}

.right-block {
  width: 100%;
}

.article-body {
  min-height: 53.5vh;
}
</style>
