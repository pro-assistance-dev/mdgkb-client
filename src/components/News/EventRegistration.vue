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
            <el-date-picker v-model="eventApplication.findFieldValue(field.id).valueDate" />
          </el-form-item>
        </div>
        <div style="display: flex; justify-content: flex-end">
          <el-button class="send-comment" type="primary" @click="send"> Отправить заявку </el-button>
        </div>
      </el-form>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';
import { useStore } from 'vuex';

import CommentRules from '@/classes/news/CommentRules';
import User from '@/classes/User';
import IUser from '@/interfaces/IUser';
import IEvent from '@/interfaces/news/IEvent';
import IEventApplication from '@/interfaces/news/IEventApplication';
import validate from '@/mixins/validate';

export default defineComponent({
  name: 'EventRegistration',
  async setup(prop) {
    const store = useStore();
    const event: Ref<IEvent> = computed(() => store.getters['news/newsItem'].event);
    const eventApplication: Ref<IEventApplication> = computed(() => store.getters['news/eventApplication']);
    eventApplication.value.eventId = event.value.id;
    const form = ref();
    const rules = ref(CommentRules);
    const eventFormVisible = ref(false);
    const user: Ref<IUser> = computed(() => store.getters['auth/user']);
    watch(user, () => {
      eventApplication.value.user = new User(user.value);
      eventApplication.value.userId = user.value.id;
    });

    onBeforeMount(async () => {
      eventApplication.value.user = new User(user.value);
      eventApplication.value.userId = user.value.id;
      eventApplication.value.initFieldsValues(event.value.form.fields);
    });

    const send = async () => {
      if (!validate(form)) return;
      try {
        await store.dispatch(`events/sendEventApplications`, eventApplication.value);
      } catch (e) {
        ElMessage({ message: 'Что-то пошло не так', type: 'error' });
        return;
      }
      form.value.clearValidate();
      eventFormVisible.value = false;
    };

    return {
      event,
      eventFormVisible,
      eventApplication,
      rules,
      send,
      form,
    };
  },
});
</script>

<style scoped lang="scss">
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
