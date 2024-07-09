<template>
  <div v-if="mounted" class="division-page-container" data-test="division-component">
    <DivisionInfo :division="division" />
    <DivisionInfoBlock :info="division.info" />
    <PaidServices :items-with-paid-service="division.divisionPaidServices" />
    <DivisionSchedule :division="division" />
    <DoctorsCarousel :doctors="division.getDoctors(true)" header-title="Специалисты отделения" />
    <NewsSlider :news="division.newsDivisions" />
    <DivisionCertificates />
    <ScansSlider :gallery-elements="division.certificates" />
    <DivisionDateAndTime :division="division" />
    <CollapseItem :tab-id="134" :collapsed="false">
      <template #inside-title>
        <div class="title-in">Видео отделения</div>
      </template>
      <template #inside-content>
        <SocialMediaCarousel v-if="division.socialMedias.length" :social-medias="division.socialMedias" />
      </template>
    </CollapseItem>
    <ImageGalleryDivision :images="division.divisionImages" />
    <Comments :comments="division.getComments()" :parent-id="division.id" :is-reviews="true" />
  </div>
</template>

<script lang="ts" setup>
import Division from '@/classes/Division';
import Hooks from '@/services/Hooks/Hooks';

const division: ComputedRef<Division> = DivisionsStore.Item();
const mounted = ref(false);
const load = async () => {
  await DivisionsStore.Get(Router.Id());
  mounted.value = true;
};

Hooks.onBeforeMount(load);
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';

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

.doctor-page-container {
  margin: 0 auto;
  .left-side {
    margin-right: 20px;
  }
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

@media screen and (max-width: 1024px) {
  :deep(.leave-a-review) {
    padding: 20px;
  }
}

@media screen and (max-width: 400px) {
  :deep(.leave-a-review) {
    padding: 10px;
  }
}
</style>
