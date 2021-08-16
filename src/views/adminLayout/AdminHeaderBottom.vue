<template>
  <div class="admin-header-bottom">
    <div v-if="showSaveButton" class="flex-between">
      <el-page-header title="" :content="pageTitle" @back="goBack" />
      <el-button type="success" :loading="loadingSaveButton" @click.prevent="submit">Сохранить</el-button>
    </div>
    <h4 v-else style="margin-left: 20px">{{ pageTitle }}</h4>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const pageTitle = computed(() => store.getters['admin/pageTitle']);
    const showSaveButton = computed(() => store.getters['admin/showSaveButton']);
    const loadingSaveButton = computed(() => store.getters['admin/loadingSaveButton']);
    const submit = computed(() => store.getters['admin/submit']);
    const goBack = () => {
      router.go(-1);
    };
    return {
      pageTitle,
      goBack,
      showSaveButton,
      submit,
      loadingSaveButton,
    };
  },
});
</script>

<style lang="scss" scoped>
$header-bottom-height: 20px;
$header-bottom-background-color: whitesmoke;
$header-shadow: 0 0 10px 0 rgb(0 0 0 / 20%);

.admin-header-bottom {
  height: $header-bottom-height;
  box-shadow: $header-shadow;
  background-color: $header-bottom-background-color;
  display: flex;
  align-items: center;
  padding: 20px 10px;
}

h4 {
  font-weight: normal;
  font-size: 18px;
}
.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0 20px;
}
</style>
