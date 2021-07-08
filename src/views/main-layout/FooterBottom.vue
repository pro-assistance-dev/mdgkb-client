<template>
        <el-row class="footer-bottom container">
                    <el-col :span="6">
                        <div class="image">
                        <img src="@/assets/img/mdgkb-logo-vert.png"/>
                        </div>
                    </el-col>
                            <el-col :span="8">
                                119049 г. Москва,<br/>
                                4-й Добрынинский переулок, дом 1/9
                            </el-col>
                            <el-col :span="6">s
                                Круглосуточный Call-центр<br/>
                                +7 (495) 959-88-00<br/>
                                +7 (495) 959-88-03
                            </el-col>
                            <el-col :span="4">
                                <a href="#" class="social-icon">
                                    <img src="@/assets/img/social/facebook.png"/>
                                </a>
                                <a href="#" class="social-icon">
                                    <img src="@/assets/img/social/instagram.png"/>
                                </a>
                                <a href="#" class="social-icon">
                                    <img src="@/assets/img/social/youtube.png"/>
                                </a>
                            </el-col>

        </el-row>
        <el-row class="footer-bottom container">
                    <el-col :offset="2">
                        <div class="under-footer">© 2019 ГБУЗ «Морозовская ДГКБ ДЗМ»</div>
                        <div  class="under-footer"><a href="#" class="underlined">Лицензия на медицинскую деятельность</a></div>
                    </el-col>
        </el-row>

</template>

<script>
  export default {
    name: "FooterBottom",
  }
</script>
