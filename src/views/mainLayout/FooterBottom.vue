<template>
  <div class="footer-bottom">
    <div class="container">
      <el-row align="middle" justify="center">
        <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="4">
          <div class="image flex-center">
            <img :src="MdgkbLogoVert" alt="mdgkb-logo" />
          </div>
        </el-col>
        <el-col :xl="2">
          <div id="bbb" class="flex-center"></div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="4" :lg="4" :xl="4">
          <div class="flex-center">
            <a class="site-map" href="/site-map">Карта сайта</a>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6">
          <div class="flex-center">
            119049 г. Москва,<br />
            4-й Добрынинский переулок, дом 1/9
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
          <div>
            Круглосуточный Call-центр<br />
            <a href="tel:+7 (495) 959-88-00" rel="noopener noreferrer">+7 (495) 959-88-00</a><br />
            <!-- <a href="tel:+7 (495) 959-88-03" rel="noopener noreferrer">+7 (495) 959-88-03</a> -->
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="4" :lg="4" :xl="4">
          <div class="flex-center">
            <div class="icons">
              <a href="https://t.me/morozdgkbdzm" class="social-icon" target="_blank" rel="noopener noreferrer">
                <svg class="icon-ok">
                  <use xlink:href="#telegram"></use>
                </svg>
              </a>
              <a href="https://ok.ru/group/61174577365147" class="social-icon" target="_blank" rel="noopener noreferrer">
                <svg class="icon-ok">
                  <use xlink:href="#odnoklassniki"></use>
                </svg>
              </a>
              <a
                href="https://www.youtube.com/channel/UCG0gK-lfsZUVe6TvTrZh8uA"
                class="social-icon"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg class="icon-yt">
                  <use xlink:href="#icon-YT"></use>
                </svg>
              </a>
              <a href="https://vk.com/morozdgkbdzm" class="social-icon" target="_blank" rel="noopener noreferrer">
                <svg class="icon-vk">
                  <use xlink:href="#icon-VK"></use>
                </svg>
              </a>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="container">
      <el-row justify="center">
        <el-col :span="18">
          <div class="under-footer">© 2019 ГБУЗ «Морозовская ДГКБ ДЗМ»</div>
          <div class="under-footer">
            <a
              target="_blank"
              download="Выписка-лицензия-Морозовская-ДГКБ-ДЗМ.pdf"
              href="/files/Выписка-лицензия-Морозовская-ДГКБ-ДЗМ.pdf"
              data-v-bc8b679e=""
              class="underlined"
              rel="noopener noreferrer"
              >Лицензия на медицинскую деятельность</a
            >
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
  <SocialIcons />
</template>

<script lang="ts" setup>
import SocialIcons from '@/assets/svg/Main/SocialIcons.svg';
import MdgkbLogoVert from "@/assets/img/mdgkb-logo-vert.webp";

  // const b = new isvek.Bvi();
  //
  // console.log(b);
  // return {
  //   b,
  // };
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
.el-icon-view {
  &:hover {
    cursor: pointer;
    color: lighten(#379fff, 20%);
  }
}

a:link {
  color: #4a4a4a;
}
a:hover {
  color: #379fff;
}
a:active {
  color: #379fff;
}

.footer-bottom .social-icon {
  margin-right: 0px;
}

.icon-ok {
  width: 25px;
  height: 25px;
  fill: #406cff;
  transition: 0.25s;
  cursor: pointer;
  padding: 10px;
}

.icon-ok:hover {
  fill: #133dcc;
}

.icon-tg {
  width: 25px;
  height: 25px;
  fill: #406cff;
  transition: 0.25s;
  cursor: pointer;
  padding: 10px;
}

.icon-tg:hover {
  fill: #133dcc;
}

.icon-yt {
  width: 25px;
  height: 25px;
  fill: #406cff;
  transition: 0.25s;
  cursor: pointer;
  padding: 10px;
}

.icon-yt:hover {
  fill: #133dcc;
}

.icon-vk {
  width: 25px;
  height: 25px;
  fill: #406cff;
  transition: 0.25s;
  cursor: pointer;
  padding: 10px;
}

.icon-vk:hover {
  fill: #133dcc;
}
</style>
