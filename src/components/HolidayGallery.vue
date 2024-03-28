<template>
  <div class="all">
    <input id="desktop" checked type="radio" name="respond" />
    <article id="slider">
      <input id="switch1" checked type="radio" name="slider" />
      <input id="switch2" type="radio" name="slider" />
      <input id="switch3" type="radio" name="slider" />
      <input id="switch4" type="radio" name="slider" />
      <input id="switch5" type="radio" name="slider" />
      <input id="switch6" type="radio" name="slider" />
      <input id="switch7" type="radio" name="slider" />
      <input id="switch8" type="radio" name="slider" />
      <input id="switch9" type="radio" name="slider" />
      <input id="switch10" type="radio" name="slider" />
      <input id="switch11" type="radio" name="slider" />
      <input id="switch12" type="radio" name="slider" />
      <input id="switch13" type="radio" name="slider" />
      <input id="switch14" type="radio" name="slider" />
      <input id="switch15" type="radio" name="slider" />
      <input id="switch16" type="radio" name="slider" />
      <input id="switch17" type="radio" name="slider" />
      <input id="switch18" type="radio" name="slider" />
      <input id="switch19" type="radio" name="slider" />
      <input id="switch20" type="radio" name="slider" />
      <div id="slides">
        <div id="overflow">
          <div class="image">
            <article>
              <div class="doctor-img">
                <img src="src/assets/img/for_holiday/DSC01785.jpg" />
              </div>
            </article>
            <article>
              <div class="doctor-img">
                <img src="src/assets/img/for_holiday/DSC01818.jpg" />
              </div>
            </article>
            <article>
              <div class="doctor-img">
                <img src="src/assets/img/for_holiday/DSC01826.jpg" />
              </div>
            </article>
            <article>
              <div class="doctor-img">
                <img src="src/assets/img/for_holiday/DSC01856.jpg" />
              </div>
            </article>
            <article>
              <div class="doctor-img">
                <img src="src/assets/img/for_holiday/DSC01862.jpg" />
              </div>
            </article>
            <article>
              <div class="doctor-img">
                <img src="src/assets/img/for_holiday/DSC01869.jpg" />
              </div>
            </article>
            <article>
              <div class="doctor-img">
                <img src="src/assets/img/for_holiday/DSC01889.jpg" />
              </div>
            </article>
            <article>
              <div class="doctor-img">
                <img src="src/assets/img/for_holiday/DSC01932.jpg" />
              </div>
            </article>
            <article>
              <div class="doctor-img">
                <img src="src/assets/img/for_holiday/DSC01934.jpg" />
              </div>
            </article>
            <article>
              <div class="doctor-img">
                <img src="src/assets/img/for_holiday/DSC01961.jpg" />
              </div>
            </article>
            <article>
              <div class="doctor-img">
                <img src="src/assets/img/for_holiday/DSC01994.jpg" />
              </div>
            </article>
            <article>
              <div class="doctor-img">
                <img src="src/assets/img/for_holiday/DSC02031.jpg" />
              </div>
            </article>
            <article>
              <div class="doctor-img">
                <img src="src/assets/img/for_holiday/DSC02066.jpg" />
              </div>
            </article>
            <article>
              <div class="doctor-img">
                <img src="src/assets/img/for_holiday/DSC02118.jpg" />
              </div>
            </article>
            <article>
              <div class="doctor-img">
                <img src="src/assets/img/for_holiday/DSC02130.jpg" />
              </div>
            </article>
            <article>
              <div class="doctor-img">
                <img src="src/assets/img/for_holiday/DSC02167.jpg" />
              </div>
            </article>
            <article>
              <div class="doctor-img">
                <img src="src/assets/img/for_holiday/DSC02186.jpg" />
              </div>
            </article>
            <article>
              <div class="doctor-img">
                <img src="src/assets/img/for_holiday/DSC02234.jpg" />
              </div>
            </article>
            <article>
              <div class="doctor-img">
                <img src="src/assets/img/for_holiday/DSC02296.jpg" />
              </div>
            </article>
            <article>
              <div class="doctor-img">
                <img src="src/assets/img/for_holiday/DSC02303.jpg" />
              </div>
            </article>
          </div>
        </div>
      </div>
      <div id="active">
        <label for="switch1"></label>
        <label for="switch2"></label>
        <label for="switch3"></label>
        <label for="switch4"></label>
        <label for="switch5"></label>
        <label for="switch6"></label>
        <label for="switch7"></label>
        <label for="switch8"></label>
        <label for="switch9"></label>
        <label for="switch10"></label>
        <label for="switch11"></label>
        <label for="switch12"></label>
        <label for="switch13"></label>
        <label for="switch14"></label>
        <label for="switch15"></label>
        <label for="switch16"></label>
        <label for="switch17"></label>
        <label for="switch18"></label>
        <label for="switch19"></label>
        <label for="switch20"></label>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HolidayGallery',
  components: {},
});
</script>

<style scoped lang="scss">
#slider {
  /*положение слайдера*/
  position: relative;
  text-align: center;
  top: 10px;
}

#slider {
  /*центровка слайдера*/
  margin: 0 auto;
}

#slides article {
  /*все изображения справа друг от доруга*/
  width: 5%;
  float: left;
}

#slides .image {
  /*устанавливает общий размер блока с изображениями*/
  width: 2000%;
  line-height: 0;
}

