<template>
    <el-row :gutter="40">
        <el-col :xl="6" :lg="24" class="calendar">
           <NewsCalendar v-model:news="news" />
        </el-col>
        <el-col :xl="18" :lg="24">
            <el-row :gutter="20">
                <el-col :xl="6" :lg="8" v-for="item in news" :key="item.id" >
                        <NewsCard :news="item"/>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>

<script lang="ts">
    import { useStore  } from 'vuex';
    import NewsCard from "@/components/News/NewsCard.vue";
    import NewsCalendar from "@/components/News/NewsCalendar.vue";
    import { computed} from "vue";

    export default {
        name: 'NewsList',
        components: {NewsCalendar, NewsCard},
        async setup() {
            const store = useStore();
            await store.dispatch('news/getAll');
            const news = computed(()=>store.getters['news/news'])
            return {
                news,
            };
        },
    };
</script>

<style scoped>
.calendar {
    margin-bottom: 40px;
}
</style>
