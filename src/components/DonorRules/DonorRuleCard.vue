<template>
  <el-card class="donor-card">
    <div class="donor-img-container">
      <img
        v-if="donorRule.image.fileSystemPath"
        :src="donorRule.image.getImageUrl()"
        alt="alt"
        @error="errorImg"
        @click="$emit('showRule')"
      />
      <img v-else src="@/assets/img/310x310.png" />
      <div class="star-icon-container">
        <el-icon v-if="donorRule.isFavourite()" class="favor" @click="$emit('removeFromUser')"><StarFilled /></el-icon>
        <el-icon v-else @click="$emit('addToUser')"><Star /></el-icon>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts">
import { Star, StarFilled } from '@element-plus/icons-vue';
import { defineComponent, PropType } from 'vue';

import IDonorRule from '@/interfaces/IDonorRule';

export default defineComponent({
  name: 'DonorRuleCard',
  components: { StarFilled, Star },
  props: {
    donorRule: {
      type: Object as PropType<IDonorRule>,
      required: true,
    },
  },
  emits: ['showRule', 'removeFromUser', 'addToUser'],
});
</script>

<style lang="scss" scoped>
.donor-card {
  width: 400px;
  border-radius: 15px;
  margin: 10px;
  color: #4a4a4a;
  font-size: 14px;
  position: relative;

  &:hover {
    cursor: pointer;
    margin-top: 5px;
  }

  .donor-img-container {
    margin: 0 10px 10px 0;
    img {
      width: 100%;
    }
    .star-icon-container {
      position: absolute;
      top: 5px;
      right: 30px;
      transition: transform 0.2s;
      &:hover {
        cursor: pointer;
        transform: scale(1.1);
      }
      .icon {
        font-size: 30px;
        margin: 5px;
        background-color: white;
      }
      .favor {
        color: orange;
      }
    }
  }
  .donor-name {
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
  }
}
</style>
