<template>
  <div class="card-item">
    <ChiefCard v-if="course.mainTeacherId" :employee="course.mainTeacher" chief-role="Руководитель курса" :show-favourite="false" />

    <div class="card-item-field">
      <div class="card-item-middle">
        <div class="division-name" data-test="division-name">{{ course.name }}<br /></div>
        <div class="card-item-middle-bottom">
          <div class="info-block">
            <div>
              <div><b>Язык обучения:</b> русский</div>
              <div><b>Срок получения образования, включая каникулы</b>: 2 года</div>
            </div>
            <div v-html="course.description" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import NmoCourse from '@/classes/NmoCourse';
import ChiefCard from '@/components/ChiefCard.vue';

export default defineComponent({
  name: 'NmoCourseInfo',
  components: {
    ChiefCard,
  },
  props: {
    course: { type: Object as PropType<NmoCourse>, required: true },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
@import '@/assets/styles/elements/division-info.scss';

// test block
.test {
  width: 290px;
  height: 290px;
  background: #c4c4c4;
}

.division-name {
  margin: 0px;
}
</style>
