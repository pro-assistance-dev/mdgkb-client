<template>
  <el-card>
    <el-container direction="vertical" align="center" style="padding: 50px">
      <div id="stopcoma" ref="line" @mouseenter="$refs.line.circulateColors" @mouseleave="$refs.line.stopCirculate">
        <el-space id="stopcoma" direction="vertical" alignment="start" :size="0">
          <h1><span class="danger">СТОП</span><span class="warning">КОМА</span></h1>
          <span>Просветительный проект</span>
        </el-space>
      </div>
      <CubeLine ref="line" />
      <div id="diabetes">
        <h1><span>Диабет 1 группы</span></h1>
        <h3 class="danger"><span>он может быть и у детей</span></h3>
      </div>
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <h2 class="warning">Симптомы</h2>
          <ul class="warning-bullet">
            <li>Жалуется на сухость во рту</li>
            <li>Пьет и мочится больше и чаще обычного</li>
            <li>Часто встает по ночам в туалет</li>
            <li>Мочится в постель</li>
            <li>Худеет при хорошем аппетите</li>
            <li>Приступы тошноты</li>
            <li>Быстро утомляется, слабеет, сонливый</li>
            <li>Стал раздражительным</li>
            <li>Не может сосредоточиться на простых задачах</li>
            <li>Потерял ко всему интерес</li>
            <li>Жалуется на нечёткость зрения</li>
            <li>Появился запах ацетона изо рта</li>
            <li>Учащается дыхание в состоянии покоя</li>
          </ul>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <h2 class="warning">Дополнительные признаки</h2>
          <ul class="warning-bullet">
            <li>Плохо заживают небольшие ранки, порезы, царапины</li>
            <li>Участились респираторные заболевания</li>
            <li>Ребенок жалуется на раздражение в области половых органов, в особенности после мочеиспускания</li>
            <li>У девочек часто бывает молочница, у мальчиков баланит</li>
          </ul>
          <h2 id="whattodo" class="warning">Что делать?</h2>
        </el-col>
      </el-row>

      <h2>При обнаружении данных симптомов или признаков</h2>
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <h2 class="primary">Родитель!</h2>
          <ul class="primary-bullet">
            <li>Обратитесь к врачу сегодня же, если симптомы схожи! Промедление опасно для жизни ребенка!</li>
          </ul>
          <el-space id="alarm" alignment="center" :size="30">
            <div class="circle">
              <i class="el-icon-phone-outline"></i>
            </div>
            <el-space :size="0" direction="vertical" alignment="start" style="text-align: start">
              <span>Если состояние ребенка ухудшается:</span>
              <h3 class="uppercase">Срочно позвоните дежурному эндокринологу Морозовской ДГКБ!</h3>
            </el-space>
          </el-space>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <h2 class="primary">Учитель!</h2>
          <ul class="primary-bullet">
            <li>
              Известите родителей и спросить у них разрешение проверить уровень сахара (глюкозы) в крови из пальца Вызовите медсестру,
              попросите проверить с помощью глюкометра уровень глюкозы в крови
            </li>
            <li>Передайте ребенка на руки родителям и выдайте им памятку с телефонами дежурного эндокринолога</li>
            <li>Ни в коем случае не отпускайте ребенка домой без сопровождающего!</li>
          </ul>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <h2 class="primary">До приезда скорой</h2>
          <ul class="primary-bullet">
            <li>Поддерживайте ребенка в сознании, разговаривайте с ним</li>
            <li>В случае рвоты очищайте полость рта, чтобы ребенок не захлебнулся</li>
            <li>Воду давайте небольшими глотками</li>
            <li>Дождитесь приезда скорой помощи!</li>
          </ul>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <h2 class="primary">Если ребенок упал в обморок</h2>
          <ul class="primary-bullet">
            <li>Положите ребенка на бок</li>
            <li>В случае рвоты следите, чтобы ребенок не задохнулся</li>
            <li>Следить за дыханием и пульсом</li>
            <li>Дождитесь приезда скорой помощи!</li>
          </ul>
        </el-col>
      </el-row>

      <el-row id="bottommsg" justify="center">
        <el-space direction="vertical">
          <el-space direction="vertical" :size="0">
            <div>Даже если сомневаетесь и симптомы похожи лишь частично</div>
            <h3 class="danger uppercase">Лучше проконсультируйтесь со специалистами!</h3>
            <div>Состояние ребенка может ухудшиться в любой момент и привести к коме!</div>
            <div class="danger">Тогда специалисты могут не успеть оказать помощь!</div>
          </el-space>
          <el-space>
            <div class="circle">
              <i class="el-icon-phone-outline"></i>
            </div>
            <el-space :size="0" direction="vertical" alignment="start">
              <span>Дежурный эндокринолог:</span>
              <span>+7 (916) 640-22-02</span>
              <span>+7 (916) 941-98-96</span>
            </el-space>
          </el-space>
        </el-space>
      </el-row>

      <h2 class="primary">Вопросы и ответы</h2>
      <el-table
        :data="questionsAnswers"
        :expand-row-keys="expandRowKeys"
        :row-key="(row) => row.title"
        cell-class-name="cell-row"
        class="table-shadow"
        :show-header="false"
        @expand-change="handleExpandChange"
        @row-click="handleExpandChange"
      >
        <el-table-column>
          <template #default="scope">
            <span class="uppercase">{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column header-align="center" type="expand">
          <template #default="scope">
            <ul v-for="(answer, index) in scope.row.answers" :key="index" class="primary-bullet">
              <li>{{ answer }}</li>
            </ul>
          </template>
        </el-table-column>
      </el-table>
    </el-container>
  </el-card>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import CubeLine from '@/components/StopComa/CubeLine.vue';

export default defineComponent({
  name: 'StopComaPage',
  components: {
    CubeLine,
  },

  setup() {
    interface IQuestionAnswers {
      title: string;
      answers: string[];
    }
    const line = ref<HTMLDivElement>();
    const questionsAnswers = ref([
      {
        title: 'Что мы хотим?',
        answers: [
          'Снизить риск острых осложнений и смертность у детей при манифестации сахарного диабета 1 типа',
          'Предупредить развитие кетоацидотической комы',
        ],
      },
      {
        title: 'Чего мы реально можем достичь?',
        answers: [
          'Снизить частоту случаев манифестации диабета в состоянии кетоацидоза и комы до 20%',
          'Сильно упростить лечение',
          'Снизить потребность в инсулине',
          'Предупредить нарушения психического развития',
          'Спасти жизни многих детей',
        ],
      },
      {
        title: 'Причины сахарного диабета 1 типа',
        answers: [
          'Разрушение β-клеток поджелудочной железы, производящих гормон инсулин.',
          'Из -за нехватки инсулина организм не усваивает глюкозу.',
          'В результате развиваются тяжелые метаболические нарушения: кровь сильно закисляется, в ней накапливаются кетоновые тела. Это состояние называют кетоацидозом.',
        ],
      },
      {
        title: 'Почему это важно?',
        answers: [
          'Если ребенок не получает инсулинотерапию, кетоацидоз стремительно нарастает',
          'При этом нарушается работа легких, сердца, почек и других органов, больше всего страдает головной мозг',
          'Поражение головного мозга ведёт к коме',
        ],
      },
      {
        title: 'Кома:',
        answers: [
          'Неминуемо возникает у детей с нераспознанным и нелеченым сахарным диабетом 1 типа',
          'Для реанимации требуются дни и даже недели',
          'Сопровождается отёком и длительной дисфункцией мозга',
          'Может привести к глубоким и необратимым поражениям мозга',
          'В 5 - 15% случаев заканчивается смертью',
        ],
      },
    ]);

    const expandRowKeys = ref(['']);

    const handleExpandChange = (row: IQuestionAnswers) => {
      const title = row.title;
      const lastTitle = expandRowKeys.value[0];
      expandRowKeys.value = title === lastTitle ? [] : [title];
    };
    return {
      questionsAnswers,
      expandRowKeys,
      line,
      handleExpandChange,
    };
  },
});
</script>

<style lang="scss" scoped>
$primary: #2754eb;
$danger: #e62c21;
$warning: #f3911c;
$table-border: #f1f1f1;

.primary {
  color: $primary;
}

.danger {
  color: $danger;
}

.warning {
  color: $warning;
}

.warning-bullet {
  li:before {
    color: $warning;
  }
}

.primary-bullet {
  li:before {
    color: $primary;
  }
}

.uppercase {
  text-transform: uppercase;
}

h1 {
  font-size: 48px;
}

h2 {
  font-size: 32px;
  text-transform: uppercase;
}

h3 {
  font-size: 20px;
}

#stopcoma div > span {
  margin-top: -15px;
  margin-left: 1px;
  display: block;
  text-transform: uppercase;
  font-size: 0.8rem;
  font-weight: 600;
}

