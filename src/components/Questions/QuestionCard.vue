<template>
  <el-card>
    <div class="question paragraph">
      <QuestionCircleOutlined />
      <div style="white-space: pre-line">
        {{ question }}
      </div>
    </div>
    <div class="answer paragraph">
      <InfoCircleOutlined />
      <div style="white-space: pre-line">
        <div v-if="answer" v-html="answer"></div>
        <div v-else>Вопрос обрабатывается</div>
      </div>
    </div>
    <div class="questoin-date">
      {{ $dateTimeFormatter.format(date) }}
    </div>
  </el-card>
</template>

<script lang="ts">
import { InfoCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons-vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'QuestionCard',
  components: { QuestionCircleOutlined, InfoCircleOutlined },
  props: {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
.el-card__body {
  .questoin-date {
    margin-top: 5px;
    text-align: end;
    font-style: italic;
  }
  .anticon {
    font-size: 25px;
    margin-right: 10px;
    color: grey;
  }
  .paragraph {
    display: flex;
    align-items: flex-start;
  }
  .question {
    margin-bottom: 20px;
  }
  .answer {
    font-style: italic;
  }
}
</style>
