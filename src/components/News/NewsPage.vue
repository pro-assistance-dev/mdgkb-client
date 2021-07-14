<template>
            <el-card class="card-content">
                <template #header>
                    <div class="card-header">
                            <h1 class="title article-title">{{news.title}}</h1>
                            <div class="tags has-addons level-news">
                                <el-tag effect="plain">{{news.category.name }}</el-tag>
                                <el-tag type="success" effect="dark">{{$dateFormatRu(news.published_on)}}</el-tag>
                            </div>
                    </div>
                </template>


                <div class="content article-body" v-html="news.content">

                </div>

                <div class="content article-body has-margin-top-24">
                    <el-button @click="$router.push('/')">Вернуться назад</el-button>
                </div>
            </el-card>
</template>

<script lang="ts">
    import { useStore  } from 'vuex';
    import { useRoute} from "vue-router";
    import {computed, defineComponent} from "vue";

    export default defineComponent({
        name: 'NewsList',
        async setup() {
            const store = useStore();
            const route = useRoute()
            console.log(route.params['slug'])
            await store.dispatch('news/get', route.params['slug']);
            const news = computed(()=>store.getters['news/newsItem'])

            return {
                news,
            };
        },
    })
</script>

<style scoped lang="scss">
    .card-content{
        width: 60%;
        margin-left: auto;
        margin-right: auto;
    }

    .card-header {
        text-align: center;
    }
</style>
