<template>
  <div class="size">
    <div class="my-block">
      <div class="yes-progmam">
        <div class="box">
          <h2>
            Заявки ординатура
            <div v-if="user.residencyApplications.some((el) => el.formValue.viewedByUser)" class="sup-cymbol-counter">
              {{ user.residencyApplications.filter((d) => d.formValue.viewedByUser).length }}
            </div>
          </h2>
        </div>
      </div>
      <div class="table-container">
        <ProfileResidencyApplicationsCards />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import User from '@/classes/User';
import ProfileResidencyApplicationsCards from '@/components/Profile/ProfileResidencyApplications/ProfileResidencyApplicationsCards.vue';

export default defineComponent({
  name: 'ProfileResidencyApplications',
  components: {
    ProfileResidencyApplicationsCards,
  },

  setup() {
    const mounted = ref(true);
    const user: User = UsersStore.Item();

    onBeforeMount(async () => {
      mounted.value = true;
    });

    return {
      mounted,
      user,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
h2,
h3 {
  color: #343e5c;
  font-weight: normal;
  margin: 0;
}

.title {
  display: flex;
  position: relative;
  justify-content: space-between;
  margin-bottom: 20px;
  align-items: center;
  height: 40px;
  width: 100%;
}

.card-flex-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding: 10px;
  display: block;
  padding: 0px;
}

.table-container {
  width: 100%;
  // background: #f1f2f7;
}

.no-progmam {
  display: block;
  color: #b5b5b5;
}

.yes-progmam {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
}

.my-block {
  background: #ffffff;
  border-radius: 5px;
  border: 1px solid #dcdfe6;
  padding: 20px;
  width: calc(100% - 40px);
}

.sup-cymbol-counter {
  display: flex;
  position: absolute;
  right: -20px;
  top: 0;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  font-weight: bold;
  background: #2754eb;
  color: #ffffff;
  align-items: center;
  justify-content: center;
  padding: 1px;
  font-size: 12px;
  font-family: 'Open Sans', sans-serif;
}

.box {
  position: relative;
  margin-right: 20px;
}

ul {
  margin: 0;
  padding: 0;
}

.size {
  // max-width: 900px;
  padding-right: 20px;
}

.application-card {
  width: 100%;
  min-height: 20px;
  border-radius: 5px;
}

.card-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 50px;
  padding: 0 5px;
  width: calc(100% - 10px);
  border-radius: none;
  border: none;
}

ul.application-card {
  list-style-type: none;
}

ul.application-card li {
  border: 1px solid #dcdfe6;
  border-radius: 5px;
  margin-bottom: 30px;
}

@media screen and (max-width: 980px) {
  .size {
    padding: 0 10px;
  }
  .table-container {
    display: block;
    width: 100%;
  }
  .box {
    margin-right: 0px;
    background: #ffffff;
  }

  .my-block {
    padding: 10px;
    width: calc(100% - 20px);
  }

  .application-card {
    width: 100%;
    min-height: 20px;
  }

  .card-item {
    justify-content: left;
  }
}

@media screen and (max-width: 560px) {
  .size {
    margin-top: 0px;
  }
  .hidden {
    display: none;
  }
  .title {
    justify-content: right;
  }
}

@media screen and (max-width: 480px) {
  .my-block {
    padding: 5px;
    width: calc(100% - 10px);
  }

  .card-item {
    padding: 0 5px;
    width: calc(100% - 10px);
  }
  .size {
    padding: 0 5px;
  }
}
</style>
