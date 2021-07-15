<template>
            <el-card class="card" :body-style="{ padding: '0px' }" >
                <transition name="fade">
                    <div @mouseleave="showMore = false" v-show="showMore" class="transition-box"
                         :style="[showMore? {'visibility': 'visible'}: '']">
                        <div class="preview_text">
                            <div class="content">{{news.preview_text}}</div>
                            <div class="read-more">
                                <el-button @click="$router.push(`/news/${news.slug}`)" type="primary" outlined>Читать дальше</el-button>
                            </div>

                        </div>
                    </div>
                </transition>
                <div class="image" >
                    <div>
                        <img @error="errorImg" v-if="news.preview_thumbnail_file.filename_disk" :src="getImageUrl(news.preview_thumbnail_file.filename_disk)" alt="alt" />
                        <img v-else src="../../assets/img/310x310.png"/>
                    </div>
                </div>
                <div class="card-content">
                    <el-row class="card-meta" >
                        <el-col :xl="16" :lg="14" >
                            {{$dateFormatRu(news.published_on, true)}}
                        </el-col>
                        <el-col :xl="{'span': 4, 'offset':4}" :lg="{'span': 4, 'offset':4}" :md="{'span': 4, 'offset':2}" >
                            <span class="like" @click="createLike(news.id)">&#9825; {{ news.__meta__.likes_count}} </span>
                        </el-col>

                    </el-row>
                    <div class="title">{{news.title}} <br/><br/><span class="show-more" @mouseover="showMore = true">Читать дальше...</span></div>


                </div>
                <div class="tags">
                    <el-tag @click="filterNews(tag.id)" class="tag-link" v-for="tag in news.tags" :key="tag.id" size="small">{{tag.label}}</el-tag>
                </div>
            </el-card>

</template>

<script lang="ts">
    import { useStore } from 'vuex';
    import {PropType, ref, defineComponent} from 'vue'
    import INews from "@/interfaces/news/INews";

    export default defineComponent( {
        name: 'NewsCard',
        props: {
            news: {
                type: Object as PropType<INews>,
                required: true
            },
        },
        async setup() {
            const showMore = ref(false)
            const store = useStore();

            const getImageUrl = (imagePath: string): string => {
                return `${process.env.VUE_APP_STATIC_URL}/${imagePath}`
            }

            const createLike = async (newsId: string): Promise<void> => {
                await store.dispatch('likes/create', newsId);
            }

            const errorImg = (e: any) => {
                e.target.src = require( '../../assets/img/310x310.png')
            }

            const filterNews = async (tagId: string): Promise<void> => {
                await store.commit('news/filterByTag', tagId);
            }

            return {
                errorImg,
                showMore,
                filterNews,
                createLike,
                getImageUrl
            };
        },
    })
</script>

<style scoped lang="scss">
    $card-border-radius: 15px;
    $card-content-padding: 24px;
    $card-content-outpadding: 0 - 24px;

    .card {
        border-radius: $card-border-radius;
        height: 700px;
        margin-bottom: 50px;
        transition: all .2s;
        position:relative;
        &:hover {
            box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
        };

        .transition-box{
            border-radius: $card-border-radius;
            position: absolute;
            width: 100%;
            height: calc(100% + 2px);
            z-index: 2;
            background: rgba(255, 255, 255, 0.88);
            color: #000000;
            text-align: justify;
            transition: all 0.5s;
            -webkit-backdrop-filter: blur(4px);
            backdrop-filter: blur(4px);

            .content{
                text-align: left;
                padding: 48px 12px 12px;
            }

            .read-more {
                text-align: center;
            }


        }



        .card-content{
            padding: 1.5rem;
            height:100%;

            .title {
                font-size: 1.1rem;
                font-weight: bold;
                height: 50%;
                margin-bottom: 20px;
            }
        }

        .card-meta{
            font-size: 1.1rem;
            padding-bottom: 12px;
        }
    }

    .like {
        transition: all .2s;
        margin-right: 3px;
        cursor: pointer;

        &:hover {
            font-weight: bold;
        }
    }

    .image {
        width: 100%;
        padding-top: 100%;
        position: relative;
        div {
            position: absolute;
            top: 0;
            height: 100%;
            left: -50%;
            width: 200%;
            display: flex;
            justify-content: center;
            img {
                height: 100%;
                width: auto;
            }
        }
    }

    .tags {
        position: absolute;
        bottom: 15px;
        left: 15px;
        .tag-link {
            margin-right: 10px;
            transition: all 0.2s;
            &:hover {
                background-color: darken(blue, 5%);
                color: white;
                cursor: pointer;
            }
        }
    }

    .el-card {
        border: none;
        :deep(.el-card__body) {
            height: 300px;
            align-items: center;
        }
    }

    .show-more{
        cursor: pointer;
        color: #0075B2;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: all 0.2s;

    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
        transform: translateY(350px);
    }
</style>
