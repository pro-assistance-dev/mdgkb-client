<template>
  <div :key="head" class="admin-header-bottom">
    <div class="flex-between">
      <div class="flex-line">
        <PButton v-if="Router.Id() || Router.Slug()" width="50px" margin="0 20px 0 0" @click="Router.Back()">
          <ArrowLeft />
        </PButton>
        {{ head.title }}
      </div>
      <div class="button-group">
        <div v-for="item in head.buttons" :key="item.text" class="flex-item">
          <PButton
            v-if="item.action && item.condition"
            :key="item.condition"
            skin="profile"
            :type="item.type"
            :text="item.text"
            @click="action(item.action)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const buttonClicked: Ref<boolean> = ref(false);
const head = PHelp.AdminUI.Head;
const action = (f: CallableFunction) => {
  console.log(f, 'click');

  buttonClicked.value = true;
  f();
  buttonClicked.value = false;
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
$header-bottom-height: 20px;
$header-bottom-background-color: whitesmoke;
// $header-shadow: 0 0 10px 0 rgb(0 0 0 / 20%);
$header-shadow: 0 10px 10px -10px rgba(0 0 0 / 20%);

.admin-header-bottom {
  height: $header-bottom-height;
  box-shadow: $header-shadow;
  background-color: $header-bottom-background-color;
  display: flex;
  align-items: center;
  padding: 20px 10px;
}

h4 {
  font-weight: normal;
  font-size: 18px;
}
.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0 20px 0 40px;
}
.button-group {
  display: flex;
  justify-content: right;
  align-items: center;
}

.flex-item {
  margin: 0 0 0 10px;
}

.flex-line {
  box-sizing: border-box;
  display: flex;
  justify-content: left;
  align-items: center;
}
</style>
