<template>
  <div class="container">
    <div class="site-map-title"><h2>Карта сайта</h2></div>
    <div class="site-map">
      <ul class="site-map-list">
        <li class="site-map-list-item">
          <a class="site-map-item-link" href="/main">Главная</a>
          <ul>
            <li class="site-map-list-item"><a class="site-map-item-link" href="/news">Новости</a></li>
            <li class="site-map-list-item">Пациентам</li>
            <ul>
              <li class="site-map-list-item"><a class="site-map-item-link" href="/dispanserization">Диспансеризация населения</a></li>
              <li class="site-map-list-item"><a class="site-map-item-link" href="/stop-coma">Просветительский проект СтопКома</a></li>
              <li class="site-map-list-item">
                <a class="site-map-item-link" href="/side-organizations">Сведения об организациях в сфере охраны здоровья</a>
              </li>
              <li class="site-map-list-item"><a class="site-map-item-link" href="/hospitalization">Госпитализация</a></li>
              <li class="site-map-list-item"><a class="site-map-item-link" href="/ambulatory-services">Амбулаторные услуги</a></li>
              <li class="site-map-list-item"><a class="site-map-item-link" href="/donor-rules">Правила для доноров</a></li>
              <li class="site-map-list-item"><a class="site-map-item-link" href="/paid-services">Платные медицинские услуги</a></li>
              <li class="site-map-list-item"><a class="site-map-item-link" href="/paid-programs">Платные программы</a></li>
              <!-- <li class="site-map-list-item"><a class="site-map-item-link" href="/paid-programs">Питание</a></li> -->
            </ul>
            <li class="site-map-list-item">Образование</li>
            <ul>
              <li class="site-map-list-item"><a class="site-map-item-link" href="/educational-organization/ordinatura">Ординатура</a></li>
              <li class="site-map-list-item"><a class="site-map-item-link" href="/educational-organization/aspirantura">Аспирантура</a></li>
              <li class="site-map-list-item">
                <a class="site-map-item-link" href="/educational-organization/additional-education"
                  >Дополнительное профессиональное образование</a
                >
              </li>
              <li class="site-map-list-item">
                <a class="site-map-item-link" href="/educational-organization/teachers">Педагогический состав</a>
              </li>
              <li class="site-map-list-item">
                <a class="site-map-item-link" href="/educational-organization/academics">Члены ученого совета</a>
              </li>
              <li class="site-map-list-item">
                <a class="site-map-item-link" href="/educational-organization/info">Сведения об образовательной организации</a>
              </li>
            </ul>
            <li class="site-map-list-item"><a class="site-map-item-link" href="/divisions">Отделения и центры</a></li>
            <li class="site-map-list-item"><a class="site-map-item-link" href="/questions">Вопросы и ответы</a></li>
            <li class="site-map-list-item">О нас</li>
            <ul>
              <li class="site-map-list-item"><a class="site-map-item-link" href="/projects">Проекты</a></li>
              <li class="site-map-list-item">
                <a class="site-map-item-link" href="/medical-organization">Данные о медицинской организации</a>
              </li>
              <li class="site-map-list-item"><a class="site-map-item-link" href="/partners">Наши партнеры</a></li>
              <li class="site-map-list-item"><a class="site-map-item-link" href="/vacancies">Вакансии</a></li>
              <li class="site-map-list-item">
                <a class="site-map-item-link" href="/medical-organization-structure">Структура и органы управления</a>
              </li>
              <li class="site-map-list-item"><a class="site-map-item-link" href="/comments">Отзывы</a></li>
              <li class="site-map-list-item"><a class="site-map-item-link" href="/normative-documents">Нормативные документы</a></li>
            </ul>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'SiteMap',
};
</script>

<style scoped lang="scss">
.site-map {
  background: #ffffff;
  border: 1px solid #e4e7ed;
  border-radius: 5px;
}

.site-map-title {
  font-family: 'Comfortaa', 'Open-sans', sans-serif;
  display: flex;
  height: 60px;
  background: #e4e5e7;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #4a4a4a;
  font-weight: normal;
}

.site-map-title {
  font-family: 'Comfortaa', 'Open-sans', sans-serif;
  display: flex;
  height: 75px;
  background: #e4e5e7;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #4a4a4a;
  font-weight: normal;
}

.site-map {
  justify-content: left;
  background: #ffffff;
}

.site-map-list-item {
  margin: 5px;
  list-style-type: none;
}

.site-map-item-link {
  text-decoration: none;
  font-family: 'Comfortaa', 'Open-sans', sans-serif;
  font-size: 16px;
  color: #4a4a4a;
  /* line-height: 1.5; */
}

a:link {
  color: #4a4a4a;
}
a:hover {
  color: #379fff;
}
a:active {
  color: #379fff;
}
</style>
