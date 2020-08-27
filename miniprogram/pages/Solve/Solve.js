// miniprogram/pages/Solve/Solve.js
var util = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {
          id: 'form',
          name: '表单',
          open: false,
          pages: ['button', 'input', 'form', 'list', 'slideview', 'slider', 'uploader']
      },
      {
          id: 'layout',
          name: '基础组件',
          open: false,
          pages: ['article', 'badge', 'flex', 'footer', 'gallery', 'grid', 'icons', 'loading', 'loadmore', 'panel', 'preview', 'progress']
      },
      {
          id: 'feedback',
          name: '操作反馈',
          open: false,
          pages: ['actionsheet', 'dialog', 'half-screen-dialog', 'msg', 'picker', 'toast', 'top-tips']
      },
      {
          id: 'nav',
          name: '导航相关',
          open: false,
          pages: ['navigation-bar', 'tabbar']
      },
      {
          id: 'search',
          name: '搜索相关',
          open: false,
          pages: ['searchbar']
      }
  ],
    fullName:"",
    submitName:"",
    title:"", 
    projectName:"",     
    typeName:"",
    submitDate:"",
    updateDate:"", 
    approvedDate:"",
    description:"",
    analysis:"",
    question:[],
    questionIndex:null,
    questionName:"",
    updateDescription:"",
    action:[],
    actionLength:null
  },
  textChange(e){   
    var that=this;
    that.setData({
      updateDescription:e.detail.value,
    }) 
   console.log(that.data.description)
  },
  questionChange(e){
    var that=this;
    that.setData({
      questionIndex:e.detail.value,
    })
    //var title=that.data.question[that.data.questionIndex]
    var name=that.data.question[that.data.questionIndex].projectName;
    var user=that.data.question[that.data.questionIndex].userName;
    // var sumbitUser=that.data.question[that.data.questionIndex]
   // var type=that.data.question[that.data.questionIndex]
    var createTime=that.data.question[that.data.questionIndex].createTime;
   // var deadline=that.data.question[that.data.questionIndex].deadline;
   var description=that.data.question[that.data.questionIndex].issueDescription;
   var analysis= that.data.question[that.data.questionIndex].analysis;
    var questionComments=that.data.question[that.data.questionIndex].questionComments
 
    that.setData({
      projectName:name,
      title:name,
      fullName:user,
      //submitName:sumbitUser,
      // type:type,
      submitDate:createTime,
      // planDate:deadline,
      description:description,
      analysis:analysis,
      action:questionComments,
    })
    // var length=that.data.action.length
    // that.setData({actionLength:length})
    // console.log(length)
    console.log(that.data.action)
    that.onLoad()
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
      fullName:123,
      updateDate:util.formatTime(new Date()),
      
    })
    var that=this
    console.log("1111"+that.data.action)
    var action=that.data.action
  
    var api = "/api/QuestionEx";
    //page.showLoading();
  var unionid=wx.getStorageSync('unionid');
  if(unionid!=""){
  console.log("CCC"+unionid)
    wx.request({
       url: util.getUrl(api),
       method: "GET",  
       data:{
         unionid: unionid
       }  ,  
       success(res) {
        console.log("res.data"+res.data);
        if(res.data != ""){
        that.setData({         
         //userId:res.data[0].userNavigation,
         question:res.data,
        })        
        console.log("ccc"+JSON.stringify(that.data.question))
      
       }
        else{
         console.log("res.data is empty")
        }
        wx.hideLoading();
      },
      fail(res) {
        console.log(res);
       wx.hideLoading();
      }
    })
   }
   else{
     wx.showToast({
       title: '用户信息录入失败', // 标题
       icon: 'none',  // 图标类型，默认success
       duration: 2000  // 提示窗停留时间，默认1500ms
     })
   }
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