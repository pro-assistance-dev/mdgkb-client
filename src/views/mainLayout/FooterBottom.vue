<template>
  <div class="footer-bottom">
    <div class="container">
      <el-row align="middle" justify="center">
        <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="4">
          <div class="image flex-center">
            <img src="@/assets/img/mdgkb-logo-vert.png" />
          </div>
        </el-col>
        <el-col :xl="2">
          <div class="flex-center">
            <a id="specialButton" href="#">
              <i class="el-icon-view"></i>
            </a>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6">
          <div class="flex-center">
            119049 г. Москва,<br />
            4-й Добрынинский переулок, дом 1/9
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
          <div class="flex-center">
            Круглосуточный Call-центр<br />
            +7 (495) 959-88-00<br />
            +7 (495) 959-88-03
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="4" :lg="4" :xl="4">
          <div class="flex-center">
            <a href="#" class="social-icon">
              <img src="@/assets/img/social/facebook.png" />
            </a>
            <a href="#" class="social-icon">
              <img src="@/assets/img/social/instagram.png" />
            </a>
            <a href="#" class="social-icon">
              <img src="@/assets/img/social/youtube.png" />
            </a>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
  <div class="footer-bottom">
    <div class="container">
      <el-row justify="center">
        <el-col :span="6">
          <div class="under-footer">© 2019 ГБУЗ «Морозовская ДГКБ ДЗМ»</div>
          <div class="under-footer"><a href="#" class="underlined">Лицензия на медицинскую деятельность</a></div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterBottom',
};
</script>
