<template>
  <div v-if="mounted" class="medical-profile-page-container">
    <div class="side-container hidden-md-and-down">
      <div class="left-field">
        <!-- <h4 class="card-item-title">Преподаватели</h4>
          <el-divider /> -->
        <div v-if="postgraduateCourse.getMainTeacher()">
          <b>Руководитель:</b> <br />
          <router-link
            v-if="postgraduateCourse.getMainTeacher()"
            class="recent-news-item"
            :to="`/doctors/${postgraduateCourse.getMainTeacher().doctor.human.slug}`"
            style="padding-left: 0"
          >
            {{ postgraduateCourse.getMainTeacher()?.doctor.human.getFullName() }}
          </router-link>
        </div>
        <div v-if="postgraduateCourse.postgraduateCoursesTeachers.filter((i) => !i.main).length">
          <b>Преподаватели:</b> <br />
          <router-link
            v-for="postgraduateCoursesTeacher in postgraduateCourse.postgraduateCoursesTeachers.filter((i) => !i.main)"
            :key="postgraduateCoursesTeacher.id"
            class="recent-news-item"
            :to="`/doctors/${postgraduateCoursesTeacher.teacher.doctor.human.slug}`"
            style="padding-left: 0"
          >
            {{ postgraduateCoursesTeacher.teacher.doctor.human.getFullName() }}
          </router-link>
        </div>
        <div class="recent-news-footer">
          <button @click="$router.push('/teachers')">Все преподаватели</button>
        </div>
        <div class="recent-news-footer">
          <button @click="$router.push('/dpo')">Все программы</button>
        </div>
      </div>

      <div v-if="postgraduateCourse.postgraduateCoursesSpecializations.length" class="left-field">
        <div class="left-field-title">
          <b>Специальность:</b> <br />
          <div v-for="item in postgraduateCourse.postgraduateCoursesSpecializations" :key="item.id" class="font">
            {{ item.specialization.name }}
          </div>
        </div>
      </div>
    </div>
    <div class="right-field">
      <div class="card-item" style="margin-bottom: 20px">
        <div class="card-header">
          <h3 class="title article-title">Программа аспирантуры по специальности</h3>
          <h2 class="title article-title">"{{ postgraduateCourse.getMainSpecialization().name }}"</h2>
        </div>
        <!-- <el-divider /> -->
        <div class="info-tags-block">
          <el-tag v-if="postgraduateCourse.educationForm">Форма обучения: {{ postgraduateCourse.educationForm }}</el-tag>
          <el-divider v-if="postgraduateCourse.educationForm" direction="vertical" />
          <el-tag v-if="postgraduateCourse.years > 0">Нормативный срок обучения: {{ postgraduateCourse.years }} года </el-tag>
          <el-divider v-if="postgraduateCourse.years > 0" direction="vertical" />
          <el-tag>Язык обучения: русский</el-tag>
        </div>
        <!-- <el-divider /> -->
        <div class="info-tags-block">
          <a
            v-if="postgraduateCourse.programFile.fileSystemPath"
            :href="postgraduateCourse.programFile.getFileUrl()"
            :download="postgraduateCourse.programFile.originalName"
            target="_blank"
            style="margin-right: 10px"
          >
            Образовательная программа</a
          >
          <a
            v-if="postgraduateCourse.calendar.fileSystemPath"
            :href="postgraduateCourse.calendar.getFileUrl()"
            :download="postgraduateCourse.calendar.originalName"
            target="_blank"
            style="margin-right: 10px"
          >
            Календарный учебный график</a
          >
          <a
            v-if="postgraduateCourse.questionsFile.fileSystemPath"
            :href="postgraduateCourse.questionsFile.getFileUrl()"
            :download="postgraduateCourse.questionsFile.originalName"
            target="_blank"
            style="margin-right: 10px"
          >
            Вопросы для подготовки к кандидатскому экзамену</a
          >
        </div>
        <!-- <el-divider /> -->
        <div v-if="postgraduateCourse.postgraduateCoursePlans.length > 0" class="info-block">
          <div>Учебные планы</div>
          <div>:</div>
          <a
            v-for="plan in postgraduateCourse.postgraduateCoursePlans"
            :key="plan.id"
            :href="plan.plan.getFileUrl()"
            :download="plan.plan.originalName"
            target="_blank"
            style="margin-right: 10px"
          >
            {{ plan.year.getFullYear() }}</a
          >
        </div>
        <!-- <el-divider /> -->
        <div v-if="postgraduateCourse.documentType.documents.length > 0">
          <h4>Документы</h4>
          <ul>
            <li v-for="document in postgraduateCourse.documentType.documents" :key="document.id">
              <a
                :href="document.documentsScans[0].scan.getFileUrl()"
                :download="document.documentsScans[0]?.scan.originalName"
                target="_blank"
                style="margin-right: 10px"
              >
                {{ document.name }}</a
              >
            </li>
          </ul>
        </div>
        <!-- <el-divider /> -->
        <div class="bottom-footer">
          <SharesBlock :title="postgraduateCourse.name" :description="postgraduateCourse.description" :url="getUrl()" />
          <button class="response-btn" @click="openRespondForm">Подать заявление</button>
        </div>
      </div>
      <div v-if="showForm" id="responce-form" class="card-item" style="padding: 30px">
        <h2 class="title article-title">Форма для подачи заявления</h2>
        <!-- <el-divider /> -->
        <PostgraduateApplicationForm style="margin-top: 20px" @close="closeRespondForm" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import PostgraduateApplicationForm from '@/components/Educational/Postgraduate/PostgraduateApplicationForm.vue';
