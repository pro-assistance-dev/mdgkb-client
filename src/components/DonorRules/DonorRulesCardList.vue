<template>
  <div class="wrapper">
    <template v-for="rule in donorRules" :key="rule.id">
      <DonorRuleCard :donor-rule="rule" @addToUser="addToUser(rule)" @showRule="showRule(rule)"
        @removeFromUser="removeFromUser(rule)" />
    </template>
  </div>

  <el-dialog v-model="visible" width="40%" :top="'5vh'" lock-scroll="true">
    <div class="scale-image-container">
      <img v-if="currentRule.image.fileSystemPath" class="scale-image" :src="currentRule.image.getImageUrl()"
        alt="donor-rule" @error="errorImg" />
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, ComputedRef, defineComponent, PropType, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import DonorRule from '@/classes/DonorRule';
import DonorRuleCard from '@/components/DonorRules/DonorRuleCard.vue';
import TokenService from '@/services/Token';

export default defineComponent({
  name: 'DonorRulesCardList',
  components: { DonorRuleCard },
  props: {
    donorRules: {
      type: Object as PropType<DonorRule[]>,
      required: true,
    },
  },

  setup() {
    const store = useStore();
    // const userId: ComputedRef<string> = computed(() => store.getters['auth/user']?.id);
    const currentRule: Ref<DonorRule> = ref(new DonorRule());
    const visible: Ref<boolean> = ref(false);

    const addToUser = async (rule: DonorRule) => {
      const token = TokenService.getAccessToken();
      if (!token) {
        ElMessage({
          message: 'Пожалуйста, авторизируйтесь',
          type: 'warning',
        });
        return;
      }
      // rule.addFavourite(userId.value);
      await store.dispatch('donorRules/addToUser', rule.donorRulesUsers[0]);
    };
    const removeFromUser = async (rule: DonorRule) => {
      const token = TokenService.getAccessToken();
      if (!token) {
        ElMessage({
          message: 'Пожалуйста, авторизируйтесь',
          type: 'warning',
        });
        return;
      }
      rule.removeFavourite();
      await store.dispatch('donorRules/deleteFromUser', rule.id);
    };

    const showRule = (rule: DonorRule) => {
      currentRule.value = rule;
      visible.value = !visible.value;
    };

    return {
      currentRule,
      addToUser,
      visible,
      showRule,
      removeFromUser,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
h2 {
  text-align: center;
}

.wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.scale-image-container {
  width: 100%;
  height: 100%;
}

.scale-image {
  width: 100%;
  height: 100%;
}
</style>
