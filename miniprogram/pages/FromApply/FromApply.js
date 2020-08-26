// pages/index1/index1.js
var util = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  username:"123",
  files:[],
  project:"",
  projectIndex:null,
  projectName:"",
  staffId:"",
  department:"",
  description:"",
  submitTime:"",
  approvedDate:"",
  downloadUrl:"",
  cloudUrl:""
  },

  chooseImage: function (e) {
    var that = this;
    var maxCount=3-this.data.files.length;
    if(maxCount>0){
    wx.chooseImage({
        count:1,
        sizeType: ['original' ], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            that.setData({
                files: that.data.files.concat(res.tempFilePaths)
            });
            console.log("files"+that.data.files)
        }
    })
  }
},

previewImage: function(e){
    wx.previewImage({
        current: e.currentTarget.id, // 当前显示图片的http链接
        urls: this.data.files // 需要预览的图片http链接列表
    })
},
handleSubmit(e){
  console.log("kaishi");
  var that=this;
  var filepath=that.data.files;
  var cloud=util.formatDate(new Date());
  console.log(cloud);
 for(var i=0;i<filepath.length;i++){
   wx.cloud.uploadFile({
    cloudPath:cloud+i,
    filePath: filepath[i], // 文件路径
    success: res => {
      // get resource ID
      console.log(res.fileID)
      that.data.cloudUrl=res.fileID+","
      console.log("aaaa"+that.data.cloudUrl)
    },
    fail: err => {
     console.log("上传失败") // handle error
    }
  })

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
    this.setData({
      submitUser:app.globalData.username,
      submitTime:util.formatDate(new Date()),
      siteName:app.globalData.site,
      departmentName:app.globalData.department,
    })
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