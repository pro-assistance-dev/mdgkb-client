<template>
  <el-card v-if="mounted">
    <template #header><h3 style="text-align: center; margin: 0">Донорство крови</h3></template>
    <template v-for="rule in donorRules" :key="rule.id">
      <div>
        {{ rule.name }}
      </div>
      <el-button @click="removeRule(rule.id)">Удалить из избранного</el-button>
    </template>
  </el-card>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onMounted, ref } from 'vue';
import { useStore } from 'vuex';

import IDonorRule from '@/interfaces/IDonorRule';
import IUser from '@/interfaces/IUser';

export default defineComponent({
  name: 'ProfileDonor',
  components: {},

  setup() {
    const store = useStore();
    const mounted = ref(false);
    const userId: ComputedRef<string> = computed(() => store.getters['auth/user']?.id);
    const user: ComputedRef<IUser> = computed(() => store.getters['users/item']);
    const donorRules: ComputedRef<IDonorRule[]> = computed(() => {
      return user.value.getDonorRules();
    });

    const loadUser = async () => {
      await store.dispatch('users/get', userId.value);
      mounted.value = true;
    };

    const removeRule = async (ruleId: string) => {
      user.value.removeDonorRule(ruleId);
      await store.dispatch('donorRules/deleteFromUser', ruleId);
    };

    onMounted(loadUser);

    return {
      user,
      removeRule,
      mounted,
      donorRules,
    };
  },
});
</script>

<style scoped lang="scss">
.el-card {
  margin-bottom: 10px;
}
</style>
