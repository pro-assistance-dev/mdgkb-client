<template>
    <el-row :gutter="40">
        <el-col :span="6">
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
        </el-col>
        <el-col :span="18" >
            <el-row :gutter="20" s
            >
                <el-col :span="6" v-for="item in news" :key="item.id" >
                    <el-card class="card" :body-style="{ padding: '0px' }" >
                        <div class="image" v-if="item.preview_thumbnail_file.filename_disk">
                            <div>
                                <img :src="`http://localhost:8083/originals/${item.preview_thumbnail_file.filename_disk}`"
                                     alt="alt">
                            </div>
                        </div>
                        <div class="card-content">
                                <el-row class="card-meta" :gutter="20">
                                        <el-col :xl="8" :lg="12" :md="24">
                                        {{$dateFormatRu(item.published_on)}}
                                        </el-col>
    <el-col :xl="8" :lg="12" :md="24">
        <i class="el-icon-medal like" @click="createLike(item.id)"> {{item.__meta__.likes_count}}</i>
    </el-col>
                                </el-row>
                                <div class="title">{{item.title}}</div>

                                <div class="tags">
                                <el-tag v-for="tag in item.tags" :key="tag.id" size="small" :color="tag.color" >{{tag.label}}</el-tag>
                                </div>

                                <!--                        <time class="time">{{ currentDate }}</time>-->
                        </div>
                    </el-card>

                </el-col>

            </el-row>
        </el-col>
    </el-row>
</template>

<script lang="ts">
    import { useStore } from 'vuex';

    export default {
        name: 'NewsList',
     async setup() {
            const store = useStore();
            await store.dispatch('news/getAll');
            const news = store.getters['news/news'];

         const getImageUrl = (imagePath: string): string => {
             return `${process.env.STATIC_PATH}${imagePath}`
         }

         const createLike = async (newsId: string): Promise<void> => {
             await store.dispatch('likes/create', newsId);
         }

            return {
                createLike,
                news,
                getImageUrl
            };
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
    .budge{
        width: 10px;
        height: 10px;
        border-radius: 5px;
        margin: 5px auto;
    }
    .red{
        background-color: #c9413f;
    }
    .green{
        background-color: #25b591;
    }
    .orange{
        background-color: #ee915c;
    }
</style>
