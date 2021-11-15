<template>
  <div style="padding: 10px;">
    <div class=" total_data">
        <el-image class="level_second" :src="circleUrl"></el-image>
    <div class="content_address">
          <span class='address_short'>
            {{ address }}
          </span>
          <span @click="copyaddress(address)" class="btn_copy"></span>
    </div>
    <div style="width: 100%; height: 32px; text-align: center">
        <div class="content_address_icon">{{ poolName }}</div>
    </div>
    <div class="line_space">
        <el-row class="word_large">
        <el-col :span="8">
            {{ dataList.one }}
        </el-col>
        <el-col :span="8"> {{ dataList.two }} TIB </el-col>
        <el-col :span="8">
            {{ dataList.three }}
        </el-col>
        </el-row>
        <el-row class="word_small">
        <el-col :span="8">
            {{ pointData.one }}
            <el-tooltip
            class="item"
            effect="dark"
            content="Machine quantity of node"
            placement="right"
            >
            <el-image class="data_icon" :src="excIcon"></el-image>
            </el-tooltip>
        </el-col>
        <el-col :span="8">
            {{ pointData.two }}
            <el-tooltip
            class="item"
            effect="dark"
            content="Computing power of node"
            placement="right"
            >
            <el-image class="data_icon" :src="excIcon"></el-image>
            </el-tooltip>
        </el-col>
        <el-col :span="8">
            {{ pointData.three }}
            <el-tooltip
            class="item"
            effect="dark"
            content="Rank"
            placement="right"
            >
            <el-image class="data_icon" :src="excIcon"></el-image>
            </el-tooltip>
        </el-col>
        </el-row>
    </div>
    </div>
    <div class="charts_show_div">
      <div class="div_area">
         <div class="div_title">
          <i class="public_label_icon" style="margin: 10px 10px"></i>
          <span class="title_text">Asset Statistics</span>
        </div>
        <div></div>
      </div>
      <div
        id="pieChartLeft" ref="pieChartLeft"
      ></div>
      <div
        class="pie_bottom_div"
        v-for="item of pieChartLeftList"
        :key="item.id"
        :style="item.rate"
      >
        <div class="pie_bottom_data" :style="item.color"></div>
        <div class="pie_bottom_title">{{ item.name }}</div>

        <el-tooltip
          class="item"
          effect="dark"
          :content="item.desc"
          placement="right"
        >
          <el-image class="data_icon" :src="excIcon"></el-image>
        </el-tooltip>

        <div style="float: right">{{ showValue(item.value) }} ADAM</div>
      </div>
    </div>

    <div class="charts_show_div">
       <div class="div_area">
         <div class="div_title">
          <i class="public_label_icon" style="margin: 10px 10px"></i>
           <span class="title_text">Computing power statistics</span>
        </div>
        <div></div>
      </div> 
      <div
        id="pieChartRight"
        ref="pieChartRight" 
      ></div>
      <div
        class="pie_bottom_div"
        v-for="item of pieChartRightListData"
        :key="item.id"
        :style="item.rate"
      >
        <div class="pie_bottom_data" :style="item.color"></div>
        <div class="pie_bottom_title">{{ item.name }}</div>
        <el-tooltip
          class="item"
          effect="dark"
          :content="item.desc"
          placement="right"
        >
          <el-image class="data_icon" :src="excIcon"></el-image>
        </el-tooltip>
        <div style="float: right">{{ item.value }}</div>
      </div>
    </div>
    <div class="charts_show_div">
      <div class="div_area">
        <div class="div_title">
          <i class="public_label_icon" style="margin: 10px 10px"></i>
          <span class="title_text">Child node</span>
        </div>
        <div :hidden="!isExistL" class="resource_day_button">
          <div class="resource_button_div">
            <el-button :autofocus="isDefault" @click="barEcharts(7, 'left')"
              >7Day</el-button
            >
          </div>
          <div class="resource_button_div">
            <el-button @click="barEcharts(30, 'left')">30Day</el-button>
          </div>
          <div class="resource_button_div">
            <el-button @click="barEcharts(180, 'left')">180Day</el-button>
          </div>
        </div>
      </div>
      <div :hidden="!isExistL" id="barChartLeft" ref="barChartLeft"></div>
    </div>
    <div class="charts_show_div">
      <div class="div_area">
        <div class="div_title">
          <i class="public_label_icon" style="margin: 10px 10px"></i>
          <span class="title_text">Income</span>
        </div>
        <div :hidden="!isExistR" class="resource_day_button">
          <div class="resource_button_div">
            <el-button :autofocus="isDefaultTwo" @click="barEcharts(7, 'right')"
              >7Day</el-button
            >
          </div>
          <div class="resource_button_div">
            <el-button @click="barEcharts(30, 'right')">30Day</el-button>
          </div>
          <div class="resource_button_div">
            <el-button @click="barEcharts(180, 'right')">180Day</el-button>
          </div>
        </div>
      </div>
      <div :hidden="!isExistR" id="barChartRight" ref="barChartRight"></div>
    </div>

    <div class="all_data_area_resource">
      <el-row>
        <div class="head_area_two">
          <i class="public_label_icon" style="margin: 11px"></i>
          <span style="font-size: 18px; font-weight: bold"
            >Child node list</span
          >
        </div>
      </el-row>
      <el-row style="">
        <PageList
          @updateTableHeight="updateTableHeight"
          ref="pageListData"
        ></PageList>
      </el-row>
    </div>
  </div>
