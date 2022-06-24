<template>
  <div class="side-container">
    <div class="side-item">
      <div class="card-item">
        <el-menu default-active="0">
          <el-menu-item v-for="(item, index) in partnerTypes" :key="item.id" :index="String(index)" @click="$emit('load', item)">
            <span>{{ item.name }}</span>
          </el-menu-item>
        </el-menu>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import IPartnerType from '@/interfaces/partners/IPartnerType';

export default defineComponent({
  name: 'PartnersMenu',
  props: {
    partnerTypes: {
      type: Object as PropType<IPartnerType[]>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
$side-cotainer-max-width: 300px;
$content-max-width: 1000px;
$card-margin-size: 30px;

.partner-page-container {
  display: flex;
  justify-content: center;
  width: 100%;
}
.el-menu {
  margin-right: 10px;
}

.side-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: $side-cotainer-max-width;
  margin-right: $card-margin-size;

  .side-item {
    margin-bottom: $card-margin-size;
  }
}

:deep(.cell-row) {
  padding: 0 !important;
  cursor: pointer;
}

.content-container {
  max-width: $content-max-width;
  width: 100%;
}

:deep(.el-menu-item) {
  background: #ffffff;
  font-size: 14px !important;
  border-bottom: solid 1px var(--el-menu-border-color);
}

:deep(.el-menu) {
  margin-right: 0;
  border-right: none;
}
</style>
