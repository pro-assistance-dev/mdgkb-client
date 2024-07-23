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
    @focus="PHelp.Auth.IsAuth() ? null : openLoginModal()"
  />
  <div class="button-block">
    <button type="button" :class="{ 'blue-btn': !isReviews }" @click="PHelp.Auth.IsAuth() ? sendComment() : openLoginModal()">
      ОТПРАВИТЬ {{ !isReviews ? 'КОММЕНТАРИЙ' : 'ОТЗЫВ' }}
    </button>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  domen: {
    type: String,
    required: true,
  },
  itemId: {
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

const comment = CommentsStore.Item();

const openLoginModal = () => {
  if (!PHelp.Auth.IsAuth()) {
    PHelp.AuthModal.Open();
    // commentInput.value.blur();
  }
};

const sendComment = async () => {
  // if (!validate(commentForm)) {
  //   return;
  // }
  PHelp.Auth.User().AssignTo(comment);
  comment.domen = props.domen;
  comment.itemId = props.itemId;
  console.log(comment);
  try {
    await CommentsStore.Create();
    PHelp.Notification.Success('Ваш отзыв отправлен и будет опубликован после модерации');
  } catch (e) {
    PHelp.Notification.Error('Что-то пошло не так');
    return;
  }
  CommentsStore.ResetItem();
  // commentForm.value.clearValidate();
  if (props.fromDialog) {
    emit('closeDialog');
  }
  emit('scroll');
};

// const removeComment = async (id: string) => {
//   await CommentsStore.Remove(id);
// };
// const editComment = async (id: string) => {
//   // await CommentsStore.E('comments', id);
// };
// const saveCommentChanges = async (item: Comment) => {
//   // if (!validate(editCommentForm)) return;
//   try {
//     await CommentsStore.Update(item);
//   } catch (e) {
//     PHelp.Notification.Error('Что-то пошло не так');
//     return;
//   }
// };
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
