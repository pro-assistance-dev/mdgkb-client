<template>
  <div class="size">
    <div class="title">
      <div class="hidden">
        <h2><b>Вопросы-ответы</b></h2>
      </div>
    </div>
    <div v-for="item in questionsList" :key="item.user_id">
      <CommentCard v-if:="item.published" :is-question="true" :question="item" />
    </div>
    <LoadMoreButton @loadMore="loadMore" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from 'vue';

import CommentCard from '@/components/Comments/CommentCard.vue';
import LoadMoreButton from '@/components/LoadMoreButton.vue';
import { Orders } from '@/interfaces/filters/Orders';
import IQuestion from '@/interfaces/IQuestion';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';
import QuestionsSortsLib from '@/services/Provider/libs/sorts/QuestionsSortsLib';

export default defineComponent({
  name: 'QuestionAnswerPage',
  components: { LoadMoreButton, CommentCard },
  async setup() {
    const filter = ref('');
    const filePath = ref('');
    const questions: Ref<IQuestion[]> = computed(() => Provider.store.getters['questions/items']);

    const questionsList = computed((): IQuestion[] => {
      if (filter.value) {
        return questions.value.filter((o: IQuestion) => {
          return (
            o.question.toLowerCase().includes(filter.value.toLowerCase()) || o.answer.toLowerCase().includes(filter.value.toLowerCase())
          );
        });
      } else {
        return questions.value;
      }
    });

    const activeName = ref(1);

    const load = async () => {
      Provider.filterQuery.value.pagination.append = false;
      Provider.store.commit('filter/setStoreModule', 'questions');
      Provider.setSortModels(QuestionsSortsLib.byDate(Orders.Desc));
      await Provider.getAll('questions');
    };

    Hooks.onBeforeMount(load);

    const openQuestion = () => Provider.store.commit('questions/openQuestion');

    const loadMore = async () => {
      Provider.filterQuery.value.pagination.offset = questions.value.length;
      Provider.filterQuery.value.pagination.append = true;
      await Provider.getAll('questions');
    };

    return {
      loadMore,
      openQuestion,
      filePath,
      questions,
      questionsList,
      activeName,
      filter,
    };
  },
});
</script>

<style lang="scss" scoped>
.size {
  max-width: 900px;
  padding: 0 10px;
}

.title {
  display: flex;
  position: relative;
  justify-content: space-between;
  margin-bottom: 20px;
  align-items: center;
  height: 40px;
  width: 100%;
}
.contact-form {
  margin: 20px 100px 20px 10px;
}

.text-center {
  text-align: center;
}
.header-center {
  display: flex;
  flex-direction: column;
  .el-button {
    margin-left: 10px;
  }
}
h1 {
  font-size: 24px;
}
.el-card {
  margin-top: 10px;
}
.card-item {
  margin-bottom: 20px;
}
h2 {
  margin: 0;
  margin-top: 0;
  font-size: 24px;
  text-align: left;
}
@media screen and (max-width: 980px) {
  .size {
    padding: 0 10px;
  }

  .table-container {
    display: none;
  }

  .mobile-container {
    display: block;
    width: 100%;
  }
  .box {
    margin-right: 0px;
    background: #ffffff;
  }

  .my-block {
    padding: 10px;
    width: calc(100% - 20px);
  }

  .application-card {
    width: 100%;
    min-height: 20px;
  }

  .card-item {
    justify-content: left;
  }
}

@media screen and (max-width: 560px) {
  .size {
    margin-top: 20px;
  }
  .hidden {
    display: none;
  }
  .title {
    justify-content: right;
  }
}

@media screen and (max-width: 480px) {
  .my-block {
    padding: 5px;
    width: calc(100% - 10px);
  }

  .card-item {
    padding: 0 5px;
    width: calc(100% - 10px);
  }
  .size {
    padding: 0 5px;
  }
}
</style>