import SharesBlock from '@/components/SharesBlock.vue';
import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import IPostgraduateCourse from '@/interfaces/IPostgraduateCourse';
import ISchema from '@/interfaces/schema/ISchema';
import chooseRandomBrandColor from '@/mixins/brandColors';
import scroll from '@/services/Scroll';
export default defineComponent({
  name: 'PostgraduateCoursePage',
  components: { SharesBlock, PostgraduateApplicationForm },
  setup() {
    const fileInfos = ['Инструкция по записи на цикл НМО', 'Презентация по циклу НМО Педиатрия'];
    const ped: any = [];
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const filterQuery: ComputedRef<IFilterQuery> = computed(() => store.getters['filter/filterQuery']);
    const schema: Ref<ISchema> = computed(() => store.getters['meta/schema']);
    const postgraduateCourse: Ref<IPostgraduateCourse> = computed<IPostgraduateCourse>(() => store.getters['postgraduateCourses/item']);
    const mounted: Ref<boolean> = ref(false);
    const showForm: Ref<boolean> = ref(false);
    const showFormFunc = () => {
      showForm.value = true;
    };

    const openRespondForm = async () => {
      await showFormFunc();
      scroll('responce-form');
    };
    const closeRespondForm = () => {
      showForm.value = false;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    onBeforeMount(async () => {
      await store.dispatch('meta/getSchema');
      store.commit(`filter/resetQueryFilter`);
      filterQuery.value.setParams(schema.value.dpoCourse.slug, route.params['id'] as string);
      await store.dispatch('postgraduateCourses/get', filterQuery.value);
      mounted.value = true;
      if (route.query.respondForm) {
        openRespondForm();
      }
    });

    const getUrl = (): string => {
      const host = process.env.VUE_APP_API_HOST;
      return `${host}/postgraduate-courses/${route.params['id']}`;
    };
    // TODO убрать
    const svgDummy =
      'M42.1252 0.594141C42.1252 0.920898 42.2639 1.86582 42.4332 2.69375C42.7483 4.2334 43.2897 5.44941 49.1321 17.7379L51.669 23.0734L51.1911 24.2479C49.7659 27.751 49.1341 32.1383 49.5144 35.8887C49.8406 39.1049 50.4114 41.0148 52.651 46.3867C54.9237 51.8375 55.227 52.8725 55.227 55.1758C55.227 58.2498 54.1695 60.941 52.0884 63.1629C50.5643 64.7902 49.1116 65.7449 47.0226 66.4922L45.3518 67.0898L31.2723 67.1996C15.698 67.3209 16.4456 67.2598 13.6729 68.6396C10.8934 70.023 8.90293 72.0479 7.51591 74.9023C6.19439 77.6225 6.14433 78.1635 6.14433 89.7379V100H7.70872H9.2731L9.27604 89.7949C9.27838 81.4877 9.33255 79.3625 9.5676 78.3672C10.3803 74.9238 12.9739 72.0902 16.4836 70.8111C17.544 70.4246 18.0939 70.4063 31.6634 70.3027C45.5022 70.1973 45.7673 70.1879 47.1761 69.7607C53.9575 67.7039 58.3558 61.9881 58.3558 55.2318C58.3558 52.4555 57.9782 51.0873 55.6838 45.552C52.988 39.0482 52.6422 37.7232 52.6131 33.7891C52.5851 30.0156 52.996 27.9818 54.479 24.5525C54.8588 23.6742 55.007 23.0803 54.9176 22.7947C54.8435 22.5574 52.8034 18.1885 50.3838 13.0859C47.9645 7.9834 45.8692 3.48086 45.7274 3.08047C45.5859 2.68008 45.4101 1.82305 45.3367 1.17617L45.2036 0H43.6644H42.1252V0.594141ZM51.5116 0.890234C51.5116 3.76035 53.5332 10.3037 55.8406 14.9029C59.3433 21.884 62.968 26.0979 71.1008 32.6434C77.2231 37.5705 78.2522 38.8172 79.3655 42.6541C80.2697 45.7705 79.978 49.4551 78.5874 52.4867L77.9394 53.899L77.1183 53.6098C75.432 53.0154 73.2282 53.3342 71.6001 54.4076C70.53 55.1131 60.0832 68.2154 59.6065 69.4498C59.0212 70.9654 59.0955 73.0547 59.7844 74.4559C61.4521 77.8477 65.7498 78.9643 68.9684 76.8424C70.0384 76.1369 80.4852 63.0346 80.962 61.8002C81.529 60.3316 81.4716 58.1887 80.8302 56.8949L80.3278 55.8811L80.9645 54.7592C81.3147 54.142 81.8832 52.7969 82.2279 51.7697C82.7645 50.1707 82.8686 49.5408 82.9517 47.3871C83.0999 43.5432 82.4067 40.6287 80.636 37.6518C79.4283 35.6213 77.834 34.0596 73.0231 30.1943C66.7421 25.1479 64.0546 22.3602 61.0487 17.7734C57.9041 12.9752 55.0694 5.63086 54.6973 1.31836L54.5836 0H53.0476H51.5116V0.890234ZM59.4023 1.19004C59.6654 3.7041 60.4403 4.82969 64.2359 8.21152C67.5215 11.1393 68.4034 11.7332 70.3566 12.3342C71.5825 12.7113 71.9673 12.7355 74.7564 12.6109C77.1724 12.5029 78.1163 12.5375 79.2611 12.776C83.0737 13.5701 86.3777 16.065 89.1128 20.2148C90.3569 22.1021 93.9603 29.2963 94.787 31.543C96.9823 37.5082 97.4385 44.6676 96.097 52.0979C95.8915 53.2361 95.7636 54.2326 95.8129 54.3123C95.922 54.4885 98.603 54.9836 98.735 54.852C98.9061 54.6809 99.5856 50.3299 99.7976 48.0469C100.342 42.184 99.7886 36.7303 98.1284 31.6006C97.2314 28.8297 92.8239 19.9967 91.2118 17.7393C88.9372 14.5543 86.222 12.1744 83.3547 10.8527C80.7101 9.63359 79.8364 9.48496 75.2707 9.47793C71.2113 9.47148 71.1528 9.46543 70.181 8.95352C68.7869 8.21934 63.3904 3.33828 62.9516 2.41465C62.7585 2.0084 62.5579 1.29883 62.5059 0.837891L62.4114 0H60.8445H59.2778L59.4023 1.19004ZM19.5951 15.9143C15.2102 16.6313 9.85897 19.2891 7.22708 22.0572L6.64787 22.6666L7.72573 23.7434L8.80379 24.8199L9.92135 23.843C14.5392 19.807 20.7021 18.0354 26.6024 19.048C35.3466 20.5488 41.9923 27.1916 43.4016 35.8398C43.9656 39.3008 43.7002 42.1887 42.4858 45.8062L41.6972 48.1553L43.1877 53.5971C44.0072 56.59 44.6513 59.0654 44.6189 59.0979C44.5864 59.1303 41.5793 58.8545 37.9362 58.4848L31.3124 57.8125L29.5325 58.3816C24.4089 60.0197 19.1002 59.6043 14.2596 57.1865C3.79912 51.9617 -0.0842813 38.9943 5.78022 28.8723C6.19556 28.1553 6.53543 27.5213 6.53543 27.4635C6.53543 27.4057 5.99473 26.9916 5.33398 26.5434L4.13253 25.7285L3.77154 26.1943C3.18588 26.95 1.72865 29.8727 1.20184 31.3477C0.297038 33.8816 0 35.7879 0 39.0625C0 42.3422 0.298798 44.2551 1.20477 46.7773C3.24258 52.4508 7.49733 57.292 12.7904 59.9598C16.3001 61.7287 19.0355 62.3621 23.2548 62.3824C26.4839 62.3979 28.3322 62.1369 30.6618 61.3363C31.671 60.9895 31.7463 60.9932 39.4476 61.7639C46.6907 62.4887 47.248 62.5197 47.6982 62.2252C47.9637 62.0514 48.2377 61.6836 48.3069 61.408C48.3916 61.0713 47.8677 58.8307 46.7103 54.5791L44.9875 48.2516L45.5102 46.7332C46.4918 43.8824 46.6956 42.541 46.6907 38.9648C46.6866 35.8875 46.642 35.477 46.0824 33.3541C43.7602 24.5439 36.9194 18.0115 28.0141 16.1002C25.9849 15.6646 21.7004 15.5699 19.5951 15.9143ZM17.5751 23.917C17.095 24.3963 17.095 24.3969 17.095 28.6045V32.8125H12.882C8.66925 32.8125 8.66866 32.8125 8.18879 33.292L7.70872 33.7713V39.0625V44.3537L8.18879 44.833C8.66866 45.3125 8.66925 45.3125 12.882 45.3125H17.095V49.5205C17.095 53.7281 17.095 53.7287 17.5751 54.208L18.055 54.6875H23.3526H28.6502L29.1301 54.208C29.6101 53.7287 29.6101 53.7281 29.6101 49.5205V45.3125H33.8232C38.0359 45.3125 38.0365 45.3125 38.5164 44.833L38.9965 44.3537V39.0625V33.7713L38.5164 33.292C38.0365 32.8125 38.0359 32.8125 33.8232 32.8125H29.6101V28.6045C29.6101 24.3969 29.6101 24.3963 29.1301 23.917L28.6502 23.4375H23.3526H18.055L17.5751 23.917ZM26.4814 30.7705C26.4814 34.9781 26.4814 34.9787 26.9614 35.458C27.4413 35.9375 27.4419 35.9375 31.6546 35.9375H35.8677V39.0625V42.1875H31.6546C26.0265 42.1875 26.4814 41.7332 26.4814 47.3545V51.5625H23.3526H20.2238V47.3545C20.2238 41.7332 20.6787 42.1875 15.0506 42.1875H10.8375V39.0625V35.9375H15.0506C20.6787 35.9375 20.2238 36.3918 20.2238 30.7705V26.5625H23.3526H26.4814V30.7705ZM76.7393 56.8848C78.0804 57.7963 78.6252 59.2943 78.0878 60.592C77.8823 61.0881 73.1136 67.2445 71.9519 68.5137C71.7677 68.715 71.2721 68.4076 69.4872 66.9848C68.2585 66.0053 67.1742 65.1275 67.0778 65.0342C66.8443 64.8082 72.8559 57.3221 73.6678 56.8275C74.5401 56.2963 75.9111 56.3217 76.7393 56.8848ZM94.752 58.0566C94.6414 58.4059 93.8928 61.0205 93.0889 63.8672C91.4365 69.7187 90.7122 71.7303 89.0884 74.9764C82.3662 88.4143 69.0192 96.875 54.5426 96.875C47.8683 96.875 39.7421 94.5816 34.7947 91.3018C33.7712 90.6232 29.9621 86.8898 27.1501 83.8092C25.6301 82.1441 24.0546 81.6514 22.4245 82.3316C21.455 82.7363 21.0189 83.1527 20.5916 84.082C20.2629 84.7969 20.232 85.5066 20.2281 92.4316L20.2238 100H21.7882H23.3526V92.6697C23.3526 86.0736 23.3845 85.3272 23.6713 85.2172C23.9044 85.1277 25.0488 86.1781 27.9245 89.1207C32.0271 93.3186 32.9573 94.0561 36.161 95.6522C46.3002 100.703 58.468 101.345 68.8745 97.3789C78.7534 93.6135 86.82 86.2922 91.7664 76.6021C93.4624 73.2793 94.3623 70.8625 95.8174 65.7227C96.5169 63.252 97.2674 60.6271 97.4852 59.8898C97.7031 59.1525 97.8394 58.44 97.7881 58.3066C97.7165 58.1205 95.5507 57.4219 95.045 57.4219C94.9947 57.4219 94.8629 57.7074 94.752 58.0566ZM67.2 69.1602C68.4124 70.1375 69.4837 71.0123 69.5806 71.1037C69.8116 71.3219 67.6932 73.9398 66.8899 74.4291C66.5203 74.6541 65.917 74.8035 65.3756 74.8039C63.1966 74.8057 61.6054 72.3641 62.5649 70.4914C62.8939 69.8494 64.7619 67.3828 64.9192 67.3828C64.9612 67.3828 65.9876 68.1826 67.2 69.1602ZM49.9472 73.4375V75H53.076H56.2047V73.4375V71.875H53.076H49.9472V73.4375ZM57.4119 81.5834C56.1936 83.1379 55.2256 84.4283 55.2608 84.4508C55.296 84.4732 55.7704 84.8555 56.3152 85.3002C56.86 85.7449 57.4015 86.1361 57.5182 86.1695C57.7021 86.2223 62.0618 80.9404 62.0686 80.6568C62.071 80.5637 60.3472 79.1961 59.8294 78.8803C59.718 78.8123 58.6301 80.0287 57.4119 81.5834ZM68.5732 81.2082C67.8287 81.3939 67.351 81.6162 67.351 81.7768C67.351 81.9217 67.6699 83.3127 68.0597 84.8678C68.5562 86.8482 68.8516 87.6953 69.0462 87.6953C69.1989 87.6953 69.8943 87.5522 70.5914 87.3773C71.5893 87.127 71.839 86.9918 71.7653 86.7426C71.7137 86.5684 71.4425 85.5029 71.1626 84.375C70.3274 81.0088 70.2789 80.8584 70.0322 80.8812C69.9019 80.8934 69.2455 81.0404 68.5732 81.2082Z';

    return {
      chooseRandomBrandColor,
      postgraduateCourse,
      getUrl,
      svgDummy,
      mounted,
      showForm,
      openRespondForm,
      closeRespondForm,
    };
  },
});
</script>

<style scoped lang="scss">
$side-container-max-width: 300px;
$medical-profile-content-max-width: 1000px;
$card-margin-size: 30px;

.info-tags-block {
  display: flex;
  justify-content: space-around;
  margin: 10px 0 10px;
}

.bottom-footer {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
.title-icon {
  text-align: center;
  float: left;
  padding: 20px;
  background: #2754eb;
  border-radius: 5px;
  margin: 30px;
}

.article-title {
  color: #4a4a4a;
}

.card-item-title {
  color: #4a4a4a;
}

.medical-profile-page-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: $card-margin-size 0;
}

.side-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  width: $side-container-max-width;
  margin-right: $card-margin-size;

  .side-item {
    margin-bottom: $card-margin-size;
  }
}

