<template>
  <div :key="headerParams" class="admin-header-bottom">
    <div class="flex-between">
      <el-page-header v-if="headerParams.showBackButton" title=" " :content="headerParams.title" @back="goBack" />
      <h4 v-else style="margin-left: 20px">
        {{ headerParams.title }}
        <el-badge v-if="headerParams.applicationsCount" :value="headerParams.applicationsCount" type="danger"></el-badge>
      </h4>
      <div class="button-group">
        <div v-for="item in headerParams.buttons" :key="item">
          <el-button
            v-if="item.action && item.condition"
            :key="item.condition"
            round
            size="small"
            :loading="buttonClicked"
            :disabled="buttonClicked"
            :type="item.type"
            @click.prevent="action(item.action)"
          >
            {{ item.text }}
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, Ref, ref, watch } from 'vue';

import { buttonAction } from '@/services/classes/admin/AdminButtonParams';
import AdminHeaderParams from '@/services/classes/admin/AdminHeaderParams';
import Provider from '@/services/Provider/Provider';
export default defineComponent({
  name: 'AdminHeaderBottom',

  setup() {
    const headerParams: Ref<AdminHeaderParams> = computed(() => Provider.store.getters['admin/headerParams']);
    const goBack = () => {
      Provider.router.go(-1);
    };
    const buttonClicked: Ref<boolean> = ref(false);

    const action = (f: CallableFunction) => {
      buttonClicked.value = true;
      f();
      buttonClicked.value = false;
    };

    return {
      action,
      buttonClicked,
      headerParams,
      goBack,
    };
  },
});
</script>

<style lang="scss" scoped>
$header-bottom-height: 20px;
$header-bottom-background-color: whitesmoke;
// $header-shadow: 0 0 10px 0 rgb(0 0 0 / 20%);
$header-shadow: 0 10px 10px -10px rgba(0 0 0 / 20%);

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
