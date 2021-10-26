<template>
    <div class="foot_base">
        <div class="foot_main">
            <!-- 底部开始 -->
            <div class="footer">
                <div class="footer_font_content left_div">
                    <el-image
                        class="bottomlogo"
                        :src="logoImg"
                        :fit="fit"></el-image>
                    <div class="footerdesc">
                        ADAMScan is a blockchain browser and data service analysis platform developed with the support of ADAM LABS.
                        ADAMoracle provides users with ADAMoracle data and node information to check the latest running status of nodes in a timely manner
                    </div>
                    <div style="margin-top: 23px;">
                    </div>
                </div>
                <div class="footer_font_content content_div">
                    <el-row>
                        Community
                    </el-row>
                    <el-row >
                         <el-image :src="footer1" @click="direcTo('https://twitter.com/ADAM_Oracle')" ></el-image>
                    </el-row>
                    <el-row >
                          <el-image :src="footer2" @click='direcTo("https://t.me/adamoracleEnglish")'></el-image>
                    </el-row>
                    <el-row>
                         <el-image :src="footer3" @click="direcTo('https://t.me/adamoracleChinese')"></el-image>
                    </el-row>
                    <el-row >
                        <el-image :src="footer4" @click='direcTo("https://adamoracle.medium.com")'></el-image>
                    </el-row>
                    <el-row >
                        <el-image :src="footer5" @click='direcTo("https://www.youtube.com/watch?v=Vi62u5p3hmU")'></el-image>
                    </el-row>
                </div>
            </div>
        </div>
        <!-- 底部结束 -->
    </div>
</template>

<script>
    import "@/css/base.css"
    export default {
        name: "homeFooter",
        data(){
            return{
                logoImg: require("@/img/logo.png"),
                twitterIcon: require("@/img/icon/twitter_icon.png"),
                playIcon: require("@/img/icon/play_icon.png"),
                flyIcon: require("@/img/icon/fly_icon.png"),
                mIcon: require("@/img/icon/m_icon.png"),
                caijingIcon: require("@/img/icon/caijing_icon.png"),
                adamIcon: require("@/img/icon/adam_icon.png"),
                footer1: require("@/img/footer/1.png"),
                footer2: require("@/img/footer/2.png"),
                footer3: require("@/img/footer/3.png"),
                footer4: require("@/img/footer/4.png"),
                footer5: require("@/img/footer/5.png"),
                            
                fit: 'scale-down',
                backgroundImg: require("@/img/foot_background.png"),
            }
        },
        methods: {
            direcTo(url){
                console.log('...')
                window.open(url, '_blank')
            },
        }
    }
</script>

<style scoped>
    .el-link.el-link--default {
        color: white;
    }
    .el-link.el-link--default:hover {
        color: #409EFF;
    }
</style>
