<template>
            <div class="left-wrap">
                <div class="calendar-wrap">
                    <el-calendar id="calendar" :first-day-of-week=7   >
                        <template
                                #dateCell="{data}"
                        >
                            <el-popover
                                    transition="el-collapse-transition"
                                    placement="right"
                                    width="200"
                                    trigger="hover"
                                    :content="getNews(data.day)"
                                    :disabled="getNews(data.day).length === 0"
                            >
                                <template #reference>
                                    <div class="el-calendar-day" :class="getNews(data.day).length ? 'is-selected' : ''">
                                        {{data.day.split('-').slice(2).join('-')}}
                                    </div>
                                </template>
                            <div v-for="item in getNews(data.day)" :key="item.id">
                                {{item}}
                            </div>
                            </el-popover>
                        </template>
                    </el-calendar>
                </div>
            </div>
</template>

<script lang="ts">
    import {PropType, defineComponent} from 'vue'
    import INews from "@/interfaces/news/INews";

    export default defineComponent({
        name: 'NewsCalendar',
        props: {
            news: {
                type: Array as PropType<INews[]> ,
                required: true,
            } ,
        },
        setup(props) {
            const getNews = (day: string) : string[] => {
                const news = props.news.filter((itemNews : INews) => {
                    const dayMatch = new Date(itemNews.published_on).getDate() === new Date(day).getDate()
                    const monthMatch = new Date(itemNews.published_on).getMonth() === new Date(day).getMonth()
                    const yearMatch = new Date(itemNews.published_on).getFullYear() === new Date(day).getFullYear()
                    // console.log(dayMatch , new Date(itemNews.published_on).getDate(), monthMatch, new Date(itemNews.published_on).getMonth(), new Date(day).getMonth() ,yearMatch)
                    if (yearMatch && monthMatch && dayMatch) {
                        return itemNews.title
                    }
                })

                let newsTitles: string[] = []
                news.forEach((itemNews: INews) => {
                    newsTitles.push(itemNews.title)
                })
                return newsTitles
            }
            return {
                getNews
            }
        }
    })
</script>

<style scoped lang="scss">


</style>
