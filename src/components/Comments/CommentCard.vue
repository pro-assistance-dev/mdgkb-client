<template>
  <div class="reviews-block">
    <div class="user-avatar">
      <svg class="icon-avatar">
        <use xlink:href="#avatar"></use>
      </svg>
      <Rating :with-numbers="false" :comments="[{ comment: comment }]" />
    </div>
    <div class="reviews-info">
      <h3 v-if="comment?.user?.human?.name" class="name">{{ comment.user.human.name }}</h3>
      <h3 v-if="question?.user?.human?.name && isQuestion" class="name">{{ question.user.human.name }}</h3>

      <h4 v-if="!isQuestion" class="reviews-date-time">
        {{ !isReview ? 'Комментарий' : 'Отзыв' }} от {{ $dateFormatRu(comment.publishedOn, true, true) }}
      </h4>
      <h4 v-else class="reviews-date-time">Вопрос от {{ $dateFormatRu(question.date, true, true) }}</h4>

      <h4 v-if="!isQuestion" class="reviews-text">{{ comment.text }}</h4>
      <h4 v-else class="reviews-text" white-space: pre-line>{{ question.question }}</h4>
    </div>
  </div>
  <div v-if="comment.answer || question.answer" class="review-for-review">
    <div class="mdgkb-avatar">
      <Component :is="require(`@/assets/img/mdgkb-avatar.svg`).default" id="mdgkb-avatar-svg"></Component>
    </div>
    <div class="review-for-review-info">
      <h4 v-if="!isQuestion" class="review-for-review-text">{{ comment.answer }}</h4>
      <h4 v-else class="review-for-review-text" v-html="question.answer ? question.answer : 'Вопрос обрабатывается'"></h4>
    </div>
  </div>
  <svg width="0" height="0" class="hidden">
    <symbol id="avatar" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130 130">
      <path
        d="M108.668 101.278C114.502 94.2585 118.56 85.937 120.498 77.0175C122.436 68.098 122.197 58.843 119.802 50.0353C117.407 41.2277 112.925 33.1264 106.737 26.417C100.548 19.7076 92.835 14.5873 84.2492 11.4894C75.6634 8.39145 66.4578 7.40696 57.4111 8.61921C48.3644 9.83146 39.7427 13.2048 32.2754 18.4538C24.8081 23.7028 18.7149 30.6732 14.5112 38.7751C10.3075 46.8771 8.11703 55.8723 8.12502 64.9999C8.12809 78.2688 12.804 91.1127 21.3322 101.278L21.251 101.347C21.5353 101.688 21.8603 101.981 22.1528 102.318C22.5185 102.736 22.9125 103.131 23.2903 103.537C24.4278 104.772 25.5978 105.958 26.8247 107.071C27.1985 107.412 27.5844 107.729 27.9622 108.054C29.2622 109.176 30.5988 110.24 31.9841 111.231C32.1628 111.353 32.3253 111.511 32.5041 111.637V111.589C42.0189 118.284 53.3695 121.878 65.0041 121.878C76.6387 121.878 87.9893 118.284 97.5041 111.589V111.637C97.6828 111.511 97.8413 111.353 98.0241 111.231C99.4053 110.236 100.746 109.176 102.046 108.054C102.424 107.729 102.81 107.408 103.183 107.071C104.41 105.954 105.58 104.772 106.718 103.537C107.096 103.131 107.486 102.736 107.855 102.318C108.144 101.981 108.473 101.688 108.757 101.343L108.668 101.278ZM65 32.4999C68.6157 32.4999 72.1502 33.5721 75.1565 35.5808C78.1629 37.5896 80.506 40.4447 81.8897 43.7852C83.2734 47.1257 83.6354 50.8014 82.93 54.3476C82.2246 57.8939 80.4835 61.1513 77.9268 63.7079C75.3701 66.2646 72.1127 68.0057 68.5665 68.7111C65.0203 69.4165 61.3446 69.0545 58.0041 67.6708C54.6636 66.2871 51.8085 63.944 49.7997 60.9377C47.7909 57.9313 46.7188 54.3968 46.7188 50.7811C46.7188 45.9327 48.6448 41.2827 52.0732 37.8543C55.5016 34.4259 60.1515 32.4999 65 32.4999V32.4999ZM32.5285 101.278C32.5989 95.9438 34.7667 90.8518 38.5627 87.1037C42.3588 83.3555 47.4779 81.2526 52.8125 81.2499H77.1875C82.5222 81.2526 87.6413 83.3555 91.4373 87.1037C95.2334 90.8518 97.4011 95.9438 97.4716 101.278C88.5619 109.307 76.9936 113.75 65 113.75C53.0065 113.75 41.4382 109.307 32.5285 101.278V101.278Z"
      ></path>
    </symbol>
  </svg>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import Question from '@/classes/Question';
import Rating from '@/components/Rating.vue';
import IComment from '@/interfaces/comments/IComment';
import IQuestion from '@/interfaces/IQuestion';

export default defineComponent({
  name: 'CommentCard',
  components: { Rating },
  props: {
    comment: {
      type: Object as PropType<IComment>,
      default: new Comment(),
    },
    question: {
      type: Object as PropType<IQuestion>,
      default: new Question(),
    },
    isQuestion: {
      type: Boolean,
      default: false,
    },
    isReview: {
      type: Boolean,
      default: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.user-avatar {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.reviews-block {
  display: flex;
  margin-bottom: 20px;
}

.icon-avatar {
  display: flex;
  width: 130px;
  height: 130px;
  fill: #c7c7c7;
}

.reviews-info {
  display: block;
  margin-top: 10px;
  margin-left: 15px;
  width: 100%;
}

.name {
  display: flex;
  font-family: 'Open sans', sans-serif, Arial;
  font-size: 16px;
  letter-spacing: 0.05em;
  color: #343e5c;
  align-items: center;
  font-weight: bold;
}

.reviews-date-time {
  display: flex;
  font-family: 'Open sans', sans-serif, Arial;
  letter-spacing: 0.06em;
  font-size: 12px;
  color: #a9aec4;
  font-weight: normal;
  margin: 0 0 0 0;
}

.reviews-text {
  display: flex;
  font-family: 'Open sans', sans-serif, Arial;
  letter-spacing: 0.05em;
  font-weight: normal;
  font-size: 14px;
  color: #5d6477;
  margin-top: 25px;
  text-align: justify;
  margin-right: 10px;
}

.review-for-review {
  display: flex;
  margin-left: 105px;
}

.mdgkb-avatar {
  display: flex;
  width: 70px;
  height: 70px;
  fill: #c7c7c7;
  border: 1px solid rgba(0, 0, 0, 0.05);
  background-clip: padding-box;
  border-radius: 50%;
}

.review-for-review-info {
  display: flex;
  font-family: 'Open sans', sans-serif, Arial;
  letter-spacing: 0.1em;
  font-size: 12px;
  color: #5d6477;
}

.review-for-review-text {
  font-family: 'Open sans', sans-serif, Arial;
  letter-spacing: 0.05em;
  font-weight: normal;
  font-size: 14px;
  color: #5d6477;
  margin: 0 0 0 20px;
  text-align: justify;
}
</style>
