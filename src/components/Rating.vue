<template>
  <el-rate
    :model-value="countRating(comments)"
    size="large"
    disabled
    void-color="#A1A7BD"
    disabled-void-color="#A1A7BD"
    :colors="['#FF4D3B', '#FF4D3B', '#FF4D3B']"
  >
  </el-rate>
  <a v-if="withNumbers" @click="$scroll('#reviews')">{{ buildNameNumbers(comments, ['отзыв', 'отзыва', 'отзывов']) }}</a>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import IWithComment from '@/interfaces/IWithComment';
import buildNameNumbers from '@/mixins/buildNameNumbers';
import countRating from '@/mixins/countRating';

export default defineComponent({
  name: 'Rating',
  props: {
    comments: {
      type: Object as PropType<IWithComment[]>,
      required: true,
    },
    withNumbers: {
      type: Boolean,
      default: true,
    },
  },

  setup() {
    return { countRating, buildNameNumbers };
  },
});
</script>

<style lang="scss" scoped>
:deep(.el-rate__icon) {
  margin: 0;
  font-size: 20px;
}
.el-rate {
  margin-bottom: 5px;
}
a {
  color: #2754eb;
  text-decoration: none;
  letter-spacing: 1px;
  font-weight: bold;
  font-size: 11px;
  &:hover {
    color: darken(#2754eb, 10%);
    cursor: pointer;
  }
}
</style>
