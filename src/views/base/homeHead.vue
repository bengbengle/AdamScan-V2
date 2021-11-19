<template scoped>
  <div>
    <el-header style="padding: 0px; height: auto">
      <div class="home_head">
        <el-row
          class="head_size"
          style="
            display: flex;
            padding: 20px 0px;
            align-items: center;
            max-height: 80px;
          "
        >
          <img class="center_logo" :src="brandImg" style="" />
          <div class="logo_content"></div>
          <div class="btn_menu" style="width: 40px" @click="handleMenuClick">
            <img class="btn_menu_icon" :src="menuImg" style="" />
          </div>
        </el-row>
        <el-row class="head_size" style="display: none">
          <div class="logo_div" style="display: none">
            <el-image class="brandArea" :src="brandImg"></el-image>
          </div>
          <div class="menu_style" style="display: none">
            <el-menu
              :router="true"
              :default-active="activeIndex"
              :active-text-color="activeColor"
              class="el-menu-demo text_color"
              background-color="transparent"
              :style="selfStyle"
              mode="horizontal"
              text-color="#fff"
            >
              <div
                :class="isActive == 1 ? 'default_active' : 'menu_div'"
                style="width: 17%"
              >
                <el-menu-item index="home">Home</el-menu-item>
              </div>
              <div :class="isActive == 3 ? 'default_active' : 'menu_div'"  style="width: 23%" >
                <el-menu-item index="leaderboard">Leaderboard</el-menu-item>
              </div>
              <div :class="isActive == 4 ? 'default_active' : 'menu_div' ">
                <el-menu-item index="resource">Resources</el-menu-item>
              </div>
              <div :class="isActive == 5 ? 'default_active' : 'menu_div'">
                <el-menu-item index="global">Distribution</el-menu-item>
              </div>
              <div :class="isActive == 6 ? 'default_active' : 'menu_div'">
                <el-menu-item index="map">Machine Map</el-menu-item>
              </div>
            </el-menu>
          </div>
        </el-row>
        <el-row :hidden="ismap" style="margin: 50px 0px">
          <div :hidden="allHidden" class="search_area">
            <el-input
              size="large"
              placeholder="Please enter the content"
              v-model="searchValue"
              :class="classValue"
            >
              <div class="select_div" slot="prepend">
                <el-select
                  class="select_button font-black"
                  style="color: white"
                  disabled
                  v-model="searchType"
                  placeholder="Address"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
              <i
                class="el-icon-search search_button"
                slot="suffix"
                @click="handleIconClick"
                circle
              >
              </i>
            </el-input>
          </div>
        </el-row>
      </div>
    </el-header>
    <mt-popup v-model="popupVisible" position="right">
      <el-card class="box-card">
        <div
          v-for="o in ['Home', 'Leaderboard', 'Global', 'Map']"
          :key="o"
          class="text item"
          @click="handleMenuItemClick"
        >
          {{ o }}
        </div>
      </el-card>
    </mt-popup>
  </div>
</template>

<script>
import "@/css/base.css";
import Utils from "@/utils/js/transferStation";
import jquery from "jquery";

