<template>
  <div v-if="showHeader" class="profile-header-container">
    <div class="flex-between">
      <el-page-header v-if="headerParams.showBackButton" title=" " :content="headerParams.title" @back="goBack" />
      <h4 v-else>{{ headerParams.title }}</h4>
      <div class="button-group">
        <div v-for="(item, i) in headerParams.buttons" :key="i">
          <el-button v-if="item.action && item.condition" round size="small" :type="item.type" @click.prevent="item.action()">
            {{ item.text }}
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'ProfileHeader',

  setup() {
    const store = useStore();
    const router = useRouter();
    const headerParams = computed(() => store.getters['admin/headerParams']);
    const showHeader = computed(() => store.getters['admin/showHeader']);
    const goBack = () => {
      router.go(-1);
    };
    return {
      headerParams,
      goBack,
      showHeader,
    };
  },
});
</script>

<style lang="scss" scoped>
$header-height: 40px;
$header-background-color: whitesmoke;
$header-shadow: 0 0 10px 0 rgb(0 0 0 / 20%);

.profile-header-container {
  height: $header-height;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

h4,
:deep(.el-page-header__content),
:deep(.el-icon-back) {
  font-weight: bold;
  font-size: 24px;
}
.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.button-group {
  display: flex;
  flex-wrap: wrap;
  .el-button {
    margin-left: 5px;
  }
}
</style>
