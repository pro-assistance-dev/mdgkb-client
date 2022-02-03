<template>
  <div id="reviews" class="reviews">
    <div class="title-in">Отзывы ({{ comments.length }}):</div>
    <div v-for="item in comments" :key="item.comment.id" class="reviews-point">
      <CommentCard :comment="item.comment" />
    </div>
    <div id="leave-a-review" class="leave-a-review">
      <h4>Оставить отзыв:</h4>
      <el-rate v-if="isReviews" v-model="comment.comment.rating" class="rate" />
      <el-form ref="commentForm" :key="isAuth" :model="comment" :rules="isAuth ? rules : null">
        <el-form-item prop="comment.text">
          <textarea
            ref="commentInput"
            v-model="comment.comment.text"
            type="textarea"
            :placeholder="!isReviews ? 'Напишите комментарий:' : 'Напишите отзыв:'"
            show-word-limit
            :autosize="{ minRows: 3, maxRows: 6 }"
            @focus="isAuth ? null : openLoginModal()"
          ></textarea>
        </el-form-item>
        <div class="button-block">
          <button type="button" @click="isAuth ? sendComment(comment) : openLoginModal()">ОТПРАВИТЬ ОТЗЫВ</button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, ComputedRef, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';

import CommentRules from '@/classes/news/CommentRules';
import CommentCard from '@/components/Comments/CommentCard.vue';
import IDivisionComment from '@/interfaces/buildings/IDivisionComment';
import IComment from '@/interfaces/comments/IComment';
import IDoctorComment from '@/interfaces/IDoctorComment';
import INewsComment from '@/interfaces/news/INewsComment';
import validate from '@/mixins/validate';

export default defineComponent({
  name: 'Comments',
  components: { CommentCard },
  props: {
    storeModule: {
      type: String,
      required: true,
    },
    parentId: {
      type: String,
      required: true,
    },
    isReviews: {
      type: Boolean,
      default: false,
    },
  },
  async setup(prop) {
    const comment = computed(() => store.getters[`${prop.storeModule}/comment`]);
    const commentInput = ref();
    const store = useStore();
    const comments: ComputedRef<IComment[]> = computed(() => store.getters[`${prop.storeModule}/comments`]);

    const userId = computed(() => store.getters['auth/user']?.id);
    const userEmail = computed(() => store.getters['auth/user']?.email);
    const isAuth = computed(() => store.getters['auth/isAuth']);

    const commentForm = ref();
    const editCommentForm = ref();
    const rules = ref(CommentRules);

    const sendComment = async (item: INewsComment | IDivisionComment | IDoctorComment) => {
      if (!validate(commentForm)) return;
      store.commit(`${prop.storeModule}/setParentIdToComment`, prop.parentId);
      if (userEmail.value) item.comment.user.email = userEmail.value;
      if (userId.value) item.comment.userId = userId.value;
      try {
        await store.dispatch(`${prop.storeModule}/createComment`, item);
      } catch (e) {
        ElMessage({ message: 'Что-то пошло не так', type: 'error' });
        return;
      }
      commentForm.value.clearValidate();
    };

    const removeComment = async (commentId: string) => {
      await store.dispatch(`${prop.storeModule}/removeComment`, commentId);
    };
    const editComment = (commentId: string) => {
      store.commit(`${prop.storeModule}/editComment`, commentId);
    };
    const saveCommentChanges = async (item: INewsComment | IDivisionComment | IDoctorComment) => {
      if (!validate(editCommentForm)) return;
      try {
        await store.dispatch(`${prop.storeModule}/updateComment`, item);
      } catch (e) {
        ElMessage({ message: 'Что-то пошло не так', type: 'error' });
        return;
      }
    };

    const openLoginModal = () => {
      if (!isAuth.value) {
        store.commit('auth/openModal', true);
        commentInput.value.blur();
      }
    };

    return {
      rules,
      openLoginModal,
      removeComment,
      userId,
      sendComment,
      comment,
      isAuth,
      commentInput,
      commentForm,
      editComment,
      saveCommentChanges,
      editCommentForm,
      comments,
    };
  },
});
</script>

<style scoped lang="scss">
* {
  padding: 0px;
  margin: 0px;
}

*,
::after,
::before {
  box-sizing: initial;
}

html,
body {
  height: 100%;
}

html {
  scroll-behavior: smooth;
}

.hidden {
  display: none;
}

.reviews {
  display: block;
  background: #ffffff;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  background-clip: padding-box;
  margin-top: 30px;
  padding: 0px 40px 0px 23px;
  margin-bottom: 170px;
}

.title-in {
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 22px;
  letter-spacing: 0.1em;
  color: #343e5c;
  height: 60px;
  align-items: center;
  font-weight: bold;
}

.reviews-point {
  display: block;
  margin-left: 10px;
  margin-top: 15px;
  padding-bottom: 30px;
  border-bottom: 1px solid #d2dae7;
  background-clip: padding-box;
}

.leave-a-review {
  display: block;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 20px;
  letter-spacing: 0.1em;
  color: #343e5c;
  align-items: center;
  font-weight: bold;
  padding: 40px 190px 35px 175px;
  align-items: right;
}

textarea {
  background: #ffffff;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  background-clip: padding-box;
  resize: none;
  min-height: 85px;
  width: calc(100% - 18px);
  margin-top: 25px;
  padding: 8px 0px 0px 17px;
}

.answer-form::placeholder {
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 12px;
  letter-spacing: 0.1em;
  color: #aeb3c7;
}

button {
  height: 42px;
  width: 203px;
  background-color: #ff4e3c;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 12px;
  letter-spacing: 0.1em;
  color: #ffffff;
  border-radius: 8px;
  border: none;
  padding: 0px;

  &:hover {
    cursor: pointer;
  }
}

.button-block {
  display: flex;
  justify-content: right;
  margin-top: 20px;
}

.rate {
  margin-top: 10px;
}
</style>
