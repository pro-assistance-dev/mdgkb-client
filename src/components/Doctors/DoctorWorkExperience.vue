<template>
  <div class="work-experience">
    <div class="title-in">Опыт работы</div>
    <div class="point">
      <ul class="point-list">
        <li class="point-list-item">
          <div class="point-info">
            <h3 class="point-year">1984-2013</h3>
            <h4 class="point-text">Окончила Ростовский институт Дружбы Народов по специальности “Педиатрия”.</h4>
          </div>
        </li>
        <li class="point-list-item">
          <div class="point-info">
            <h3 class="point-year">1984</h3>
            <h4 class="point-text">
              Окончила интернатуру по специальности “Инфекционист” на базе Липецкой городской инфекционной больницы.
            </h4>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts"></script>

<style scoped lang="scss">
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

.work-experience {
  display: block;
  background: #ffffff;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  background-clip: padding-box;
  margin-top: 30px;
  padding: 0px 40px 0px 23px;
}

.title-in {
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 22px;
  letter-spacing: 0.1em;
  color: #343e5c;
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
  margin: 10px 0px 0px 5px;
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
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  letter-spacing: 0.1em;
  font-size: 11px;
  color: #5d6477;
  font-weight: lighter;
  line-height: 110%;
}

/* Decoration of lists */

.point-list {
  padding-left: 0;
  margin: 0;
  list-style: none;
}

.point-list-item {
  margin-bottom: 1rem;
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
  top: -8px;
  left: 6px;
  width: 2px;
  height: calc(100% + 3rem);
  background-color: #a1a7bd;
}

.point-list-item:last-of-type:after {
  height: calc(100% + 1.3rem);
}
</style>
