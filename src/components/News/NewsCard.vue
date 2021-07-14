<template>

            <el-card class="card" :body-style="{ padding: '0px' }" >
                <div class="image" v-if="news.preview_thumbnail_file.filename_disk">
                    <div>
                        <img :src="getImageUrl(news.preview_thumbnail_file.filename_disk)" alt="alt">
                    </div>
                </div>
                <div class="card-content">
                    <el-row class="card-meta" :gutter="20">
                        <el-col :xl="8" :lg="12" :md="24">
                            {{$dateFormatRu(news.published_on)}}
                        </el-col>
                        <el-col :xl="8" :lg="12" :md="24">

                            <span class="like" @click="createLike(news.id)"> {{ news.__meta__.likes_count}}</span>
                        </el-col>
                    </el-row>
                    <div class="title">{{news.title}}</div>
                    <el-button  @click="$router.push(`/news/${news.slug}`)" @mouseover="show3 = true" @mouseleave="show3 = false">Показать больше</el-button>

                    <div style="margin-top: 20px; height: 200px;">
<!--                        <el-collapse-transition>-->
<!--                            <div v-show="show3">-->
<!--                                <div class="transition-box">el-collapse-transition</div>-->
<!--                                <div class="transition-box">el-collapse-transition</div>-->
<!--                            </div>-->
<!--                        </el-collapse-transition>-->
                    </div>

                    <div class="tags">
                        <el-tag @click="filterNews(tag.id)" class="tag-link" v-for="tag in news.tags" :key="tag.id" size="small" :color="tag.color" >{{tag.label}}</el-tag>
                    </div>
                </div>
            </el-card>
</template>

<script lang="ts">
    import { useStore } from 'vuex';
    import {PropType, ref} from 'vue'
    import INews from "@/interfaces/news/INews";

    export default {
        name: 'NewsCard',
        props: {
            news: {
                type: Object as PropType<INews>,
                required: true
            },
        },
        async setup() {
            const show3 = ref(false)
            const store = useStore();

            const getImageUrl = (imagePath: string): string => {
                return `${process.env.VUE_APP_STATIC_URL}/${imagePath}`
            }

            const createLike = async (newsId: string): Promise<void> => {
                await store.dispatch('likes/create', newsId);
            }

            const filterNews = async (tagId: string): Promise<void> => {
                await store.commit('news/filterByTag', tagId);
            }



            return {
                show3,
                filterNews,
                createLike,
                getImageUrl
            };
        },
    };
</script>

<style scoped lang="scss">
    $card-border-radius: 15px;
    $card-content-padding: 24px;
    $card-content-outpadding: 0 - 24px;

    .card {
        border-radius: $card-border-radius;
        height: 500px;
        margin-bottom: 50px;
        transition: all .1s;
        position:relative;
        padding-bottom:50px;

        .card-content{
            padding: 1.5rem;

            .tags {
                position: absolute;
                bottom: 5%;
                margin-top: 20px;
            }

            .title {
                margin-bottom: 20px;
            }
        }

        .card-meta{
            font-size: 1rem;
            opacity: 0.75;
            padding-bottom: 12px;
        }
    }


    .card:hover{
        margin-top: -5px;
    }


    .like {
        margin-right: 3px;
        transition: all .1s;
        cursor: pointer;
    }

    .like:before {
        content: '\2661';
        padding-right: 5px;
    }

    .like:hover {
        margin-top: -5px;
        font-weight: bold;
    }

    .image {
        width: calc(100% + 1px);
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

    .tag-link:hover {
        background-color: darken(white, 10%);
        cursor: pointer;
    }
</style>