export default {
  name: "homeHead",
  created() {
    /*闪屏现象进行预加载*/
    this.homeBackground = require("@/img/home_background.png");
    this.resourceBackground = require("@/img/resource_background.png");
    this.otherBackground = require("@/img/other_background.png");
  },
  watch: {},
  activated: function () {},
  mounted() {
    // this.activeIndex = this.$route.path;
    //初始化时，需要根据路径判断样式
    let path = location.hash.replace("#/", "");
    console.log("path::::::::", path, location);

    switch(path){
      case 'map':
          this.ismap = true;
        break;
        default:
          this.ismap = false;
          break;
    }
    //判断路径替换样式
    // this.updateStyle(path);
  },
  data() {
    return {
      classValue: "input-with-select width-big",
      fit: "scale-down",
      brandImg: require("@/img/logo.png"),
      menuImg: require("@/img/menu.png"),
      backgroundImg: require("@/img/home_background.png"),
      personIcon: require("@/img/icon/person_icon.png"),
      activeIndex: "home",
      activeClass: "default_active",
      isActive: "home",
      activeColor: "#FF6B22",
      searchType: "1",
      isShowPer: false,
      isShowPri: false,
      searchValue: "",
      userAccount: 0,
      isHidden: true,
      allHidden: false,
      title: "",
      activeStyle: "",
      backgroundStyle: "",
      annotation: "ADAM Price",
      selfStyle: "position:static;border: 0px;",
      options: [{ value: "1", label: "Address" }],
      homeBackground: "",
      resourceBackground: "",
      otherBackground: "",
      headerStyle: "",
      ismap: false,
      popupVisible: false,
    };
  },
  methods: {
    // handleSelect(key) {
    //   // console.log('key::::', key)
    //   // this.updateStyle(key);
    // },
    updateStyle(path) {
      this.activeIndex = path;
      //清空查询
      this.searchValue = "";

      switch (path) {
        case "home":
          this.classValue = "input-with-select width-big";
          this.isHidden = true;
          this.allHidden = false;
          this.backgroundImg = this.homeBackground;
          this.backgroundStyle = "height: 784px;width: 100%";
          this.isShowPri = false;
          this.headerStyle = "";
          this.ismap = false;
          break;
        case "map":
          this.ismap = true;
          break;
        case "account":
          break;
        case "leaderboard":
          break;
        default:
          this.classValue = "input-with-select width-big";
          this.isHidden = true;
          this.allHidden = false;
          // this.backgroundImg = require("@/img/home_background.png");
          this.backgroundImg = this.homeBackground;
          // this.activeStyle = "margin: 70px 0px 112px 0px";
          this.backgroundStyle = "height: 784px;width: 100%";
          // this.isShowPer = false
          this.isShowPri = false;

          this.headerStyle = "";
          this.ismap = false;
          console.log("default", path);
          break;
      }
    },
    handleIconClick() {
      console.log(
        "this.searchValue",
        this.searchValue || !this.searchValue.trim()
      );
      if (!this.searchValue) return;
      sessionStorage.setItem("searchValue", this.searchValue);
      //获取当前路由信息
      let path = this.$route.path;
      let params = {
        searchType: 1,
        searchValue: this.searchValue,
      };
      console.info("输入参数:" + JSON.stringify(params));
      //刷新对应的页面数据并跳转
      Utils.$emit("demo", params);

      this.updateStyle("/resource");
      if (path.toString().search("resource") == -1) {
        this.$router.push("/resource");
      }
    },
    handleMenuClick() {
      console.log("popupVisible:", this.popupVisible);
      this.popupVisible = !this.popupVisible;
    },
    handleMenuItemClick(e) {
        this.popupVisible = false;
      console.log(e.target.innerHTML);
      let path_name = e.target.innerHTML.toLowerCase().trim();
      console.log(path_name);
      switch (path_name) {
        case "map":
          this.ismap = true;
          break;
        default:
          this.ismap = false;
          break;
      }
      this.$router.push("/" + path_name);
      // if(path.toString().search("resource") == -1){
      //     this.$router.push('/resource');
      // }
    },
    getAdamPrice() {
      var price = 0;
      var that = this;
      // eslint-disable-next-line no-undef
      jquery.ajax({
        type: "GET",
         url: 'https://api.adamscan.io/api/getWirePledgeInfo',
        // url:'https://route-api.dodoex.io/dodoapi/getdodoroute?fromTokenAddress=0x59802AC95f2399c929a096171C1bee93C27daE90&fromTokenDecimals=8&toTokenAddress=0x55d398326f99059ff775485246999027b3197955&toTokenDecimals=18&fromAmount=100000000&slippage=3&userAddr=0xa8E7813150a988e7F20193983fA3017155F3C162&chainId=56&deadLine=1637306531&source=dodoV2AndMixWasm&apiKey=d61f2eb1ce8d',
        // url: "https://bsc.api.0x.org/swap/v1/price?sellToken=0xdde077002982956DF24E23E3f3743BA5e56929fe&buyToken=0x55d398326f99059ff775485246999027b3197955&sellAmount=10000000",
        // async: false,
        success: function (res) {
          price = res.data.adamPrice
          that.title = "$ " + that.showValue(price);
          // console.info(JSON.stringify(res))
        },
        error: function () {
          that.title = "-";
          // alert("网络错误")
        },
      });
      // this.title = "$ " + this.showValue(price)
    },
    showValue(value) {
      if (value == "-") {
        return "-";
      }
      // 保留素位小数
      return parseFloat(value).toFixed(4);
    },
  },
};
</script>

<style scoped>
.logo_content {
  flex: 1;
}
.center_logo {
  width: 46%;
  margin-left: 28%;
  max-height: 80px;
  object-fit: contain;
}

.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
}
.mint-popup {
  height: 100%;
  max-width: 300px;
}
.el-card {
  box-shadow: none;
  border: none;
  font-weight: bold;
}
.btn_menu_icon {
  width: 40px;
  height: 40px;
}
</style>
