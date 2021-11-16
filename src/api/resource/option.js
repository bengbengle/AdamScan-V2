export const pieOptions = {
    tooltip: {
        trigger: 'item',
        formatter: function (params) {
            console.log('params::', params);
            return '<div style="text-align: left">'
                + '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:'+ params.color + ';"></span>'
                + '<span style="color: #ffffff;text-align: left;">'
                + '<span style="color:#ffffff;">' + params.name + '</span>' + '<br/>&nbsp;&nbsp;&nbsp;&nbsp;' +  params.value
                + '</span>'
                + '</br>'
                + '</div>';
        }
    },
    color: [],
    legend: {
        show: false,
    },
    series: [{
            name: '',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: false,//是否默认显示中间文字  如果设置为true会有文字重叠的问题
                position: 'center',
                formatter: function (item) {

                    let unit = "";
                    if(item.name.search("power") != -1){
                        unit = "TIB"
                    }else{
                        unit = "ADAM"
                    }
                    return '{d|' + item.value + '} \n {b|' + item.name + '} \n {a|(' + unit + ')} {c|}';
                },  //显示圆环中间的文字和百分比
                rich: {
                    d: {
                        fontSize: 18,
                        lineHeight: 30,
                        fontWeight: "bold",
                        color: "#333333",
                        align: "center"
                    },
                    b: {
                        fontSize: 14,
                        color: "#666666",
                        align: "center"
                    },
                    a: {
                        fontSize: 14,
                        color: "gray",
                        align: "center",
                    },
                    c: {
                        backgroundColor: {
                            image: require('@/img/icon/exc_point.png'),
                        },
                    }
                }
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '24',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: []
        }
    ]
}

export const barOptions = {
    title: { text: '' },
    backgroundColor: '#ffffff',
    tooltip: {
        trigger: 'axis',
        // formatter: function (values) {
        //     return '收入：' + values[0].value + '</br>'
        //         + '月份：' + values[0].axisValue + '</br>'
        //         + '============'
        // }
    },
    xAxis: {
        type: 'category',
        data: []
    },
    yAxis: {
        type: 'value',
        minInterval: 1,                          //将刻度的最小间距设置为1
        // splitNumber: 3, // 横线数
    },
    series: [{
        data: [],
        type: 'line',
        smooth: true,
        lineStyle: { // 折线颜色
            normal: {
                color: '#FF6B22',
                width: 3
            }
        }
    }]
}