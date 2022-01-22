<template>
  <div class="services">
    <div class="title-in">Оказываемые услуги</div>
    <div class="point">
      <ul class="services-list">
        <li class="services-list-item"><h4 class="point-text">Услуга 1</h4></li>
        <li class="services-list-item"><h4 class="point-text">Услуга 2</h4></li>
        <li class="services-list-item"><h4 class="point-text">Услуга 3</h4></li>
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
}

.services {
  display: block;
  background: #ffffff;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  background-clip: padding-box;
  margin-top: 30px;
  padding: 0px 40px 0px 23px;
}

.services-list {
  padding-left: 0;
  margin: 0;
  list-style: none;
}

.services-list-item {
  margin-bottom: 0.5rem;
  padding-left: 25px;
  position: relative;
  margin-left: 10px;
}

.services-list-item:before {
  content: '';
  position: absolute;
  top: 4px;
  left: 0;
  width: 7px;
  height: 7px;
  background-color: #2655eb;
  border-radius: 50%;
}
</style>
