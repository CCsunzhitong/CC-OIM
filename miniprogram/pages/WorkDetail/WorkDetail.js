// miniprogram/pages/index 2/index2.js


Page({

  /**
   * 页面的初始数据
   */
  data: {
    Alist: [
      {
          id: 'form',
          name: '表单',
          open: false, 

      }
     
    ],
  },
  kindToggle1: function (e) {
    var id = e.currentTarget.id, list = this.data.Alist;
    for (var i = 0, len = list.length; i < len; ++i) {
        if (list[i].id == id) {
            list[i].open = !list[i].open
        } else {
           list[i].open = false
        }
    }
    this.setData({
        Alist: list
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  //   wx.cloud.getTempFileURL({
  //     fileList: ['cloud://accesssecurity-jzvid.6163-accesssecurity-jzvid-1302429146/asd1d1.xlsx'],
  //     success: res => {
  //       var data=res.fileList       
  //       var downrul=data[0].tempFileURL
  //       wx.setStorageSync('url', downrul);
  //     page.data.url=downrul
  //     },
  //     fail: console.error
  //   })
  //   wx.downloadFile({
  //     url: url1, //仅为示例，并非真实的资源
  //     success: function (res) {
  //       const tempFilePath = res.tempFilePath;
  //       console.log("111"+tempFilePath)
  //       // 保存文件
      
       
  //     },
  //     fail: function (err) {
  //       console.log('下载失败：', err);
  //     },
  
  // })
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