#overflow {
  /*сркывает все, что находится за пределами этого блока*/
  width: 100%;
  overflow: hidden;
}

article img {
  /*размер изображений слайдера*/
  width: 100%;
}

#desktop:checked ~ #slider {
  /*размер всего слайдера*/
  width: 100%; /*максимальнная длинна*/
}

label,
a {
  /*при наведении на стрелки или переключатели - курсор изменится*/
  cursor: pointer;
}

.all input {
  /*скрывает стандартные инпуты (чекбоксы) на странице*/
  display: none;
}

/*позиция изображения при активации переключателя*/
#switch1:checked ~ #slides .image {
  margin-left: 0;
}

#switch2:checked ~ #slides .image {
  margin-left: -100%;
}

#switch3:checked ~ #slides .image {
  margin-left: -200%;
}

#switch4:checked ~ #slides .image {
  margin-left: -300%;
}

#switch5:checked ~ #slides .image {
  margin-left: -400%;
}

#switch6:checked ~ #slides .image {
  margin-left: -500%;
}

#switch7:checked ~ #slides .image {
  margin-left: -600%;
}

#switch8:checked ~ #slides .image {
  margin-left: -700%;
}

#switch9:checked ~ #slides .image {
  margin-left: -800%;
}

#switch10:checked ~ #slides .image {
  margin-left: -900%;
}

#switch11:checked ~ #slides .image {
  margin-left: -1000%;
}

#switch12:checked ~ #slides .image {
  margin-left: -1100%;
}

#switch13:checked ~ #slides .image {
  margin-left: -1200%;
}

#switch14:checked ~ #slides .image {
  margin-left: -1300%;
}

#switch15:checked ~ #slides .image {
  margin-left: -1400%;
}

#switch16:checked ~ #slides .image {
  margin-left: -1500%;
}

#switch17:checked ~ #slides .image {
  margin-left: -1600%;
}

#switch18:checked ~ #slides .image {
  margin-left: -1700%;
}

#switch19:checked ~ #slides .image {
  margin-left: -1800%;
}

#switch20:checked ~ #slides .image {
  margin-left: -1900%;
}

#controls {
  /*положение блока всех управляющих элементов*/
  margin: -25% 0 0 0;
  width: 100%;
  height: 50px;
}

#active label {
  /*стиль отдельного переключателя*/
  border-radius: 20px; /*скругление углов*/
  display: inline-block; /*расположение в строку*/
  width: 36px;
  height: 36px;
  margin-right: 10px;
  background: #bbb;
}

#active {
  /*расположение блока с переключателями*/
  margin: 20px 0 10px 0;
  text-align: center;
}

#active label:hover {
  /*поведение чекбокса при наведении*/
  background: #76c8ff;
  border-color: #777 !important; /*выполнение в любом случае*/
}

/*цвет активного лейбла при активации чекбокса*/
#switch1:checked ~ #active label:nth-child(1),
#switch2:checked ~ #active label:nth-child(2),
#switch3:checked ~ #active label:nth-child(3),
#switch4:checked ~ #active label:nth-child(4),
#switch5:checked ~ #active label:nth-child(5),
#switch6:checked ~ #active label:nth-child(6),
#switch7:checked ~ #active label:nth-child(7),
#switch8:checked ~ #active label:nth-child(8),
#switch9:checked ~ #active label:nth-child(9),
#switch10:checked ~ #active label:nth-child(10),
#switch11:checked ~ #active label:nth-child(11),
#switch12:checked ~ #active label:nth-child(12),
#switch13:checked ~ #active label:nth-child(13),
#switch14:checked ~ #active label:nth-child(14),
#switch15:checked ~ #active label:nth-child(15),
#switch16:checked ~ #active label:nth-child(16),
#switch17:checked ~ #active label:nth-child(17),
#switch18:checked ~ #active label:nth-child(18),
#switch19:checked ~ #active label:nth-child(19),
#switch20:checked ~ #active label:nth-child(20) {
  background: #18a3dd;
  border-color: #18a3dd !important;
}

#slides .image {
  /*анимация пролистывания изображений*/
  transition: all 800ms cubic-bezier(0.77, 0, 0.175, 1);
}

#controls label:hover {
  /*прозрачность стрелок при наведении*/
  opacity: 0.6;
}

#controls label {
  /*прозрачность стрелок при отводе курсора*/
  transition: opacity 0.2s ease-out;
}

.foto-field {
  position: relative;
  display: flex;
  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.doctor-img {
  position: relative;
  z-index: 1;
  img {
    border-radius: 5px;
    height: auto;
    width: 500px;
  }
}

@media screen and (max-width: 540px) {
  .doctor-img {
    position: relative;
    z-index: 1;
    img {
      border-radius: 5px;
      height: auto;
      width: 380px;
    }
  }
  #active label {
    /*стиль отдельного переключателя*/
    border-radius: 15px; /*скругление углов*/
    display: inline-block; /*расположение в строку*/
    width: 30px;
    height: 30px;
    margin-right: 10px;
    background: #bbb;
  }
}

@media screen and (max-width: 420px) {
  .doctor-img {
    position: relative;
    z-index: 1;
    img {
      border-radius: 5px;
      height: auto;
      width: 280px;
    }
  }
}
</style>
