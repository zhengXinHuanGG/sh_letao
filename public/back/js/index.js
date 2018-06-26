/**
 * Created by Administrator on 2018/6/26.
 */

$(function(){
  // 基于准备好的dom，初始化echarts实例
  var bar = echarts.init(document.querySelector(".bar"));
//创建柱状图
// 指定图表的配置项和数据
  var option = {
    title: {
      text: '2017年注册人数'
    },
    tooltip: {},
    legend: {
      data:['人数']
    },
    xAxis: {
      data: ["1月","2月","3月","4月","5月","6月"]
    },
    yAxis: {},
    series: [{
      name: '人数',
      type: 'bar',
      data: [1000, 1500, 1800, 1200, 2500, 1800]
    }]
  };

// 使用刚指定的配置项和数据显示图表。
  bar.setOption(option);


// 基于准备好的dom，初始化echarts实例
  var pie = echarts.init(document.querySelector(".pie"));
//创建柱状图
// 指定图表的配置项和数据
  var option = {
    title : {
      text: '热门品牌销售',
      subtext: '2018年6月',
      x:'center'
    },
    tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['耐克','阿迪','新百伦','李宁','阿迪王']
    },
    series : [
      {
        name: '品牌',
        type: 'pie',
        radius : '75%',
        center: ['50%', '60%'],
        data:[
          {value:335, name:'耐克'},
          {value:310, name:'阿迪'},
          {value:234, name:'新百伦'},
          {value:135, name:'李宁'},
          {value:1548, name:'阿迪王'}
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 50,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

// 使用刚指定的配置项和数据显示图表。
  pie.setOption(option);




})



