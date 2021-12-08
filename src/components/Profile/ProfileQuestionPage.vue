<template>
  <el-card v-if="mounted">
    <template #header><h3 style="text-align: center; margin: 0">Ответы на ваши вопросы</h3></template>
    <el-card v-for="question in user.questions" :key="question.id">
      <div><b>Вопрос: </b> {{ question.originalQuestion }}</div>
      <div v-if="question.originalAnswer">
        <el-divider />
        <b>Ответ: </b>
        {{ question.originalAnswer }}
      </div>
      <div v-else>
        <el-divider />
        <b>Вопрос в стадии обработки </b>
      </div>
    </el-card>
  </el-card>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onMounted, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import IUser from '@/interfaces/IUser';

export default defineComponent({
  name: 'ProfileQuestionPage',
  setup() {
    const store = useStore();
    const mounted = ref(false);
    const userId: ComputedRef<string> = computed(() => store.getters['auth/user']?.id);
    const user: Ref<IUser> = computed(() => store.getters['users/item']);

    const loadUser = async () => {
      await store.dispatch('users/get', userId.value);
      await store.dispatch('questions/readAnswers', userId.value);
      user.value;
      mounted.value = true;
    };
    onMounted(loadUser);

    return {
      mounted,
      user,
    };
  },
});
</script>

<style scoped lang="scss"></style>
