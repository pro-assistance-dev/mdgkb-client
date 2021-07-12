<template>
            <div class="left-wrap">
                <div class="calendar-wrap">
                    <el-calendar id="calendar" :first-day-of-week=7   >
                        <template
                                #dateCell="{data}"
                        >
                            <div class="el-calendar-day">
                                {{data.day.split('-').slice(2).join('-')}}
                            </div>
                            <div v-for="item in news" :key="item.id">
                                <div v-if="new Date(item.published_on).getMonth() === new Date(data.day).getMonth()">
                                    <div v-if="new Date(item.published_on).getDate() === new Date(data.day).getDate()">
                                        <el-tooltip class="item" effect="dark" :content="item.title" placement="right">
                                            <div class="is-selected">{{item.title}}</div>
                                        </el-tooltip>
                                    </div>
                                    <div v-else></div>
                                </div>
                            </div>
                        </template>
                    </el-calendar>
                </div>
            </div>
</template>

<script lang="ts">
    import {PropType} from 'vue'
    import IMenuItem from "../../interfaces/IMenuItem";

    export default {
        name: 'NewsCalendar',
        props: {
            news: {
                type: Object as PropType<IMenuItem>,
                required: true
            },
        },
    };
</script>

<style scoped>
    .calendar-day{
        text-align: center;
        color: #202535;
        line-height: 30px;
        font-size: 12px;
    }
    .is-selected{
        color: #F8A535;
        font-size: 10px;
        margin-top: 5px;
    }
    #calendar .el-button-group>.el-button:not(:first-child):not(:last-child):after{
        content: 'Current month';
    }

    .like {
        margin-right: 3px;
        transition: all .1s;
        cursor: pointer;
    }

    .like:hover {
        margin-top: -5px;
        font-weight: bold;
    }

    .image {
        padding-top: 100%;
        position: relative;
    }

    .image > div {
        position: absolute;
        top: 0;
        height: 100%;
        left: -50%;
        width: 200%;
        display: flex;
        justify-content: center;
    }

    .image > div > img {
        height: 100%;
        width: auto;
    }


    .el-calendar-day{
        height: 40px;
        text-align: center;
        color: #202535;
    }
    .is-selected{
        color: #F8A535;
        font-size: 10px;
        margin-top: 5px;
    }
    #calendar .el-button-group>.el-button:not(:first-child):not(:last-child):after{
        содержание: «Текущий месяц»;
    }


    .left-wrap /deep/ .el-calendar-table .el-calendar-day{
        /*padding: 22px;*/
    }
    .left-wrap /deep/ .el-backtop, .el-calendar-table td.is-today p{
        height: 30px;
        width: 30px;
        color: white;
        border-radius: 15px;
        line-height: 30px;
        margin: 0 auto;
        margin-top: -6px;
        background-image: linear-gradient(to right, #2160dc, #4880f0);
    }

</style>
