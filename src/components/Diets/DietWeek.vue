<template>
  <div class="week">
    <div class="form_radio_btn">
      <input id="radio-1" type="radio" name="radio" value="1" checked />
      <label for="radio-1">Понедельник</label>
    </div>

    <div class="form_radio_btn">
      <input id="radio-2" type="radio" name="radio" value="2" />
      <label for="radio-2">Вторник</label>
    </div>

    <div class="form_radio_btn">
      <input id="radio-3" type="radio" name="radio" value="3" />
      <label for="radio-3">Среда</label>
    </div>

    <div class="form_radio_btn">
      <input id="radio-4" type="radio" name="radio" value="4" />
      <label for="radio-4">Четверг</label>
    </div>

    <div class="form_radio_btn">
      <input id="radio-5" type="radio" name="radio" value="5" />
      <label for="radio-5">Пятница</label>
    </div>

    <div class="form_radio_btn">
      <input id="radio-6" type="radio" name="radio" value="6" />
      <label for="radio-6">Суббота</label>
    </div>

    <div class="form_radio_btn">
      <input id="radio-7" type="radio" name="radio" value="7" />
      <label for="radio-7">Воскресенье</label>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
  name: 'DietWeek',

  setup() {
    const mounted = ref(false);

    onMounted(async () => {
      mounted.value = true;
    });

    return {
      mounted,
    };
  },
});
</script>

<style scoped lang="scss">
@import '@/assets/styles/elements/base-style.scss';
.week {
  width: 1040px;
  height: 60px;
  display: flex;
  justify-content: space-between;
}

.form_radio_btn {
  display: flex;
  align-items: center;
}

.form_radio_btn input[type='radio'] {
  display: none;
}
.form_radio_btn label {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 130px;
  height: 20px;
  border: 1px solid #a5a5bf;
  border-radius: 10px;
  user-select: none;
  background: #ffffff;
  color: #a5a5bf;
}

/* Checked */
.form_radio_btn input[type='radio']:checked + label {
  background: #123dce;
  color: #ffffff;
  border: 1px solid #123dce;
}

/* Hover */
.form_radio_btn label:hover {
  background: #f6f6f6;
}

/* Disabled */
.form_radio_btn input[type='radio']:disabled + label {
  // background: #efefef;
  background: #ffffff;
  color: #a5a5bf;
}
</style>
