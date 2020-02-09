import JSON from './jinzhongshi.json';
export const yqfkyqdtJs = {
    checkStrOfZero: function (str) {
        if (str == '' || str == null || str == undefined) {
            str = 0;
        }
        return str;
    },

    //第一个统计图
    showjmrjsrEchars1: function (echarts, value, data1) {
        var data = [];
        if (data1 != null && data1.length > 0) {
            data1.forEach(element => {
                var map = {};
                map.name = element.typecode;
                map.value = element.num;
                data.push(map);
            });
        }
        const myCharts = echarts.init(value);
        echarts.registerMap('晋中', JSON);
        var option = {
            tooltip: {
                show: true,
                formatter: function (params) {
                    return '确诊人数：' + params.name + ' : ' + params.value;
                }
            },
            visualMap: {
                type: 'piecewise',
                text: ['确诊病例:'],
                pieces: [{
                    gt: 50,
                    color: '#860909'
                },
                {
                    min: 20,
                    max: 49,
                    color: '#d04444'
                },
                {
                    min: 10,
                    max: 19,
                    color: '#fa6a6a'
                },
                {
                    min: 4,
                    max: 9,
                    color: '#ffb1b1'
                },
                {
                    min: 1,
                    max: 3,
                    color: '#ffe5e5'
                },
                {
                    value: 0,
                    color: '#e6e6e6',
                }
                ],
                itemGap: 10,
                orient: 'horizontal',
                itemWidth: 32,
                itemHeight: 8,
                showLabel: false,
                seriesIndex: [0],
                textStyle: {
                    color: '#7B93A7',
                    fontSize: 13,
                },
                bottom: '0%',
                left: "0%",
            },
            geo: {
                map: '晋中',
                zoom: 1.2,
                label: {
                    normal: {
                        show: true, // 是否显示对应地名
                        textStyle: {
                            color: '#141414',
                        }
                    }
                },
                itemStyle: { //地图区域的多边形 图形样式
                    color: '#B4D7F1',
                    normal: { //是图形在默认状态下的样式
                        borderColor: '#1f8bfc',
                        areaColor: '#ffffff',
                        borderWidth: 1,
                    }
                },
            },
            series: [{
                map: '晋中',
                zoom: 1.2,
                type: 'map',
                roam: false,
                label: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        show: true
                    }
                },
                itemStyle: { //地图区域的多边形 图形样式
                    color: '#B4D7F1',
                    normal: { //是图形在默认状态下的样式
                        borderColor: '#1f8bfc',
                        areaColor: '#ffffff',
                        borderWidth: 1,
                    }
                },
                data: data,
            }]
        }
        myCharts.setOption(option);
    },
    showjmrjsrEchars2: function (echarts, value, data1) {
        var data_qz = [];
        var data_sw = [];
        var data_zy = [];
        var date = [];
        data1.sort(function (a, b) {
            if (a.date < b.date) {
                return -1;
            } else if (a.date == b.date) {
                return 0;
            } else {
                return 1;
            }
        });
        if (data1 != null && data1.length > 0) {
            data1.forEach(element => {
                data_sw.push(element.die != null ? element.die : 0);
                data_zy.push(element.cure != null ? element.cure : 0);
                data_qz.push(element.diagonsis != null ? element.diagonsis : 0);
                date.push(element.date != null ? element.date : 0);
            });
        }
        const myCharts = echarts.init(value);
        var option = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                right: 0,
                top: 10,
                data: ['确诊', '死亡', '治愈']
            },

            grid: {
                left: '3%',
                right: '7%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: date
                }
            ],
            yAxis: [
                {
                    name: '确诊(人数)',
                    type: 'value',
                    position: 'left',
                    splitLine: {
                        show: false
                    },
                },
                {
                    name: '死亡/治愈(人数)',
                    type: 'value',
                    position: 'right',
                    splitLine: {
                        show: false
                    },
                }
            ],
            series: [
                {
                    name: '确诊',
                    type: 'line',
                    yAxisIndex: 0,
                    data: data_qz
                },
                {
                    name: '死亡',
                    type: 'line',
                    yAxisIndex: 1,
                    data: data_sw
                },
                {
                    name: '治愈',
                    type: 'line',
                    yAxisIndex: 1,
                    data: data_zy
                },
            ]
        };
        myCharts.setOption(option);
    }
}