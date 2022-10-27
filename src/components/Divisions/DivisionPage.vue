<template>
  <!-- <div v-if="mount" class="division-page-container"> -->
  <div v-if="mounted" class="division-page-container" data-test="division-component">
    <!-- <div class="title-out">Главная / Отделения и центры / Гастроэнтерологическое отделение / Бочкова Наталья Геннадьевна</div> -->
    <DivisionInfo :division="division" />
    <DivisionInfoBlock />
    <PaidServices :items-with-paid-service="division.divisionPaidServices" />
    <DivisionSchedule :division="division" />
    <DoctorsCarousel :doctors="division.doctors" header-title="Специалисты отделения" />
    <NewsSlider :news="division.newsDivisions" />
    <DivisionCertificates />
    <ScansSlider :gallery-elements="division.certificates" />
    <DivisionDateAndTime :division="division" />
    <component :is="'MainContainer'" v-if="mounted && division.divisionVideos.length" header-title="Видео">
      <SocialMediaCarousel v-if="division.socialMedias.length" :social-medias="division.socialMedias" />
    </component>
    <!-- <ImageGallery :images="division.divisionImages" /> -->
    <Comments store-module="divisions" :parent-id="division.id" :is-reviews="true" />
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent } from 'vue';

import Comments from '@/components/Comments/Comments.vue';
import DivisionDateAndTime from '@/components/Divisions/DivisionDateAndTime.vue';
import DivisionInfo from '@/components/Divisions/DivisionInfo.vue';
import DivisionSchedule from '@/components/Divisions/DivisionSchedule.vue';
import DoctorsCarousel from '@/components/DoctorsCarousel.vue';
import MainContainer from '@/components/Main/MainContainer.vue';
import NewsSlider from '@/components/NewsSlider.vue';
import PaidServices from '@/components/PaidServices/PaidServices.vue';
import ScansSlider from '@/components/ScansSlider.vue';
import SocialMediaCarousel from '@/components/SocialMediaCarousel.vue';
import IDivision from '@/interfaces/IDivision';
import countRating from '@/services/countRating';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';
import CollapsContainer from '@/components/Main/CollapsContainer/CollapsContainer.vue'
import DivisionCertificates from '@/components/Divisions/DivisionCertificates.vue';

import DivisionInfoBlock from '@/components/Divisions/DivisionInfoBlock.vue';

export default defineComponent({
  name: 'DivisionPage',
  components: {
    SocialMediaCarousel,
    DivisionInfo,
    PaidServices,
    DivisionSchedule,
    DoctorsCarousel,
    NewsSlider,
    MainContainer,
    DivisionCertificates,
    DivisionDateAndTime,
    // ImageGallery,
    Comments,
    ScansSlider,
    CollapsContainer,
    DivisionInfoBlock,
  },

  setup() {
    const division: ComputedRef<IDivision> = computed<IDivision>(() => Provider.store.getters['divisions/division']);
    const load = async () => {
      Provider.filterQuery.value.setParams(Provider.schema.value.division.slug, Provider.route().params['id'] as string);
      await Provider.store.dispatch('divisions/get', Provider.filterQuery.value);
    };

    Hooks.onBeforeMount(load);

    return {
      countRating,
      division,
      mounted: Provider.mounted,
    };
  },
});
</script>

<style scoped lang="scss">
@import '@/assets/styles/elements/base-style.scss';

.card {
  display: block;
  background: #ffffff;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  background-clip: padding-box;
  margin-top: 30px;
  padding: 0px 40px 0px 23px;
}

.title-in {
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 22px;
  letter-spacing: 0.1em;
  color: $site_dark_gray;
  height: 60px;
  align-items: center;
  font-weight: bold;
}

// $left-side-max-width: 370px;
// $right-side-max-width: 1000px;
/* .hidden {
  display: none;
} */

.doctor-page-container {
  // display: flex;
  // justify-content: center;
  margin: 0 auto;
  .left-side {
    margin-right: 20px;
    // max-width: $left-side-max-width;
  }
  // .right-side {
  //   max-width: $right-side-max-width;
  // }
}
h2 {
  margin: 0;
}
.card-header {
  text-align: center;
}
.doctor-img-container {
  margin: 0 10px 10px 0;
  img {
    width: 150px;
  }
}
.flex-row {
  display: flex;
}
.flex-column {
  display: flex;
  flex-direction: column;
}
.link {
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}

.title-out {
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  letter-spacing: 0.1em;
  font-size: 12px;
  color: #343e5c;
  margin-left: 4px;
  height: 50px;
  align-items: center;
  font-weight: bold;
}
:deep(.leave-a-review) {
  padding: 40px 190px 35px 175px;
}
</style>
