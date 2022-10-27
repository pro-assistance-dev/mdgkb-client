<template>
  <CollapsContainer v-if="false" tab-id="3" >
    <template #inside-title>
      <div class="title-in">Информация об отделении</div>
    </template>
    <template #inside-content>
      <div class="example">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque laoreet auctor commodo. 
          Praesent erat dui, euismod vitae est id, tempor ullamcorper justo. Nullam porta lorem ligula, 
          in iaculis nulla mattis quis. Vestibulum vel vehicula velit. Fusce efficitur lacus vitae nunc varius tristique. 
          Donec et erat vitae ligula scelerisque pretium. Nullam porta porttitor ante eu facilisis. Vivamus sed suscipit lacus. 
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>
          
          Sed nec molestie ex. Vivamus et orci nec odio sagittis hendrerit. Pellentesque vestibulum dignissim gravida. 
          Mauris faucibus ante augue, quis rhoncus elit finibus sit amet. Nam sit amet ligula vestibulum, efficitur libero a, 
          suscipit nibh. Phasellus nec risus vitae ante dignissim commodo quis in justo. Sed ornare elit dolor, 
          eget tempor mauris eleifend vel. Vestibulum auctor nisi id ex malesuada finibus. Integer vehicula, lorem nec lobortis dictum, 
          est lacus pharetra mauris, sed convallis felis odio in quam. Proin efficitur arcu sit amet odio aliquet finibus. 
          Vestibulum congue pellentesque diam nec imperdiet.
      </div>
    </template>  
  </CollapsContainer> 
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import CollapsContainer from '@/components/Main/CollapsContainer/CollapsContainer.vue'


export default defineComponent({
  name: 'DivisionInfoBlock',
  components: { CollapsContainer },
});
</script>

<style scoped lang="scss">
@import '@/assets/styles/elements/base-style.scss';
* {
  padding: 0px;
  margin: 0px;
}

*,
::after,
::before {
  box-sizing: initial;
}

html,
body {
  height: 100%;
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

.example {
  font-size: 16px;
  color: $site_dark_gray;
  margin: 20px;
}


</style>