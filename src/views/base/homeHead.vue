<template>
    <div style="width: auto">
        <el-header style="padding: 0px 0px;">
            <div class="home_head" :style="headerStyle">
                <el-row class="head_size">
                    <div class="logo_div">
                        <el-image class="brandArea" :src="brandImg"></el-image>
                    </div>
                    <div class="menu_style">
                        <el-menu
                                :router="true"
                                :default-active="activeIndex"
                                :active-text-color="activeColor"
                                class="el-menu-demo text_color"
                                background-color="transparent"
                                :style="selfStyle"
                                mode="horizontal"
                                text-color="#fff"
                                @select="handleSelect">
                            <div :class="isActive==1?'default_active':'menu_div'" style="width: 17%;">
                                <el-menu-item index="home">Home</el-menu-item>
                            </div>
                            <div :class="isActive==3?'default_active':'menu_div'" style="width: 23%">
                                <el-menu-item index="leaderboard">Leaderboard</el-menu-item>
                            </div>
                            <div :class="isActive==4?'default_active':'menu_div'">
                                <el-menu-item index="resource">Resources</el-menu-item>
                            </div>
                            <div :class="isActive==5?'default_active':'menu_div'">
                                <el-menu-item index="global">Distribution</el-menu-item>
                            </div>
                             <div :class="isActive==6 ? 'default_active':'menu_div'">
                                <el-menu-item index="map">Machine Map</el-menu-item>
                            </div>
                        </el-menu>
                    </div>
                </el-row>
                <el-row :hidden="ismap">
                    <div :hidden="allHidden" class="search_area" :style="activeStyle">
                        <div :hidden="isHidden" class="user_menu_display">
                            <div class="text_data">
                                {{title}}
                            </div>
                            <div v-if="isShowPri" class="dyn_data">
                                <div class="data_text">
                                    {{annotation}}
                                </div>
                            </div>
                        </div>
                        <el-input size="large" placeholder="Please enter the content" v-model="searchValue" :class="classValue">
                            <div class="select_div" slot="prepend">
                                <el-select class="select_button font-black" style="color: white" disabled v-model="searchType" placeholder="Address">
                                    <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <i
                                    class="el-icon-search search_button"
                                    slot="suffix"
                                    @click="handleIconClick" circle>
                            </i>
                        </el-input>
                    </div>
                </el-row>
            </div>
        </el-header>
    </div>
</template>

