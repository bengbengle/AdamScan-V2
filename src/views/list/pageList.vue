<template>
    <div style="text-align: right">
        <el-table :data="allData"
                  :header-cell-style="headerStyle"
                  :cell-style="cellStyle"
                  @row-click="clickEvent"
                  class="data">
            <el-table-column min-width="50" style="text-align: center;" prop="rank" label="rank" show-overflow-tooltip>
            </el-table-column>
            <el-table-column min-width="200" style="text-align: center;" prop="address" label="address" show-overflow-tooltip>
            </el-table-column>
            <el-table-column min-width="100" prop="poolName" label="Label" show-overflow-tooltip> </el-table-column>
            <el-table-column v-if="show" min-width="200" prop="nodeNum" label="Number of child nodes"> </el-table-column>
            <el-table-column v-if="!show" min-width="100" prop="nodeNum" label="Child nodes"> </el-table-column>
            <el-table-column v-if="!show" min-width="150" prop="rate" label="Percentage"> </el-table-column>
            <el-table-column v-if="show" min-width="200" prop="totalPower" label="Current computing power"> </el-table-column>
            <el-table-column v-if="!show" min-width="200" prop="totalPower" label="Computing power"> </el-table-column>
            <el-table-column min-width="200" prop="rewardNum" label="Coin production(ADAM)" :formatter="formatterPre"> </el-table-column>
        </el-table>
        <el-pagination
                background
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
</template>

<script>
    import {
        getSortList
    } from "@/api/home/api";
    import Utils from "@/utils/js/transferStation";

    export default {
        name: "pageList",
        data(){
            return {
                show: false,
                total: 0,
                currentPage: 1,
                pageSize: 10,
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
                    'height':'80px',
                    'cursor': 'pointer',
                },
                allData: [],
            }
        },
        mounted() {
            //获取全网总算力
            this.getList()
            console.log('props', this.sort)
        },
        props: ['sort'],
        methods: {
            //点击跳转
            clickEvent(row){
                if(row != undefined && row.address != null){
                    let params = {
                        searchType: '1',
                        searchValue: row.address,
                    }
                    //刷新对应的页面数据并跳转
                    Utils.$emit('demo',params);
                    sessionStorage.setItem('searchValue', row.address),
                    this.$router.push('/resource');
                }
            },
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
                    address: address,
                    pool_name: name,
                    sort: this.sort && this.sort || 'power'
                };
                //由于push数据的原因，因此，每次查询前需要清空数据
                // this.allData = []
                getSortList(params).then(
                    res => {
                    console.log('res', res.data.total)

                        // console.log('res:::', res)
                        if(res != undefined && res.code === 200) {
                            res.data.records&&res.data.records.forEach((m, i)=> {
                                return m.rank = i + 1
                            })
                            this.allData = res.data.records
                            //手动计算
                            this.total = res.data.total
                        }else{
                            this.$message({
                                message: res.message,
                                type: 'error'
                            });
                        }
                    }
                )
            },
            // eslint-disable-next-line no-unused-vars
            formatterPre: function(row,column){
                return this.showValue(row.rewardNum)
            },
            showValue(value){
                if(value == "-"){
                    return "-";
                }
                // 保留素位小数
                return parseFloat(value).toFixed(4)
            },
            updateList(value){
                this.show = value
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
            queryList(address,name){
                this.getList(address,name)
            }
        }
    }
</script>

<style scoped>

</style>
