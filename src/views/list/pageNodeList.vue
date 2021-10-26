<template>
    <div style="text-align: right">
        <el-table :data="allData"
                  :header-cell-style="headerStyle"
                  :cell-style="cellStyle"
                  class="data">
            <el-table-column min-width="200" style="text-align: center;" prop="address" label="address" show-overflow-tooltip> </el-table-column>
            <el-table-column min-width="100" prop="machineCode" label="Label" show-overflow-tooltip> </el-table-column>
            <el-table-column min-width="200" prop="count" label="Number of child nodes"> </el-table-column>
            <el-table-column min-width="200" prop="power" label="Current computing power"> </el-table-column>
            <el-table-column min-width="200" prop="profit" label="Coin production(ADAM)" :formatter="formatterPre"> </el-table-column>
        </el-table>
        <el-pagination
                background
                hide-on-single-page
                style="padding-bottom: 30px;padding-right: 10px;"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[5, 10, 20, 40]"
                :page-size="pageSize"
                layout="prev, pager, next"
                :total="total">
        </el-pagination>
    </div>
    <!--                            <pagination v-show="total>0" :total="total" :page.sync="query.currentPage" :limit.sync="query.pageSize" @pagination="getList" />-->
</template>

<script>
    import {
        getMinerSortList
    } from "@/api/home/api";

    export default {
        name: "pageList",
        data(){
            return {
                show: false,
                total: 0,
                currentPage: 1,
                pageSize: 10,
                totalPledge: 0,
                headerStyle: {
                    'text-align':'center',
                    'font-size':'18px',
                    'color':'#999999',
                    'height':'40px',
                    'line-height': '50px',
                    'border':'0px'},
                cellStyle: {
                    'text-align':'center',
                    'color':'black',
                    'border':'0px',
                    'height':'80px'},
                allData: [],
            }
        },
        mounted() {
            //获取全网总算力
            this.getList()
        },
        methods: {
            handleSizeChange: function (size) {
                this.pageSize = size;
                this.getList()
                this.$emit("updateTableHeight",this.pageSize)
            },
            handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
                this.getList()
            },
            getList(address,name){
                var params = {
                    currentPage: this.currentPage.toString(),
                    pageSize: this.pageSize.toString(),
                    address: address == undefined ? "" : address,
                    c_id: name == undefined ? "" : name,
                };
                //由于push数据的原因，因此，每次查询前需要清空数据
                // this.allData = []
                getMinerSortList(params).then(
                    res => {
                        if(res != undefined && res.code === 200) {
                            this.allData = res.data.records
                            // //手动计算
                            this.total = res.total
                        }else{
                            this.total = 0
                        }
                    }
                ).catch(()=>{

                })
            },
            // eslint-disable-next-line no-unused-vars
            formatterPre: function(row,column){
                return this.showValue(row.profit)
            },
            showValue(value){
                if(value == "-"){
                    return "-";
                }
                // 保留素位小数
                return parseFloat(value).toFixed(4)
            },
            updateTableStyle(head,cell){
                this.headerStyle = head
                this.cellStyle = cell
            },
            getAddress(flag){
                if(flag != undefined && flag != "" && flag){
                    return this.allData[0].address;
                }
                return "No Data";
            },
            queryPageList(address,name){
                this.getList(address,name)
            }
        }
    }
</script>

<style scoped>

</style>
