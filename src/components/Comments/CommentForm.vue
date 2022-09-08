<template>
  <el-form ref="commentForm" :key="isAuth" :model="comment" :rules="isAuth ? rules : null">
    <el-rate v-if="isReviews && withRating" v-model="comment.comment.rating" class="rate" />
    <el-form-item prop="comment.text">
      <el-input
        ref="commentInput"
        v-model="comment.comment.text"
        type="textarea"
        :placeholder="!isReviews ? 'Напишите комментарий' : 'Напишите отзыв'"
        maxlength="500"
        minlength="10"
        show-word-limit
        :autosize="{ minRows: 4, maxRows: 6 }"
        @focus="isAuth ? null : openLoginModal()"
      />
    </el-form-item>
    <div class="button-block">
      <button type="button" :class="{ 'blue-btn': !isReviews }" @click="isAuth ? sendComment(comment) : openLoginModal()">
        ОТПРАВИТЬ {{ !isReviews ? 'КОММЕНТАРИЙ' : 'ОТЗЫВ' }}
      </button>
    </div>
  </el-form>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';

import CommentRules from '@/classes/news/CommentRules';
import IDivisionComment from '@/interfaces/buildings/IDivisionComment';
import IDoctorComment from '@/interfaces/IDoctorComment';
import INewsComment from '@/interfaces/news/INewsComment';
import validate from '@/services/validate';

export default defineComponent({
  name: 'CommentForm',
  props: {
    storeModule: {
      type: String,
      required: true,
    },
    parentId: {
      type: String,
      default: '',
    },
    isReviews: {
      type: Boolean,
      default: true,
    },
    withRating: {
      type: Boolean,
      default: true,
    },
    fromDialog: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['closeDialog', 'scroll'],

  setup(prop, { emit }) {
    const store = useStore();
    const commentInput = ref();
    const comment = computed(() => store.getters[`${prop.storeModule}/comment`]);
    const userId = computed(() => store.getters['auth/user']?.id);
    const userEmail = computed(() => store.getters['auth/user']?.email);
    const isAuth = computed(() => store.getters['auth/isAuth']);

    const commentForm = ref();
    const editCommentForm = ref();
    const rules = ref(CommentRules);

    const openLoginModal = () => {
      if (!isAuth.value) {
        store.commit('auth/openModal', true);
        commentInput.value.blur();
      }
    };
    const sendComment = async (item: INewsComment | IDivisionComment | IDoctorComment) => {
      if (!validate(commentForm)) return;
      if (prop.parentId) {
        store.commit(`${prop.storeModule}/setParentIdToComment`, prop.parentId);
      }
      if (userEmail.value) item.comment.user.email = userEmail.value;
      if (userId.value) item.comment.userId = userId.value;
      try {
        await store.dispatch(`${prop.storeModule}/createComment`, item);
      } catch (e) {
        ElMessage({ message: 'Что-то пошло не так', type: 'error' });
        return;
      }
      commentForm.value.clearValidate();
      if (prop.fromDialog) {
        emit('closeDialog');
      }
      emit('scroll');
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
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/base-style.scss';

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
  background-color: $site_red;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 12px;
  letter-spacing: 0.1em;
  color: #ffffff;
  border-radius: 8px;
  border: none;
  padding: 15px 30px;

  &:hover {
    cursor: pointer;
    background-color: darken($site_red, 10%);
  }
}
.blue-btn {
  background-color: $site_blue;
  &:hover {
    background-color: darken($site_blue, 10%);
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
