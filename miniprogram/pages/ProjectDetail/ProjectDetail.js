// miniprogram/pages/index3/index3.js
import * as echarts from '../../component/ec-canvas/echarts';
function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  //这里复制了官方示例配置
  var option = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)'
  },
  legend: {
      orient: 'vertical',
      left:10,
      textStyle: { //图例文字的样
        fontSize: 7
    },
      data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
  },
  series: [
      {
          name: '访问来源',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
              show: false,
              position: 'center'
          },
          emphasis: {
              label: {
                  show: true,
                  fontSize: '30',
                  fontWeight: 'bold'
              }
          },
          labelLine: {
              show: false
          },
          data: [
              {value: 335, name: '直接访问'},
              {value: 310, name: '邮件营销'},
              {value: 234, name: '联盟广告'},
              {value: 135, name: '视频广告'},
              {value: 1548, name: '搜索引擎'}
          ]
      }
  ]

  };
  chart.setOption(option);
  return chart;
}
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    projectname:'234',
    listData:[
       {"code":"常驻供应商管理系统","text":"text1","type":"type1","type2":"type5"},
       {"code":"02","text":"text2","type":"type2","type2":"type5"},
       {"code":"03","text":"text3","type":"type3","type2":"type5"},
       {"code":"04","text":"text4","type":"type4","type2":"type5"},
       {"code":"05","text":"text5","type":"type5","type2":"type5"},
       {"code":"06","text":"text6","type":"type6","type2":"type5"},
       {"code":"07","text":"text7","type":"type7","type2":"type5"}
       ],
      ec:{
        onInit:initChart
      }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})