.medical-profile-content-container {
  max-width: $medical-profile-content-max-width;
  width: 100%;
}

.add-comment {
  margin: 50px 0 50px 0;
}

.box-card {
  margin: 10px 0 10px 0;
}

h2,
h3 {
  margin-top: 0;
  color: black;
  text-align: center;
}
h3 {
  font-size: 20px;
}

.card-content {
  margin-left: auto;
  margin-right: auto;
}

:deep(p) {
  text-align: justify;
}

// :deep(a) {
//   color: inherit !important;
// }

:deep(blockquote) {
  border-left: 5px solid #2467a6;
  margin-left: 0;
  padding-left: 50px;
}

.recent-news-item {
  display: flex;
  flex-direction: column;
  padding: 10px;
  cursor: pointer;
  .item-title {
    font-weight: 600;
  }
  .item-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
  }
  .icon {
    user-select: none;
    display: flex;
    align-items: center;
    transition: all 0.2s;
    margin-right: 3px;
  }
  .anticon {
    padding-right: 5px;
    font-size: 16px;
  }
}
h4 {
  color: black;
  margin: 15px 0 0 10px;
}
.item-footer {
  color: #a1a7bd;
}

:deep(.cell-row) {
  cursor: pointer;
}
.el-divider {
  margin: 10px 0 0;
}
// :deep(.cell) {
// padding: 0 !important;
// }
.recent-news-footer {
  margin: 10px;
  margin-bottom: 15px;
  text-align: center;
  button {
    background-color: #2754eb;
    width: 100%;
    border-radius: 5px;
    color: #ffffff;
    padding: 11px 23px;
    font-size: 14px;
    border: none;
    transition: background-color 0.25s ease;
    &:hover {
      cursor: pointer;
      background-color: darken(#2754eb, 10%);
    }
  }
}

.card-meta {
  display: flex;
  margin-top: 10px;
}

.share {
  display: flex;
  align-items: center;
  img {
    margin-left: 15px;
    height: 25px;
  }
  .anticon {
    margin: 5px;
    font-size: 30px;
  }
  .share-item {
    .colored {
      display: none;
    }
    &:hover {
      .colored {
        display: unset;
        transform: scale(1.1);
      }
      .black {
        display: none;
      }
    }
  }
}
:deep(.response-btn) {
  border-radius: 20px;
  background-color: #31af5e;
  padding: 10px 20px;
  height: auto;
  letter-spacing: 2px;
  color: white;
  border: 1px solid rgb(black, 0.05);
  &:hover {
    cursor: pointer;
    background-color: lighten(#31af5e, 10%);
  }
}
.info-block {
  margin: 10px 0 10px;
  display: flex;
  justify-content: center;
}

.right-field {
  width: 100%;
  // background: #ffffff;
  // border-radius: 5px;
  // border: 1px solid #dcdfe6;
}

.left-field {
  width: 303px;
}

.left-field-title {
  margin-left: 12px;
}

.font {
  color: #343e5c;
}

// :deep(.card-item) {
//   background-color: red;
// }
</style>
