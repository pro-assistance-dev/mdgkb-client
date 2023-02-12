<template>
  <div class="card-item">
    <ChiefCard
      v-if="course.getMainTeacher()"
      :chief="course.getMainTeacher().doctor"
      chief-role="Руководитель курса"
      :show-favourite="false"
    />

    <div class="card-item-field">
      <div class="card-item-middle">
        <div class="division-name" data-test="division-name">
          {{ course.getFullName() }}<br />
          {{ course.getPeriod() }}
        </div>
        <div class="card-item-middle-bottom">
          <div class="info-block">
            <!--            <div class="contact-h3">-->
            <!--              <TimetableComponent :timetable="timetable" />-->
            <!--            </div>-->
          </div>
        </div>
      </div>

      <div class="card-item-right">
        <a @click="openApplicationDialog">
          <button>Подать заявление</button>
        </a>
      </div>
    </div>
  </div>
  <Time />
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { defineComponent, PropType, Ref, ref } from 'vue';

import ResidencyCourse from '@/classes/ResidencyCourse';
import ChiefCard from '@/components/ChiefCard.vue';

export default defineComponent({
  name: 'ResidencyCourseInfo',
  components: {
    ChiefCard,
  },
  props: {
    course: { type: Object as PropType<ResidencyCourse>, required: true },
  },
  setup() {
    const applicationDialogOpen: Ref<boolean> = ref(false);
    const openApplicationDialog = () => {
      applicationDialogOpen.value = true;
      ElMessage({ message: 'Возможность подать заявление будет предоставлена позже', type: 'warning' });
    };
    return { openApplicationDialog };
  },
});
</script>

<style lang="scss" scoped>
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
