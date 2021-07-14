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
    import {PropType, defineComponent, onMounted} from 'vue'
    import INews from "@/interfaces/news/INews";

    export default defineComponent({
        name: 'NewsCalendar',
        props: {
            news: {
                type: Array as PropType<Array<INews>> ,
                required: true,
            } ,
        },
        setup(props) {
            const getNews = (day: string) : string[] => {
                const news = props.news.filter((itemNews : INews) => {
                    const dayMatch = new Date(itemNews.published_on).getDate() === new Date(day).getDate()
                    const monthMatch = new Date(itemNews.published_on).getMonth() === new Date(day).getMonth()
                    const yearMatch = new Date(itemNews.published_on).getFullYear() === new Date(day).getFullYear()

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

            const translateMounth = () => {
                let title = document.getElementsByClassName('el-calendar__title')[0]
                const months: Record<string, string> = {
                    'December': 'Декабря',
                    'November': 'Ноября',
                    'October': 'Октября',
                    'September': 'Сентября',
                    'August': 'Августа',
                    'July': 'Июля',
                    'June': 'Июня',
                    'May': 'Мая',
                    'April': 'Апреля',
                    'March': 'Марта',
                    'February': 'Февраля',
                    'January': 'Января',
                }
                const month = title.innerHTML.split(' ')[2]
                if (months[month]) title.innerHTML = title.innerHTML.split(' ')[0] + ' ' + months[month]
            }

            onMounted(() => {
                translateMounth()
                for (let i = 1; i <= 3; i++) {
                    const btn = document.querySelector(`#calendar > div.el-calendar__header > div.el-calendar__button-group > div > button:nth-child(${i})`)
                    if (btn) btn.addEventListener("click" , () => translateMounth())
                }
            })


            return {
                getNews
            }
        }
    })
</script>

<style scoped lang="scss">
    .calendar-wrap {
        :deep(.el-calendar-day) {}
    }


</style>