#stopcoma h1 {
  margin: 0;
}

#stopcoma {
  margin-bottom: 20px;
}

#diabetes h1 {
  font-weight: 600;
  font-size: 48px;
  position: relative;
  z-index: 1;
  margin-bottom: 0;
}

#diabetes h3 {
  font-weight: 600;
  margin: 0;
  padding: 0;
}

#diabetes h1 span {
  background: #fff;
  z-index: 2;
  padding-left: 12px;
  padding-right: 12px;
  position: relative;
}

#diabetes h1:after {
  content: '';
  background-color: black;
  height: 1px;
  display: block;
  position: absolute;
  top: 40px;
  left: 0;
  width: 100%;
}

li {
  list-style-type: none;
  display: flex;
  align-items: center;
  text-align: start;
  margin-bottom: 5px;
}

ul {
  padding-left: 0;
}

ul li:before {
  content: '•';
  display: inline-block;
  vertical-align: middle;
  line-height: 100%;
  margin-right: 10px;
  font-size: 30px;
}

#alarm {
  border-radius: 0;
  margin-left: -70px;
  background-color: $danger;
  padding: 20px;
  color: white;
}

#alarm h3 {
  margin: 0;
  font-size: 16px;
}

.circle {
  width: 70px;
  height: 70px;
  border: solid 3px white;
  border-radius: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.circle i {
  font-size: 3rem;
}

#bottommsg {
  font-weight: 700;
  border-color: #000;
  border-width: 1px;
  border-style: dashed;
  padding: 24px;
}

#bottommsg .circle {
  border: solid 3px $danger;
  color: $danger;
}

#bottommsg h3 {
  margin: 0;
}

:deep(.cell-row) {
  cursor: pointer;
}

.table-shadow {
  box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 10%), 0 0 0 1px rgb(10 10 10 / 2%); /* Параметры тени */
  border: 1px solid $table-border;
}
</style>