<script>
    import "@/css/base.css"
    import Utils from "@/utils/js/transferStation"
    import jquery from "jquery";
    export default {
        name: "homeHead",
        created(){
            /*闪屏现象进行预加载*/
            this.homeBackground = require("@/img/home_background.png")
            this.resourceBackground = require("@/img/resource_background.png")
            this.otherBackground = require("@/img/other_background.png")
        },
        watch: {
            // 利用watch方法检测路由变化：
            // eslint-disable-next-line no-unused-vars
            // '$route': function (to, from) {
            //     let path = location.pathname;
            //     // 加载表格数据
            //     this.updateStyle(path);
            // }
        },
        activated: function() {
            // // this.activeIndex = this.$route.path;
            // //初始化时，需要根据路径判断样式
            // let path = location.pathname;
            // //判断路径替换样式
            // this.updateStyle(path);
        },
        mounted() {
            // this.activeIndex = this.$route.path;
            //初始化时，需要根据路径判断样式
            let path = location.hash.replace('#/', '');
            console.log('path::::::::', path, location)
            //判断路径替换样式
            this.updateStyle(path);
        },
        data() {
            return {
                classValue: "input-with-select width-big",
                fit: 'scale-down',
                brandImg: require("@/img/logo.png"),
                backgroundImg: require("@/img/home_background.png"),
                personIcon: require("@/img/icon/person_icon.png"),
                activeIndex: 'home',
                activeClass: "default_active",
                isActive: "home",
                activeColor: '#FF6B22',
                searchType: '1',
                isShowPer: false,
                isShowPri: false,
                searchValue: '',
                userAccount: 0,
                isHidden: true,
                allHidden: false,
                title: "",
                activeStyle: "",
                backgroundStyle: "",
                annotation: "ADAM Price",
                selfStyle: "position:static;border: 0px;",
                options: [
                    {value: '1',label: 'Address'},
                ],
                homeBackground: "",
                resourceBackground: "",
                otherBackground: "",
                headerStyle: "",
                ismap: false
            }
        },
        methods: {
            handleSelect(key) {
                // console.log('key::::', key)
                this.updateStyle(key);
            },
            updateStyle(path){
                // console.log('path::', path)
                //判断路径替换样式
                // let str = path[0];
                 console.log('path str::', path)
                // this.setActiveClass(str)
                this.activeIndex = path;
                // console.info("当前激活导航栏:" + this.activeIndex)
                //清空查询
                this.searchValue = ""

                switch(path) {
                 
                    case 'home':
                        
                        this.classValue = "input-with-select width-big";
                        this.isHidden = true;
                        this.allHidden = false;
                        // this.backgroundImg = require("@/img/home_background.png");
                        this.backgroundImg = this.homeBackground;
                        this.activeStyle = "margin: 70px 0px 112px 0px";
                        this.backgroundStyle = "height: 784px;width: 100%"
                        // this.isShowPer = false
                        this.isShowPri = false

                        this.headerStyle = ""
                        this.ismap = false
                        
                        break;
                    case 'map':
                        this.ismap = true
                        this.headerStyle = "height: 75px; "
                        
                        console.log('map')
                        break;
                    case 'account':
                        this.backgroundImg = this.otherBackground;
                        this.activeStyle = "margin: 79px 0px 28px 0px";
                        this.backgroundStyle = "height: 314px;width: 100%"
                        // this.isShowPer = false
                        this.isShowPri = false

                        this.headerStyle = ""
                        this.ismap = false 
                        break;
                    case 'leaderboard':
                        this.title = "Leaderboard";
                        this.classValue = "input-with-select width-small";
                        this.isHidden = false;
                        this.allHidden = false;
                        // this.isShowPer = false
                        this.isShowPri = false
                         console.log('leaderboard')
                        break;
                    default:
                        this.classValue = "input-with-select width-big";
                        this.isHidden = true;
                        this.allHidden = false;
                        // this.backgroundImg = require("@/img/home_background.png");
                        this.backgroundImg = this.homeBackground;
                        this.activeStyle = "margin: 70px 0px 112px 0px";
                        this.backgroundStyle = "height: 784px;width: 100%"
                        // this.isShowPer = false
                        this.isShowPri = false

                        this.headerStyle = ""
                        this.ismap = false
                        console.log('default', path)
                        break;
                }
                // if( str.search("home") != -1){
                //     // this.classValue = "input-with-select width-big";
                //     // this.isHidden = true;
                //     // this.allHidden = false;
                //     // // this.backgroundImg = require("@/img/home_background.png");
                //     // this.backgroundImg = this.homeBackground;
                //     // this.activeStyle = "margin: 70px 0px 112px 0px";
                //     // this.backgroundStyle = "height: 784px;width: 100%"
                //     // // this.isShowPer = false
                //     // this.isShowPri = false

                //     // this.headerStyle = ""
                //     // this.ismap = false
                // } else if(str.search("map") != -1) {
                    
                //     // this.ismap = true
                //     // this.headerStyle = "height: 75px; "
                    
                // } else {
                //     // this.title = "Leaderboard";
                //     // this.classValue = "input-with-select width-small";
                //     // this.isHidden = false;
                //     // this.allHidden = false;
                //     // // this.isShowPer = false
                //     // this.isShowPri = false
                //     // if(str.search("resource") != -1){
                //     //     // this.backgroundImg = require("@/img/resource_background.png");
                //     //     this.backgroundImg = this.resourceBackground;
                //     //     this.activeStyle = "margin: 79px 0px 135px 0px";
                //     //     this.backgroundStyle = "height: 793px;width: 100%"
                //     //     // this.isShowPer = false
                //     //     this.isShowPri = true
                //     //     //查询当前价格
                //     //     this.getAdamPrice()

                //     //     this.headerStyle = ""
                //     //     this.ismap = false
                //     } else {
                //         if(str.search("account") != -1){
                //             this.title = "Account"
                //         }
                //         // console.info("33")
                //         this.backgroundImg = this.otherBackground;
                //         this.activeStyle = "margin: 79px 0px 28px 0px";
                //         this.backgroundStyle = "height: 314px;width: 100%"
                //         // this.isShowPer = false
                //         this.isShowPri = false

                //         this.headerStyle = ""
                //         this.ismap = false
                //         // if(str.search("account") != -1){
                //         // }
                //     }
                // }

            },
            handleIconClick(){
                console.log('this.searchValue', this.searchValue || !this.searchValue.trim())
                if(!this.searchValue) return
                sessionStorage.setItem("searchValue",this.searchValue);
                //获取当前路由信息
                let path = this.$route.path;
                let params = {
                    searchType: 1,
                    searchValue: this.searchValue,
                }
                console.info("输入参数:" + JSON.stringify(params))
                //刷新对应的页面数据并跳转
                Utils.$emit('demo',params);
                this.updateStyle("/resource");
                if(path.toString().search("resource") == -1){
                    this.$router.push('/resource');
                }
            },
            getAdamPrice(){
                var price = 0;
                var that = this 
                // eslint-disable-next-line no-undef
                jquery.ajax({
                    type: "GET",
                         url: 'https://api.adamscan.io/api/getWirePledgeInfo',
                    // url: 'https://route-api.dodoex.io/dodoapi/getdodoroute?fromTokenAddress=0x59802AC95f2399c929a096171C1bee93C27daE90&fromTokenDecimals=8&toTokenAddress=0x55d398326f99059ff775485246999027b3197955&toTokenDecimals=18&fromAmount=100000000&slippage=3&userAddr=0xa8E7813150a988e7F20193983fA3017155F3C162&chainId=56&deadLine=1637306531&source=dodoV2AndMixWasm&apiKey=d61f2eb1ce8d',
 
                    // url: "https://bsc.api.0x.org/swap/v1/price?sellToken=0xdde077002982956DF24E23E3f3743BA5e56929fe&buyToken=0x55d398326f99059ff775485246999027b3197955&sellAmount=10000000",
                    // async: false,
                    success: function (res) {
                        price = res.data.adamPrice
                        console.log('price::', price)
                        that.title = "$ " + that.showValue(price)
                        // console.info(JSON.stringify(res))
                    },
                    error: function (e) {
                        that.title = '-'
                        console.log('e::', e)
                        // alert("网络错误")
                    }
                })
                // this.title = "$ " + this.showValue(price)
            },
            showValue(value){
                if(value == "-"){
                    return "-";
                }
                // 保留素位小数
                return parseFloat(value).toFixed(4)
            },
        }
    }
</script>

<style scoped>

</style>
