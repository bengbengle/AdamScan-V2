<template>
  <div>
    <div class="synthetic_data">
      <div class="data_area">
        <el-row class="first">
          <el-col :span="8">
            <div class="first_data">
              <el-tooltip
                class="item"
                effect="dark"
                content="Real-time price"
                placement="right"
              >
                <el-image class="data_icon" :src="excIcon"></el-image>
              </el-tooltip>
              <el-row class='first_data_icon'>
                ${{ showValue(adamPrice) }}
              </el-row>
              <el-row class="second_text"> ADAM price </el-row>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="first_data">
              <el-tooltip
                class="item"
                effect="dark"
                content="Real-time calculation of the network power"
                placement="right"
              >
                <el-image class="data_icon" :src="excIcon"></el-image>
              </el-tooltip>
              <el-row class='first_data_icon'>
                {{ showPowerValue(simpData.totalPower) + '' }} 
              </el-row>
              <el-row class="second_text"> Network Power </el-row>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="first_data">
              <el-tooltip
                class="item"
                effect="dark"
                content="Wallet address of network"
                placement="right"
              >
                <el-image class="data_icon" :src="excIcon"></el-image>
              </el-tooltip>
              <el-row class='first_data_icon'>
                {{ simpData.totalNode }}
              </el-row>
              <el-row class="second_text"> Wallet address of network </el-row>
            </div>
          </el-col>
        </el-row>
        <el-row class="second">
          <div class="second_area">
            <el-col :span="8">
              <el-row class='second_area_tile' >
                {{ showValue(simpData.profit_24) }} ADAM
              </el-row>
              <el-row class="second_text">
                24H output
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="Released ADAM of last 24 hours of network"
                  placement="right"
                >
                  <el-image class="data_icon" :src="excIcon"></el-image>
                </el-tooltip>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row class="second_area_tile">
                {{ simpData.totalAdam }} ADAM
              </el-row>
              <el-row class="second_text">
                Pledge amount
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="Total pledge amount of network"
                  placement="right"
                >
                  <el-image class="data_icon" :src="excIcon"></el-image>
                </el-tooltip>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row class="second_area_tile">
                {{ showValue(simpData.unitPrice) }} ADAM/TIB
              </el-row>
              <el-row class="second_text">
                Radio
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="The number of ADAM pledged per Terabyte"
                  placement="right"
                >
                  <el-image class="data_icon" :src="excIcon"></el-image>
                </el-tooltip>
              </el-row>
            </el-col>
          </div>
        </el-row>
        <HomeData ref="children"></HomeData>
          
        <!-- <div class="all_data_area"> -->
          <el-row>
            <div class="head_area table-header">
              <i class="public_label_icon home_label_shift"></i>
              <span>Collection list</span
              >
            </div>
          </el-row>
          <el-row>
            <PageList ref="pageListData"></PageList>
          </el-row>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import "@/css/base.css";
import "@/css/resource.css";
import jquery from "jquery";
import HomeData from "@/views/home/homeData";
import PageList from "@/views/list/pageList";
import { getAllPledgeInfo } from "@/api/home/api";
import excIcon from "@/img/icon/exc_point.png";
export default {
  name: "homeMain",
  components: {
    HomeData,
    PageList,
  },
  mounted() {
    this.getAllPledgeInfo();
    this.getAdamPrice();
    this.changeList();
  },
  data() {
    return {
      excIcon: excIcon,
      simpData: {
        totalPower: "", //全网总算力
        totalAdam: "", //全网质押量
        totalNode: "", //活跃节点数
        rate: "30", //当前算力比
        profit_24: "", //24小时产出量
        power_24: "", //24小时新增算力
        unitPrice: "30",
      },
      adamPrice: 0,
    };
  },
  methods: {
    changeList() {
      this.$refs.pageListData.updateList(true);
    },
    getAllPledgeInfo() {
      var params = {};
      getAllPledgeInfo(params)
        .then((res) => {
          if (res != undefined && res.code === 200) {
            this.simpData = res.data;
          } else {
            this.$message({
              message: res.message,
              type: "error",
            });
          }
          // console.info("是否正确1:" + (res.errorCode == 1000) + ";2:" + (res.errorCode == "1000"))
        })
        .catch(() => {});
    },
    getAdamPrice() {
      var price = 0;
      var that = this;
      jquery.ajax({
        type: "GET",
        url: 'https://route-api.dodoex.io/dodoapi/getdodoroute?fromTokenAddress=0x59802AC95f2399c929a096171C1bee93C27daE90&fromTokenDecimals=8&toTokenAddress=0x55d398326f99059ff775485246999027b3197955&toTokenDecimals=18&fromAmount=100000000&slippage=3&userAddr=0xa8E7813150a988e7F20193983fA3017155F3C162&chainId=56&deadLine=1637306531&source=dodoV2AndMixWasm&apiKey=d61f2eb1ce8d',
        // url: "https://bsc.api.0x.org/swap/v1/price?sellToken=0xdde077002982956DF24E23E3f3743BA5e56929fe&buyToken=0x55d398326f99059ff775485246999027b3197955&sellAmount=10000000",
        success: function (res) {
          price = res.data.resPricePerFromToken
          that.adamPrice = price;
        },
        error: function () {
          that.adamPrice = "-";
        },
      });
    },
    showValue(value) {
      if (value == "-") {
        return "-";
      }
      return parseFloat(value).toFixed(4);
    },
    showPowerValue(val) {
      // simpData.totalPower
      console.log("val::", val);
      try {
        if (!val) return 0 + "TIB";
        let val_num = parseInt(val);
        if (val_num > 1000) {
          return (val_num / 1000).toFixed(2) + "PIB";
        } else {
          return val_num + " TIB";
        }
      } catch (e) {
        return 0 + " TIB ";
      }
    },
  },
};
</script>

<style scoped>
.second_area .data_icon {
  margin-left: 10px;
}
.second_area_tile {
    padding-top: 20px;
    max-width: 120px;
    margin: 0px auto;
}
.first_data_icon {
  padding-top: 20px;
}
.table-header {
    display: flex;
    align-items: center;
    justify-content: start;
    flex-direction: row;
    margin-top: 10px;
}
.table-header i { 
  margin: 0px 10px;
}
.table-header span{
  font-weight: bold;
}
</style>
