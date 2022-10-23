<template>
    <div class="legend">

        <div class="legend-item">
            <svg class="icon-barrier">
                <use xlink:href="#barrier"></use>
            </svg>
            <span class="legend-text">КПП</span>
        </div>

        <div class="legend-item">
            <svg class="icon-pedestrian">
                <use xlink:href="#pedestrian"></use>
            </svg>
            <span class="legend-text">Проходная</span>
        </div>

        <div class="legend-item">
            <svg class="icon-pi">
                <use xlink:href="#pi"></use>
            </svg>
            <span class="legend-text">Пункт выдачи ТСР (1 этаж)</span>
        </div>

        <div class="legend-item">
            <svg class="icon-parking">
                <use xlink:href="#parking"></use>
            </svg>
            <span class="legend-text">Парковка</span>
            <svg class="icon-ai">
                <use xlink:href="#ai"></use>
            </svg>
            <svg class="icon-ci">
                <use xlink:href="#ci"></use>
            </svg>
        </div>

        <div class="legend-item">
            <svg class="icon-ambulance">
                <use xlink:href="#ambulance"></use>
            </svg>
            <span class="legend-text">Служебная парковка</span>
            <svg class="icon-bi">
                <use xlink:href="#bi"></use>
            </svg>

            <svg class="icon-di">
                <use xlink:href="#di"></use>
            </svg>
        </div>

        <div class="legend-item">
            <svg class="icon-entrance">
                <use xlink:href="#entrance"></use>
            </svg>
            <span class="legend-text">Вход в здание</span>
        </div>

        <div class="legend-item">
            <svg class="icon-atm">
                <use xlink:href="#atm"></use>
            </svg>
            <span class="legend-text">Банкомат</span>
        </div>

        <div class="legend-item">
            <svg class="icon-swing">
                <use xlink:href="#swing"></use>
            </svg>
            <span class="legend-text">Детская площадка</span>
        </div>

        <div class="legend-item">
            <svg class="icon-art">
                <use xlink:href="#art"></use>
            </svg>
            <span class="legend-text">Арт-объект</span>
        </div>
        
        <div class="legend-item">
            <svg class="icon-chapel">
                <use xlink:href="#chapel"></use>
            </svg>
            <span class="legend-text">Храм Покрова Пресвятой&nbsp;Богородицы</span>
        </div>
    </div>
    <LegendIcons />  
</template>

<script lang="ts">
import LegendIcons from '@/assets/svg/Map/LegendIcons.svg';

export default {
  name: 'MapLegends',
  components: {
    LegendIcons,
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/styles/elements/base-style.scss';
* {
  padding: 0px;
  margin: 0px;
}
.hidden {
    display: none;
}

.legend {
    position: absolute;
    left: 0;
    bottom: 20px;
}

.legend-item {
    display: flex;
    justify-content: left;
    align-items: center;
    margin: 5px;
}

.legend-text {
    max-width: 170px;
    font-size: 12px;
    color: $site_dark_gray;
    margin-left: 10px;
}

.icon-ai {
    width: 26px;
    height: 26px;
    fill: #026CB5;
    margin: 0 5px;
}
.icon-bi {
    width: 26px;
    height: 26px;
    fill: #026CB5;
    margin: 0 5px;
}
.icon-ci {
    width: 26px;
    height: 26px;
    fill: #026CB5;
    margin: 0 5px;    
}
.icon-di {
    width: 26px;
    height: 26px;
    fill: #026CB5;
    margin: 0 5px;    
}

.icon-ambulance {
    width: 26px;
    height: 26px;
    fill: #601C1C;   
}

.icon-art {
    width: 26px;
    height: 26px;
    fill: #601C1C;   
}

.icon-atm {
    width: 26px;
    height: 26px;
    fill: #601C1C;   
}
.icon-barrier {
    width: 26px;
    height: 26px;
    fill: #601C1C;   
}
.icon-chapel {
    width: 26px;
    height: 26px;
    fill: #601C1C;   
}
.icon-parking {
    width: 26px;
    height: 26px;
    fill: #601C1C;   
}
.icon-pedestrian {
    width: 26px;
    height: 26px;
    fill: #601C1C;   
}
.icon-pi {
    width: 26px;
    height: 26px;
    fill: #601C1C;   
}
.icon-swing {
    width: 26px;
    height: 26px;
    fill: #601C1C;   
}

.icon-entrance {
    width: 26px;
    height: 26px;
    fill: #000000;   
}

</style>