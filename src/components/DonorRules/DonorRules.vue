<template>
  <div class="wrapper">
    <el-card v-for="rule in donorRules" :key="rule.id" class="donor-card">
      <div class="flex-column">
        <div class="flex-row">
          <div class="donor-img-container">
            <img v-if="rule.image.fileSystemPath" :src="rule.image.getImageUrl()" alt="alt" @error="errorImg" @click="showRule(rule)" />
            <img v-else src="@/assets/img/310x310.png" />
          </div>
          <div class="flex-column">
            <el-icon @click="addToUser(rule)"><Star /></el-icon>
          </div>
        </div>
        <!--      <span>Отделение: {{ division.name }}</span>-->
        <!--      <span>Образование: {{ donor.education }}</span>-->
      </div>
    </el-card>
  </div>

  <el-dialog v-model="visible" width="40%" :top="'5vh'" lock-scroll="true">
    <div class="scale-image-container">
      <img v-if="currentRule.image.fileSystemPath" class="scale-image" :src="currentRule.image.getImageUrl()" alt="alt" @error="errorImg" />
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Star } from '@element-plus/icons-vue';
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import DonorRule from '@/classes/DonorRule';
import IDonorRule from '@/interfaces/IDonorRule';
export default defineComponent({
  name: 'DonorRules',
  components: { Star },
  setup() {
    const store = useStore();
    const donorRules: ComputedRef<IDonorRule[]> = computed(() => store.getters['donorRules/donorRules']);
    const currentRule: Ref<IDonorRule> = ref(new DonorRule());
    const mounted: Ref<boolean> = ref(false);
    const visible: Ref<boolean> = ref(false);

    const addToUser = async (rule: IDonorRule) => {
      if (rule.isFavourite()) {
        rule.removeFavourite();
        await store.dispatch('donorRules/deleteFromUser', rule.id);
      } else {
        rule.addFavourite();
        await store.dispatch('donorRules/addToUser', rule.donorRulesUsers[0]);
      }
    };

    onBeforeMount(async () => {
      await store.dispatch('donorRules/getAll');
    });

    const showRule = (rule: IDonorRule) => {
      currentRule.value = rule;
      visible.value = !visible.value;
    };

    return {
      currentRule,
      addToUser,
      mounted,
      donorRules,
      visible,
      showRule,
    };
  },
});
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-wrap: wrap;
}
.donor-card {
  width: 30%;
  border-radius: 15px;
  margin: 10px;
  color: #4a4a4a;
  font-size: 14px;

  &:hover {
    cursor: pointer;
    margin-top: 5px;
  }

  .donor-img-container {
    margin: 0 10px 10px 0;
    img {
      width: 120px;
    }
  }
  .donor-name {
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
  }
  .flex-row {
    display: flex;
  }
  .flex-column {
    display: flex;
    flex-direction: column;
  }
}

.scale-image-container {
  width: 100%;
  height: 100%;
  //margin: 50px;
}
.scale-image {
  width: 100%;
  height: 100%;
}
</style>
