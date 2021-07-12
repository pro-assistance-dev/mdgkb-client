<template>
    <el-row :gutter="40">
        <el-col :span="6">
           <NewsCalendar v-model:news="news" />
        </el-col>
        <el-col :span="18" >
            <NewsCard v-model:news="news"/>
        </el-col>
    </el-row>
</template>

<script lang="ts">
    import { useStore } from 'vuex';
    import NewsCard from "@/components/News/NewsCard.vue";
    import NewsCalendar from "@/components/News/NewsCalendar.vue";

    export default {
        name: 'NewsList',
        components: {NewsCalendar, NewsCard},
        async setup() {
            const store = useStore();
            await store.dispatch('news/getAll');
            const news = store.getters['news/news'];

            return {
                news,
            };
        },
    };
</script>

<style scoped>

</style>