</template>

<script defer="true">
import "@/css/resource.css";
import "@/css/main.css";
import "@/css/base.css";
import * as echarts from "echarts";
import circleUrl from "@/img/icon/resource_add.png";
import excIcon from "@/img/icon/exc_point.png";
import { pieOptions, barOptions } from "@/api/resource/option";
import PageList from "@/views/list/pageNodeList";
import Utils from "@/utils/js/transferStation";
import { getNodeLinkGraph, getProfitLinkGraph, getAccDetailInfo } from "@/api/resource/api";
import { copy } from 'iclipboard';
import { Message } from "element-ui";

export default {
  name: "resourceMain",
  components: {
    PageList,
  },
  mounted() {
    this.pieEcharts();
    this.barEcharts();
    let that = this;
    Utils.$on("demo", function (params) {
      //增加属性判断是否激活
      this.isActiveMethod = true;
      that.$nextTick(function () {
        //调用需要执行的方法
        that.getParams(params);
      });
    });
    if (!this.isActiveMethod) {
      var params = {
        searchType: 1,  
        searchValue: sessionStorage.getItem("searchValue"),
      };
      this.$nextTick(function () {
        this.getParams(params);
      });
    }
  },
  data() {
    return {
      total: 10,
      isDefault: true,
      isDefaultTwo: true,
      isActiveMethod: false,
      isExistL: true,
      isExistR: true,
      query: {
        pageNum: 1,
        pageSize: 10,
      },
      circleUrl: circleUrl,
      excIcon: excIcon,
      address: "No Data",
      cid: "",
      poolName: "No Data",
      input: "",
      pointData: {
        one: "Child Node",
        two: "Power",
        three: "Rank",
        four: "Creation time",
      },
      dataList: {
        one: "-",
        two: "-",
        three: "-",
        four: "-",
      },
      pieChart: {
        color: ["#001594", "#FF6B22", "#88CD1B"],
      },
      pieChartLeftList: [],
      pieChartRightList: [],
      pieChartRightListData: [
        {
          id: 0,
          color: "background: #001594",
          name: "Total power",
          value: 0,
          rate: "top: 79%",
          desc: "Released ADAM amount",
        },
        {
          id: 1,
          color: "background: #FF6B22",
          name: "Power rate",
          value: "0%",
          rate: "top: 86%",
          desc: "",
        },
        {
          id: 2,
          color: "background: #FF6B22",
          name: "Power feed",
          value: 0,
          rate: "top: 93%",
          desc: "",
        },
      ],
      seriesData: [],
      xDataLF: [],
      xDataRG: [],
      yDataLF: [],
      yDataRG: [],
    };
  },
  methods: {
    getParams(params) {
      //查询首页数据
      if (params.searchType == "1") {
        this.$refs.pageListData.queryPageList(params.searchValue, "");
      } else {
        this.$refs.pageListData.queryPageList("", params.searchValue);
      }
      this.$nextTick(function () {
        //开始更新页面数据
        this.initPageData(params);
      });
    },
    copyaddress(addr) {
      if(copy(addr)) {
          Message({
            message: "Copied",
            type: "success",
            duration: 2 * 1000
          });
      } else {
          // alert('复制失败')
      }
    },
    //更新页面数据
    initPageData(params) {
      console.log("params::", params);
      this.isActiveMethod = false;
      if (!params) return;
      //首先是修改最上方数据
      if (params.searchType == 1) {
        this.address = params.searchValue;
      } else if (params.searchType == 2) {
        this.getSortList();
      }

      //更新线状图信息
      this.barEcharts();
      //更新饼图信息
      this.pieEcharts();
      //获取顶部信息
      this.headerData();
    },
    updateTableHeight(value) {
      console.log("value::", value); 
    }, 
    handleIconClick() {
      //传递搜索参数
      this.$refs.pageListData.queryPageList(
        this.address == "No Data" ? "" : this.address,
        this.input
      );
    },
    headerData() {
      var param = {
        address: this.address,
      };
      getAccDetailInfo(param)
        .then((res) => {
          var data = (res && res.data.length && res.data[0]) || null;
          if (!data) return;
          if (res != undefined && res.code == 200) {
            this.poolName = (data && data.poolName) || "-";
            //当前子节点数
            this.dataList.one = (data && data.count) || "-";
            //当前算力
            this.dataList.two = (data && data.power) || "-";
            //排名
            this.dataList.three = (data && data.sort) || "-";
            //根据参数更新饼状图信息
            this.pieEcharts(data);
          } else {
            this.address = "No Data";
            this.poolName = "No Data";
            this.dataList = {
              one: "-",
              two: "-",
              three: "-",
              four: "-",
            };
            this.initBarData();
          }
        })
        .catch();
    },
    pieEcharts(params) {
      // 基于准备好的dom，初始化echarts实例
      let pieLeft = echarts.init(document.getElementById("pieChartLeft"));
      let pieRight = echarts.init(document.getElementById("pieChartRight"));
      // 绘制基本图表
      pieLeft.setOption(pieOptions);
      pieRight.setOption(pieOptions);

      //显示加载动画
      pieLeft.showLoading();
      pieRight.showLoading();

      //初始化饼图数据
      this.initBarData(params);

      //获取数据
      setTimeout(() => {
        //为了让加载动画效果明显,这里加入了setTimeout,实现300ms延时
        pieLeft.hideLoading(); //隐藏加载动画
        pieRight.hideLoading();
        pieLeft.setOption({
          color: this.pieChart.color,
          series: [
            {
              data: this.pieChartLeftList,
            },
          ],
        });
        pieRight.setOption({
          color: this.pieChart.color,
          series: [
            {
              data: this.pieChartRightList,
            },
          ],
        });
      }, 300);
    },
    barEcharts(day, type) {
      if (day == undefined || day == "") {
        day = "7";
      } else {
        day += "";
      }
      var params = {
        address: this.address,
        day: day,
      };
      // 基于准备好的dom，初始化echarts实例
      if (type == undefined || type == null || type == "left") {
        this.initBarDataLF();
        let chartLeft = echarts.init(document.getElementById("barChartLeft"));
        // 绘制基本图表
        chartLeft.setOption(barOptions);
        if (this.address != "No Data" && this.address != "") {
          //获取数据
          getNodeLinkGraph(params).then((res) => {
            if (res != undefined && res.data != null && res.code == 200) {
              //显示加载动画
              chartLeft.showLoading();
              //分离出横轴数据
              this.isExistL = true;
              this.list = res.data;
              for (let i = 0; i < this.list.length; i++) {
                let item = this.list[i];
                this.xDataLF.push(item.time);
                this.yDataLF.push(item.count);
              }
              //如果y轴小于1
              setTimeout(() => {
                //为了让加载动画效果明显,这里加入了setTimeout,实现300ms延时
                chartLeft.hideLoading(); //隐藏加载动画
                chartLeft.setOption({
                  xAxis: {
                    data: this.xDataLF,
                  },
                  series: [
                    {
                      data: this.yDataLF,
                    },
                  ],
                });
              }, 300);
            } else {
              this.isExistL = false;
            }
          });
        } else {
          this.isExistL = false;
          this.initBarData();
        }
      }
      if (type == undefined || type == null || type == "right") {
        this.initBarDataRG();
        let chartRight = echarts.init(document.getElementById("barChartRight"));
        chartRight.setOption(barOptions);
        if (this.address != "No Data" && this.address != "") {
          //获取数据
          getProfitLinkGraph(params).then((res) => {
            if (res != undefined && res.code == 200) {
              chartRight.showLoading();
              //分离出横轴数据
              this.isExistR = true;
              this.list = res.data;
              for (let i = 0; i < this.list.length; i++) {
                let item = this.list[i];
                this.xDataRG.push(item.time);
                this.yDataRG.push(item.profit);
              }
              setTimeout(() => {
                //为了让加载动画效果明显,这里加入了setTimeout,实现300ms延时
                chartRight.hideLoading(); //隐藏加载动画
                chartRight.setOption({
                  xAxis: {
                    data: this.xDataRG,
                  },
                  series: [
                    {
                      data: this.yDataRG,
                    },
                  ],
                });
              }, 300);
            } else {
              this.isExistR = false;
            }
          });
        } else {
          this.isExistR = false;
          this.initBarData();
        }
      }
    },
    showValue: function (value) {
      if (value == "-") {
        return "-";
      }
      // 保留素位小数
      return parseFloat(value).toFixed(4);
    },
    initBarDataLF() {
      this.xDataLF = [];
      this.yDataLF = [];
    },
    initBarDataRG() {
      this.xDataRG = [];
      this.yDataRG = [];
    },
    initBarData(params) {
      //模拟拼接不同数据
      this.pieChartLeftList = [
        {
          id: 0,
          color: "background: #001594",
          name: "Available Balance",
          value:
            params == undefined
              ? 0
              : this.showValue(
                  params.release == undefined || params.release == null
                    ? 0
                    : params.release
                ),
          rate: "top: 79%",
          desc: "Released ADAM amount",
        },
        {
          id: 1,
          color: "background: #FF6B22",
          name: "Pledge amount",
          value:
            params == undefined
              ? 0
              : this.showValue(
                  params.adam == undefined || params.adam == null
                    ? 0
                    : params.adam
                ),
          rate: "top: 86%",
          desc: "Total pledge amount of node",
        },
        {
          id: 2,
          color: "background: #88CD1B",
          name: "Currency lock-up",
          value:
            params == undefined
              ? 0
              : this.showValue(
                  params.lock == undefined || params.lock == null
                    ? 0
                    : params.lock
                ),
          rate: "top: 93%",
          desc: "Locked-up ADAM amount",
        },
      ];
      this.pieChartRightList = [
        {
          id: 0,
          color: "background: #001594",
          name: "Current power",
          value:
            params == undefined
              ? 0
              : this.showValue(
                  params.power == undefined || params.power == null
                    ? 0
                    : params.power
                ),
          rate: "top: 79%",
          desc: "Locked-up ADAM amount",
        },
        {
          id: 1,
          color: "background: #FF6B22",
          name: "Total power",
          value:
            params == undefined
              ? 0
              : this.showValue(
                  params.totalPower == undefined || params.totalPower == null
                    ? 0
                    : params.totalPower
                ),
          rate: "top: 86%",
          desc: "Locked-up ADAM amount",
        },
      ];
      //由于右边饼图与下方数据不相同，因此需增加参数显示
      this.seriesData = [
        { value: 0, name: "Available Balance" },
        { value: 0, name: "Pledge amount" },
        { value: 0, name: "Currency lock-up" },
      ];
      this.pieChartRightListData = [
        {
          id: 0,
          color: "background: #001594",
          name: "Total power",
          value: params == undefined ? 0 : this.showValue(params.totalPower),
          rate: "top: 79%",
          desc: "Total power of network",
        },
        {
          id: 1,
          color: "background: #FF6B22",
          name: "Power rate",
          value: params == undefined ? "0%" : params.rate + "%",
          rate: "top: 86%",
          desc: "Node power/ Network power",
        },
        {
          id: 2,
          color: "background: #FF6B22",
          name: "Power feed",
          value: params == undefined ? 0 : params.proCount,
          rate: "top: 93%",
          desc: "Total price feeds times",
        },
      ];
    },
  },
};
</script>

<style scoped>
.level_second .el-image__inner {
  width: 80px;
}
.el-col-8 {
    display: flex;
    justify-content: center;
    align-items: center;
}
.el-col-8 .el-image {
    margin-left: 5px;
}
.btn_copy {
  display: block;
  background: url("~@/img/copy.png");
  background-size: 100%;
  margin-right: 5px;
  width: 20px;
  height: 20px;
}
.address_short {
  max-width: calc(100% - 125px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
}
</style>
