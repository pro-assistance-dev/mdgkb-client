<template>
  <CollapsContainer v-if="division.scheduleAndRulesExists()" tab-id="5" :collapsed="false">
    <template #inside-title>
      <div class="title-in">Распорядок дня</div>
    </template>
    <template #inside-content>
      <div
        v-if="division.schedule.scheduleItems.length || division.visitingRulesGroups.length"
        data-test="schedule-items-block"
        class="schedule"
      >
        <div class="block">
          <div class="left-block">
            <div class="point">
              <ul class="point-list">
                <!-- <li v-for="item in division.schedule.scheduleItems" :key="item.id" class="point-list-item"> -->
                <li v-for="item in division.schedule.scheduleItems" :key="item.id" class="point-list-item">
                  <div class="point-info">
                    <h4 class="point-text">{{ item.getPeriodWithName() }}</h4>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="right-block">
            <div
              v-for="rulesGroup in division.visitingRulesGroups"
              :key="rulesGroup.id"
              class="rules-text"
              :style="{ color: rulesGroup.color }"
            >
              <h4 v-if="rulesGroup.name.length" class="rules-list-title">{{ rulesGroup.name }}</h4>
              <div class="rules-list">
                <ul class="schedule-list">
                  <li v-for="rule in rulesGroup.getVisitingRulesList()" :key="rule.id" class="schedule-list-item">
                    <h4 class="point-text">{{ rule.text }}</h4>
                  </li>
                </ul>
              </div>
              <template v-for="rule in rulesGroup.getVisitingRulesText()" :key="rule.id">
                <h4 class="point-text">{{ rule.text }}</h4>
                <br />
              </template>
            </div>
          </div>
        </div>
      </div>
    </template>
  </CollapsContainer>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import Division from '@/classes/Division';
import CollapsContainer from '@/components/Main/CollapsContainer/CollapsContainer.vue';

export default defineComponent({
  name: 'DivisionSchedule',
  components: { CollapsContainer },
  props: {
    division: { type: Object as PropType<Division>, required: true },
  },
});
</script>

<style scoped lang="scss">
@import '@/assets/styles/elements/base-style.scss';
* {
  padding: 0px;
  margin: 0px;
}

*,
::after,
::before {
  box-sizing: initial;
}

html,
body {
  height: 100%;
}

html {
  scroll-behavior: smooth;
}

.education {
  background: #ffffff;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  background-clip: padding-box;
  margin-top: 30px;
  height: auto;
  // padding: 0px 25px 0px 23px;
}

.block {
  display: flex;
  justify-content: space-between;
}

.left-block {
  display: flex;
  min-height: 10px;
  width: 100%;
  margin: 0 25px;
}

.right-block {
  display: block;
  min-width: 300px;
  max-width: 420px;
  height: auto;
  margin: 0 25px;
}

.title-in {
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 22px;
  letter-spacing: 0.1em;
  color: $site_dark_gray;
  height: 60px;
  align-items: center;
  font-weight: bold;
}

.point {
  display: flex;
  margin: 0px 0px 20px 20px;
}

.point-info {
  display: block;
  height: auto;
  margin: 3px 0px 0px 5px;
}

.point-year {
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  letter-spacing: 0.1em;
  font-size: 14px;
  color: #a1a7bd;
  font-weight: bold;
}

.point-text {
  font-family: $title-font;
  letter-spacing: $doctor-text-letter-spacing;
  font-size: $doctor-text-font-size;
  color: $site_dark_gray;
  font-weight: $doctor-text-font-weight;
  line-height: 150%;
}

/* Decoration of lists */

.point-list {
  padding-left: 0;
  margin: 0;
  list-style: none;
}

.point-list-item {
  margin: 0rem;
  padding-left: 25px;
  position: relative;
}

.point-list-item:before {
  content: '';
  position: absolute;
  top: 3px;
  left: 0;
  width: 10px;
  height: 10px;
  border: 2px solid #a1a7bd;
  background-color: #ffffff;
  border-radius: 50%;
  z-index: 2;
}

.point-list-item:after {
  content: '';
  position: absolute;
  top: -4px;
  left: 6px;
  width: 2px;
  height: calc(100% + 1rem);
  background-color: #a1a7bd;
}

.point-list-item:last-of-type:after {
  height: calc(100% + 0.8rem);
}

.rules-list-title {
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 18px;
  letter-spacing: 0.1em;
  color: $site_dark_gray;
  height: 80px;
  align-items: center;
  font-weight: bold;
}

.schedule {
  display: block;
  background: #ffffff;
  background-clip: padding-box;
  margin-top: 30px;
  padding: 0px 25px 25px 25px;
}

.schedule-list {
  padding-left: 0;
  margin: 0;
  list-style: none;
}

.schedule-list-item {
  margin-bottom: 0.5rem;
  padding-left: 25px;
  position: relative;
  margin-left: 10px;
}

.schedule-list-item:before {
  content: '';
  position: absolute;
  top: 4px;
  left: 0;
  width: 7px;
  height: 7px;
  background-color: $main_red;
  border-radius: 50%;
}
</style>
