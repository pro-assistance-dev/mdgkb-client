<template>
  <div class="line-block2">
    <el-rate
      v-if="countRating(comments) > 0"
      :model-value="countRating(comments)"
      size="large"
      disabled
      show-score
      :score-template="`${countRating(comments).toFixed(2)}`"
      void-color="#A1A7BD"
      disabled-void-color="#A1A7BD"
      :colors="['#FF4D3B', '#FF4D3B', '#FF4D3B']"
    >
    </el-rate>

    <a v-if="withNumbers" @click="$scroll('#reviews')">
      <div class="numbers-comment">
        <svg v-if="withNumbers" class="icon-comment">
          <use xlink:href="#prime_comment"></use>
        </svg>
        <span class="NameNumbers">
          {{ buildNameNumbers(comments, ['отзыв', 'отзыва', 'отзывов']) }}
        </span>
      </div>
    </a>
    <Comment />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import Comment from '@/assets/svg/DivisionCard/Comment.svg';
import IWithComment from '@/interfaces/IWithComment';
import buildNameNumbers from '@/services/buildNameNumbers';
import countRating from '@/services/countRating';

export default defineComponent({
  name: 'Rating',
  components: {
    Comment,
  },
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
@import '@/assets/styles/base-style.scss';
:deep(.el-rate__icon) {
  margin: 0;
  font-size: 14px;
  vertical-align: 5px;
}
:deep(.el-rate__text) {
  margin-left: 5px;
  font-weight: bold;
}

:deep(.el-rate) {
  white-space: nowrap;
}

a {
  color: $site_blue;
  text-decoration: none;
  letter-spacing: $doctor-text-letter-spacing;
  font-weight: $base-font-bold-weight;
  font-size: $doctor-text-font-size;
  &:hover {
    .icon-comment {
      fill: darken($site_blue, 30%);
    }
    color: darken($site_blue, 30%);
    cursor: pointer;
  }
}

.line-block2 {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
}

.numbers-comment {
  display: flex;
  justify-content: right;
  align-items: center;
  min-width: 120px;
  text-align: center;
}

.NameNumbers {
  margin-top: 2px;
}

.icon-comment {
  width: 24px;
  height: 24px;
  fill: #2653ea;
  margin-right: 8px;
}

.hidden {
  display: none;
}

@media screen and (max-width: 768px) {
  :deep(.el-rate__icon) {
    font-size: 14px;
  }
}
</style>
