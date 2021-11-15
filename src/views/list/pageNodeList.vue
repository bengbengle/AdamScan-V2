<template>
  <div style="text-align: right">
    <!-- <el-table :data="allData"
                  :header-cell-style="headerStyle"
                  :cell-style="cellStyle"
                  class="data">
            <el-table-column min-width="50" style="text-align: center;" prop="rank" label="rank" show-overflow-tooltip>
            </el-table-column>
            <el-table-column min-width="200" style="text-align: center;" prop="address" label="address" show-overflow-tooltip> </el-table-column>
            <el-table-column min-width="100" prop="machineCode" label="Label" show-overflow-tooltip> </el-table-column>
            <el-table-column min-width="200" prop="count" label="Number of child nodes"> </el-table-column>
            <el-table-column min-width="200" prop="power" label="Current computing power"> </el-table-column>
            <el-table-column min-width="200" prop="profit" label="Coin production(ADAM)" :formatter="formatterPre"> </el-table-column>
        </el-table> -->
    <div :key="idx" v-for="(m, idx) in show_list" class="adam_container">
      <div class="adam_container_model">
        <div
          :key="idx + '_' + idx2"
          v-for="(item, idx2) in m"
          class="adam_filed"
        >
          <div class="adam_filed_key">
            {{ idx2 }}
          </div>
          <div class="adam_filed_value">
            {{ item }}
          </div>
        </div>
      </div>
    </div>
    <el-pagination
      background
      hide-on-single-page
      style="padding-bottom: 30px; padding-right: 10px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 40]"
      :page-size="pageSize"
      layout="prev, pager, next"
      :total="total"
    >
    </el-pagination>
  </div>
  <!--                            <pagination v-show="total>0" :total="total" :page.sync="query.currentPage" :limit.sync="query.pageSize" @pagination="getList" />-->
</template>

<script>
import { getMinerSortList } from "@/api/home/api";

export default {
  name: "pageList",
  data() {
    return {
      show: false,
      total: 0,
      currentPage: 1,
      pageSize: 10,
      totalPledge: 0,
      headerStyle: {
        "text-align": "center",
        "font-size": "18px",
        color: "#999999",
        height: "40px",
        "line-height": "50px",
        border: "0px",
      },
      cellStyle: {
        "text-align": "center",
        color: "black",
        border: "0px",
        height: "80px",
      },
      allData: [],
      show_list: [],
      pAddress: "",
    };
  },
  mounted() {
    //获取全网总算力
    this.getList();
  },
  methods: {
    handleSizeChange: function (size) {
      this.pageSize = size;
      this.getList();
      this.$emit("updateTableHeight", this.pageSize);
    },
    //  clickModelHandler: function (idx) {
    //     let row = this.allData[idx];
    //     if (row != undefined && row.address != null) {
    //         let params = {
    //         searchType: "1",
    //         searchValue: row.address,
    //         };
    //         // 刷新对应的页面数据并跳转
    //         Utils.$emit("demo", params);
    //         sessionStorage.setItem("searchValue", row.address),
    //         this.$router.push("/resource");
    //     }
    //     },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
      if (this.pAddress) {
        this.getList(this.pAddress, "");
      } else {
        this.getList();
      }
    },
    async getList(address, name) {
      this.pAddress = address;
      var params = {
        currentPage: this.currentPage.toString(),
        pageSize: this.pageSize.toString(),
        address: address == undefined ? "" : address,
        c_id: name == undefined ? "" : name,
      };
      //由于 push 数据的原因，因此，每次查询前需要清空数据
      // this.allData = []
      let res = await getMinerSortList(params);
      if (res != undefined && res.code === 200) {
        res.data.records &&
          res.data.records.forEach((m, i) => {
            m.rank = i + 1;
            m.s_address = m.address;
            return m;
          });
        this.allData = res.data.records;

        this.total = res.data.total;

        this.show_list = res.data.records.map((m, i) => {
          m.rank = i + 1;
          m.s_address = m.address;
          return {
            'Rank': m.rank,
            'Address': m.s_address && m.s_address.substring(0, 4) + "..." + m.s_address.substr(38, 6),
            'Label': m.poolName,
            "Current Computing Power": m.power,
            "Number of child nodes": m.count,
            "Coin Production（ADAM）":
              m.profit && parseFloat(m.profit).toFixed(2),
          };
        });
      } else {
        this.total = 0;
      }
    },
    // eslint-disable-next-line no-unused-vars
    formatterPre: function (row, column) {
      return this.showValue(row.profit);
    },
    showValue(value) {
      if (value == "-") {
        return "-";
      }
      // 保留素位小数
      return parseFloat(value).toFixed(4);
    },
    updateTableStyle(head, cell) {
      this.headerStyle = head;
      this.cellStyle = cell;
    },
    getAddress(flag) {
      if (flag != undefined && flag != "" && flag) {
        return this.allData[0].address;
      }
      return "No Data";
    },
    queryPageList(address, name) {
      this.getList(address, name);
    },
  },
};
</script>

<style scoped>
.adam_container {
  background: #ffffff;
  border-radius: 20px;
  margin: 15px 10px;
  box-shadow: 8px 8px 1px #93939317;
}

.adam_container_model {
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
.adam_filed {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 25px;
  margin: 2px;
  align-items: center;
}
.adam_filed_key {
  font-size: 12px;
  font-family: Alibaba PuHuiTi;
  font-weight: 500;
  color: #999999;
}
.adam_filed_value {
  font-size: 16px;
  font-family: Alibaba PuHuiTi;
  font-weight: 500;
  color: #000000;
}
</style>
