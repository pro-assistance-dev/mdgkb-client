<template>
  <el-button class="send-comment" type="primary" @click="eventFormVisible = true">Зарегистрироваться на мероприятие </el-button>
  <el-dialog v-model="eventFormVisible" title="Регистрация">
    <div class="add-comment">
      <el-form ref="form" :model="eventApplication">
        <div v-for="field in event.form.fields" :key="field.id">
          <el-form-item v-if="field.valueType.isString()" :label="field.name">
            <el-input v-model="eventApplication.findFieldValue(field.id).valueString" />
          </el-form-item>
          <el-form-item v-if="field.valueType.isNumber()" :label="field.name">
            <el-input-number v-model="eventApplication.findFieldValue(field.id).valueNumber" />
          </el-form-item>
          <el-form-item v-if="field.valueType.isDate()" :label="field.name">
            <DatePicker v-model="eventApplication.findFieldValue(field.id).valueDate" />
          </el-form-item>
        </div>
        <div style="display: flex; justify-content: flex-end">
          <el-button class="send-comment" type="primary" @click="send"> Отправить заявку </el-button>
        </div>
      </el-form>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import Event from '@/classes/Event';
import validate from '@/services/validate';

const event: Ref<Event> = Store.Getters('news');
const form = ref();
const eventFormVisible = ref(false);
// watch(user, () => {
//   eventApplication.value.user = new User(user.value);
//   eventApplication.value.userId = user.value.id;
// });
//
// onBeforeMount(async () => {
//   eventApplication.value.user = new User(user.value);
//   eventApplication.value.userId = user.value.id;
//   eventApplication.value.initFieldsValues(event.value.form.fields);
// });

const send = async () => {
  if (!validate(form)) return;
  try {
    // await Store.Dispatch(`events/sendEventApplications`, eventApplication.value);
  } catch (e) {
    PHelp.Notification.Error('Что-то пошло не так');
    return;
  }
  form.value.clearValidate();
  eventFormVisible.value = false;
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
.add-comment {
  margin: 50px 0 50px 0;
}

h2,
h3 {
  margin: 0;
  color: black;
}
h3 {
  font-size: 20px;
}

.comments {
  margin: 30px 0 0 0;
  .comments-card {
    position: relative;
    margin: 20px 0 0 0;
  }
}

.comment-header {
  text-align: right;
  margin: 5px 0;
  .comment-email {
    float: left;
    font-weight: bold;
  }
  .comment-date {
    color: #4a4a4a;
    opacity: 0.75;
  }
}
.comment-buttons {
  position: absolute;
  z-index: 2;
  top: 5px;
  right: 5px;
  display: flex;
  :deep(.el-button) {
    padding: 5px;
    margin: 0 !important;
    min-height: unset;
    border: none;
  }
}

.send-comment {
  margin-right: 0;
  border-radius: 10px;
  background-color: #2754eb;
  border-color: #2754eb;
  &:hover {
    background-color: darken(#2754eb, 10%);
  }
}

.card-content {
  margin-left: auto;
  margin-right: auto;
}

.card-header {
  text-align: center;
}

:deep(p) {
  text-align: justify;
}
</style>
