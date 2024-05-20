<template>
  <PageWrapper v-if="mounted" title="Комментарии и отзывы">
    <template #filters>
      <FiltersWrapper>
        <template #header-right>
          <div :style="{ display: 'flex', flexDirection: 'column' }">
            <PButton skin="profile" type="c_blue" text="Оставить отзыв" @click="auth.isAuth ? (showDialog = true) : openLoginModal()" />
            <!-- <button class="leave-review-button" @click="auth.isAuth ? (showDialog = true) : openLoginModal()">Оставить
              отзыв</button> -->
            <router-link to="/service-quality-assessment" style="text-align: center">Независимая оценка качества
              оказания услуг</router-link>
          </div>
          <!-- <ModeButtons :store-mode="false" :first-mode="'Положительные'" :second-mode="'Отрицательные'" -->
          <!--   @changeMode="loadComments" /> -->
        </template>
      </FiltersWrapper>
    </template>
    <div v-for="comment in comments" :key="comment.id" class="card-item">
      <CommentCard :comment="comment" />
    </div>
    <LoadMoreButton @loadMore="loadMore" />
  </PageWrapper>
  <el-dialog v-model="showDialog">
    <template #title>
      <h3>Оставить отзыв</h3>
    </template>
    <CommentForm store-module="comments" :with-rating="false" :from-dialog="true" @closeDialog="showDialog = false" />
    <!-- <template #footer>
      <button>Отправить отзыв</button>
    </template> -->
  </el-dialog>
</template>

<script lang="ts" setup>
import Comment from '@/classes/Comment';
import CommentCard from '@/components/Comments/CommentCard.vue';
import CommentForm from '@/components/Comments/CommentForm.vue';
import FilterCheckbox from '@/services/components/FilterCheckbox.vue';
import FilterSelectDate from '@/components/Filters/FilterSelectDate.vue';
import FiltersWrapper from '@/components/Filters/FiltersWrapper.vue';
import LoadMoreButton from '@/components/LoadMoreButton.vue';
import PageWrapper from '@/components/PageWrapper.vue';
import Hooks from '@/services/Hooks/Hooks';
import { DataTypes } from '@/services/interfaces/DataTypes';
import { Operators } from '@/services/interfaces/Operators';
import CommentsSortsLib from '@/libs/sorts/CommentsSortsLib';
import Provider from '@/services/Provider/Provider';
import TokenService from '@/services/Token';

const comments: Ref<Comment[]> = Store.Items('comments')
const showDialog: Ref<boolean> = ref(false);
const auth = Store.Getters('auth/auth')
const authModal = Store.Getters('auth/modal')
const mounted = ref(false)

const openLoginModal = () => {

  if (!auth.value.isAuth) {
    authModal.value.open()
  }
};

const load = async () => {
  FTSP.Get().p.limit = 6
  FTSP.Get().setS(CommentsSortsLib.byPublishedOn())
  await loadComments();
  mounted.value = true
};

const loadComments = async () => {
  await Store.FTSP('comments')
};

Hooks.onBeforeMount(load);

const loadMore = async () => {
  FTSP.Get().p.append = true;
  FTSP.Get().p.offset = comments.value.length;
  Store.FTSP('comments')
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';

.leave-review-button {
  // width: 100%;
}

button {
  margin: 10px 0;
  font-size: 16px;
  border-radius: 10px;
  background-color: #2754ec;
  padding: 15px 25px;
  height: auto;
  color: white;
  border: 1px solid rgb(black, 0.05);

  &:hover {
    cursor: pointer;
    background-color: darken(#2754ec, 10%);
  }
}

.card-item {
  width: 100%;
  margin: 0 20px 20px 20px;
  padding-right: 30px;
}

:deep(.el-dialog__title) {
  font-weight: bold;
}

h3 {
  margin: 0;
  text-align: center;
}

@media only screen and (max-width: 1024px) {
  .comments-list-container {
    flex-direction: column;
    align-items: center;

    &-left {
      max-width: 100%;
      margin: 0;
    }

    button {
      max-width: 300px;
    }
  }
}
</style>
