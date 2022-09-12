<template>
    <div class="rules-title">
        <h4 class="point-text">Время проведения медицинских процедур осуществляется согласно назначениям лечащего врача.</h4><br>
        <h4 class="point-text">За нарушение режима и Правил внутреннего распорядка стационара Пациент (законный представитель) может быть досрочно выписан с соответствующей отметкой в больничном листке или справке.</h4><br>        
      </div>
      <div class="rules-list">
        <div class="rules-title">Нарушением считается:</div>
          <ul class="services-list">
            <li class="services-list-item">
              <h4 class="point-text">1</h4>
            </li>
            <li class="services-list-item">
              <h4 class="point-text">2</h4>
            </li>
          </ul>
      </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
    name: 'Rules',
    setup() {
        
    },
})
</script>

<style scoped lang="scss">

.point-text {
  display: flex;
  font-family: $title-font;
  letter-spacing: $doctor-text-letter-spacing;
  font-size: $doctor-text-font-size;
  color: $site_dark_gray;
  font-weight: $doctor-text-font-weight;
  line-height: $doctor-text-line-height;
}

</style>
