<template>
  <div v-for="rule in donorRules" :key="rule.id">
    <div>
      <div v-if="rule.isFavourite()">В избранном</div>
      <el-input v-model="rule.name" />
      <el-button size="medium" icon="el-icon-user" @click="addToUser(rule)" />
      <img :src="rule.image.getFileUrl()" alt="" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import IDonorRule from '@/interfaces/IDonorRule';
export default defineComponent({
  name: 'DonorRules',
  setup() {
    const store = useStore();
    const donorRules: ComputedRef<IDonorRule[]> = computed(() => store.getters['donorRules/donorRules']);
    const mounted: Ref<boolean> = ref(false);

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

    return {
      addToUser,
      mounted,
      donorRules,
    };
  },
});
</script>

<style lang="scss" scoped>
.groups {
  display: flex;
  flex-wrap: wrap;
}

.menu-show {
  height: 150px;
  width: 120px;
}
.donorRules-flex {
  display: flex;
  flex-wrap: wrap;
}
.menu-card {
  border: black 1px solid;
  margin: 10px;
  padding: 10px;
}
.menu-show {
  border: black 1px solid;
  margin: 10px;
  padding: 10px;

  &-body {
    height: 80%;
  }

  &-footer {
    display: flex;
    height: 20%;
    margin-bottom: 0;
  }

  &:hover {
    border: 2px;
    cursor: pointer;
    background: #7a7a7a;
  }
}

.menu-selected {
  background: #0075b2;
}
</style>
