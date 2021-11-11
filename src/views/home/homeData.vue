<template>
    <div class="graph_ranking_area">
        <div class="graph_area">
            <div class="top" style="margin: 26px 0px 0px 0px;">
                <div class="home_title_area">
                    <i class="public_label_icon home_label_shift"></i>
                    <span>Daily Pledge Trend</span>
                </div>
                <div class="day_button">
                    <div>
                        <el-button :autofocus="isDefault" @click="lineGraph(7)">7Day</el-button>
                    </div>
                    <div>
                        <el-button @click="lineGraph(30)">30Day</el-button>
                    </div>
                    <div>
                        <el-button @click="lineGraph(180)">180Day</el-button>
                    </div>
                </div>
            </div>
            <div :hidden="!isExist">
                <div ref="wrap" class="chartsStyle">
                    <div class="myChart" id="myChart" ref="charts"></div>
                </div>
            </div>
            <div :hidden="isExist" style="position: absolute;width: 40%;left: 30%;top: 50%">
                暂无数据
            </div>
        </div> 
    </div>
</template>

<script>
    import "@/css/main.css"
    import "@/css/base.css"
    import * as echarts from 'echarts'
    import { options } from '@/api/home/dataOption'
    import {
        getLinkGraph
    } from "@/api/home/api"
    export default {
        name: "dataData",
        mounted() {
            //两个echarts图表调用
            this.lineGraph(7);
        },
        data() {
            return {
                isDefault: true,
                headerStyle: {
                    'text-align':'center',
                    'font-size':'18px',
                    'color':'black',
                    'height':'80px',
                    'border':'0px'},
                cellStyle: {
                    'text-align':'center',
                    'color':'black',
                    'border':'0px',
                    'height':'60px'},
                tableData: [],
                xData: [],
                yData: [],
                seriesData: [],
                list: [],
                isExist: true,
            }
        },
        methods: {
            //左边线型图
            lineGraph(day,params) {
                //初始化数据---如果不加，数据会叠加
                this.initData();
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('myChart'));
                // 绘制基本图表
                myChart.setOption(options);
                if(params == undefined || params == ""){
                    params = {
                        day: day
                    }
                }
                //获取数据
                getLinkGraph(params).then(res => {
                    if(res != undefined && res.code != undefined && res.code == 200){
                        //显示加载动画
                        myChart.showLoading();
                        this.isExist = true
                        //分离出横轴数据
                        this.list = res.data
                        for (let i = 0; i < this.list.length; i++) {
                            let item = this.list[i];
                            this.xData.push(item.time)
                            this.yData.push(item.power)
                        }
                        this.seriesData = res.data;
                        if(this.seriesData.length <= 0){
                            this.isExist = false
                            return
                        }
                        setTimeout(()=>{  //为了让加载动画效果明显,这里加入了setTimeout,实现300ms延时
                            myChart.hideLoading(); //隐藏加载动画
                            myChart.setOption({
                                xAxis: {
                                    data: this.xData
                                },
                                series: [{
                                    data: this.yData
                                }]
                            })
                        }, 300 )
                    }else{
                        this.isExist = false
                    }

                }).catch(
                    () => {
                        this.isExist = false
                    }
                )
            },
            initData(){
                this.xData = [];
                this.yData = [];
                this.seriesData = [];
                this.list = [];
            },
        }
    }
</script>

<style scoped>

</style>
