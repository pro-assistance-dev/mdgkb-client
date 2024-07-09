<template>
  <el-rate v-if="isReviews && withRating" v-model="comment.rating" class="rate" />
  <el-input
    v-model="comment.text"
    type="textarea"
    :placeholder="!isReviews ? 'Напишите комментарий' : 'Напишите отзыв'"
    maxlength="500"
    minlength="10"
    show-word-limit
    :autosize="{ minRows: 4, maxRows: 6 }"
    @focus="isAuth ? null : openLoginModal()"
  />
  <div class="button-block">
    <button type="button" :class="{ 'blue-btn': !isReviews }" @click="auth.isAuth ? sendComment() : openLoginModal()">
      ОТПРАВИТЬ {{ !isReviews ? 'КОММЕНТАРИЙ' : 'ОТЗЫВ' }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus';

import CommentRules from '@/classes/CommentRules';

const props = defineProps({
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
});
const emit = defineEmits(['closeDialog', 'scroll']);

const commentInput = ref();
const comment = Store.Item('comments');
const auth = Store.Getters('auth/auth');
const authModal = Store.Getters('auth/modal');
const userId = computed(() => auth.value.user.get().id);
const userEmail = computed(() => auth.value.user.get().email);

const openLoginModal = () => {
  if (!auth.value.isAuth) {
    authModal.value.open();
    commentInput.value.blur();
  }
};

const sendComment = async () => {
  PHelp.Notification.Warning('В режиме разработки');
  return;
  // if (!validate(commentForm)) {
  //   return;
  // }
  comment.value.user.email = userEmail.value;
  comment.value.userId = userId.value;
  try {
    await Store.Create('comments');
    PHelp.Notification.Success('Ваш отзыв отправлен и будет опубликован после модерации');
  } catch (e) {
    PHelp.Notification.Error('Что-то пошло не так');
    return;
  }
  // commentForm.value.clearValidate();
  if (props.fromDialog) {
    emit('closeDialog');
  }
  emit('scroll');
};

const removeComment = async (id: string) => {
  await Store.Remove('comments', id);
};
const editComment = async (id: string) => {
  await Store.commit('comments', id);
};
const saveCommentChanges = async (item: Comment) => {
  // if (!validate(editCommentForm)) return;
  try {
    await Store.Update('comments', item);
  } catch (e) {
    ElMessage({ message: 'Что-то пошло не так', type: 'error' });
    return;
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';

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
  background-color: $main_red;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 12px;
  letter-spacing: 0.1em;
  color: #ffffff;
  border-radius: 8px;
  border: none;
  padding: 15px 30px;

  &:hover {
    cursor: pointer;
    background-color: darken($main_red, 10%);
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
