<template>
  <div class="admin-header-bottom">
    <div class="flex-between">
      <el-page-header v-if="headerParams.showBackButton" title=" " :content="headerParams.title" @back="goBack" />
      <h4 v-else style="margin-left: 20px">{{ headerParams.title }}</h4>
      <div class="button-group">
        <div v-for="(item, i) in headerParams.buttons" :key="i">
          <el-button v-if="item.action" round size="small" :type="item.type" @click.prevent="item.action">{{ item.text }}</el-button>
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
  name: 'AdminHeaderBottom',

  setup() {
    const store = useStore();
    const router = useRouter();
    const headerParams = computed(() => store.getters['admin/headerParams']);
    const goBack = () => {
      router.go(-1);
    };
    return {
      headerParams,
      goBack,
    };
  },
  methods: {
    clickBtn() {
      console.log('vBtn Press');
    },
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
.button-group {
  display: flex;
  flex-wrap: wrap;
  .el-button {
    margin-left: 5px;
  }
}
</style>
