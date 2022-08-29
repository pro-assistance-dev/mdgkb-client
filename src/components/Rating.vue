<template>
  <div class="line-block">
    <el-rate

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
        <span class="NameNumbers">{{ buildNameNumbers(comments, ['отзыв', 'отзыва', 'отзывов']) }}</span>
      </div>
    </a>
  </div>

  <svg width="0" height="0" class="hidden">
    <symbol id="prime_comment" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        d="M4.50121 20.25C4.38014 20.2521 4.26037 20.2248 4.15212 20.1705C4.04388 20.1163 3.95038 20.0366 3.87963 19.9383C3.80888 19.8401 3.76297 19.7261 3.74583 19.6063C3.72869 19.4864 3.74083 19.3641 3.78121 19.25L5.38121 14C5.03298 13.0973 4.85661 12.1375 4.86121 11.17C4.85962 10.1057 5.0704 9.0518 5.48121 8.06999C5.8842 7.13047 6.46097 6.27549 7.18121 5.54999C7.90504 4.82306 8.76466 4.24545 9.71121 3.84999C10.6901 3.4344 11.7427 3.22021 12.8062 3.22021C13.8697 3.22021 14.9223 3.4344 15.9012 3.84999C17.3353 4.46429 18.5586 5.48452 19.4203 6.7851C20.282 8.08568 20.7446 9.60985 20.7512 11.17C20.745 13.2771 19.9077 15.2966 18.4212 16.79C17.6957 17.5102 16.8407 18.087 15.9012 18.49C14.0104 19.2819 11.8877 19.3177 9.97121 18.59L4.72121 20.19C4.65099 20.22 4.57696 20.2402 4.50121 20.25ZM12.8012 4.74999C11.5347 4.75547 10.2974 5.13143 9.2419 5.83153C8.18642 6.53164 7.35885 7.52528 6.86121 8.68999C6.20006 10.2911 6.20006 12.0889 6.86121 13.69C6.92079 13.8548 6.92079 14.0352 6.86121 14.2L5.63121 18.37L9.78121 17.11C9.94599 17.0504 10.1264 17.0504 10.2912 17.11C11.0836 17.439 11.9332 17.6083 12.7912 17.6083C13.6492 17.6083 14.4988 17.439 15.2912 17.11C16.072 16.7813 16.7802 16.3018 17.3754 15.6989C17.9706 15.096 18.4409 14.3816 18.7596 13.5967C19.0782 12.8118 19.2388 11.9717 19.2322 11.1245C19.2256 10.2774 19.052 9.4399 18.7212 8.65999C18.2247 7.50094 17.3993 6.51285 16.3471 5.81792C15.2949 5.123 14.0622 4.75171 12.8012 4.74999Z"
      ></path>
    </symbol>
  </svg>
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
  // margin-top: 10px;
  color: #2754eb;
  text-decoration: none;
  letter-spacing: 1px;
  font-weight: bold;
  font-size: 11px;
  &:hover {
    color: darken(#2754eb, 20%);
    cursor: pointer;
  }
}

.line-block {
  width: 95%;
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
  width: 29px;
  height: 29px;
  fill: #2653ea;
  margin-right: 10px;
}

@media screen and (max-width: 768px) {
  :deep(.el-rate__icon) {
    font-size: 14px;
  }
}
</style>
