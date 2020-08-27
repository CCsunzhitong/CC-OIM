// miniprogram/pages/Submit/Submit.js
var util = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  fullName:"",
  title:"",
  project:[],
  projectIndex:null,
  projectName:"",
  projectId:"",
  type:[],
  typeIndex:null,
  typeName:"",
  typeId:"",
  submitDate:"",
  approvedDate:"",
  description:"",
  analysis:""
  },
  handleSubmit(e){
    wx.showToast({  
      title: '正在上传...',  
      icon: 'loading',  
      mask: true,  
      duration: 10000  
    });
  console.log("111"+JSON.stringify(e.detail.value))

    
    var page = this;
    var api = "/api/QuestionEx";
    var url = util.getUrl(api);  
    wx.request({
      url: url,
      method: "POST",
      header: {
        "content-type": "application/json"//"x-www-form-urlencoded"//
      },
      data:{
        "oid":util.uuid(),
        "createTime": e.detail.value.submitDate,
        "issueType": page.data.typeId,
        "project": page.data.projectId,
        "issueDescription": page.data.description,
        "analysis": page.data.analysis,
        "proposer" : "74439635-f344-41f9-a6b0-49e157bf8ab9",
        "assignedTo": "3131aa40-e9f1-44f6-a2f7-4b5ff7c09946" 

      },

      success (res) {
        
        console.log(res);
        // if (res.statusCode == 200) {
        //   console.log(res.data);
        //   if (res.data != "") {
        //     wx.showToast({
        //       title: '新增数据'+res.data.length, // 标题
        //       icon: 'success',  // 图标类型，默认success
        //       duration: 3000  // 提示窗停留时间，默认1500ms
        //     })
        //     wx.showTabBar({
        //       animation: false,
        //     })
        //     wx.switchTab({
        //       url: '../WorkDetail/WorkDetail',
        //     });
        //     page.clear();
        //   }
        //   else {
        //     wx.showToast({
        //       title: '没有数据更新，检查是否有输入', // 标题
        //       icon: 'none',  // 图标类型，默认success
        //       duration: 2000  // 提示窗停留时间，默认1500ms
        //     })
        //   }
        // }
        // else {
        //   wx.showToast({
        //     title: '提交出错！请联系管理员', // 标题
        //     icon: 'none',  // 图标类型，默认success
        //     duration: 2000  // 提示窗停留时间，默认1500ms
        //   })
        // }
      },
    })
  },
  datePickerBindchange:function(e){
    this.setData({
      planDate:e.detail.value,
    })
  },
  textChange(e){   
    var that=this;
    that.setData({
      description:e.detail.value,
    }) 
   console.log(that.data.description)
  },
  textChange2(e){   
    var that=this;
    that.setData({
      analysis:e.detail.value,
    }) 
    console.log(that.data.analysis)
  },
  
  //选择项目事件
  projectChange(e){
    var that=this;
    that.setData({
      projectIndex:e.detail.value,
    })
    var name=that.data.project[that.data.projectIndex].name;
    var id=that.data.project[that.data.projectIndex].projectNavigation;
    that.setData({projectName:name})
    that.setData({projectId:id})
    console.log(that.data.projectId)
  
  },
  //选择问题类型
  typeChange(e){
    var that=this;
    that.setData({
      typeIndex:e.detail.value,
    })
    var name=that.data.type[that.data.typeIndex].name;
    var id=that.data.type[that.data.typeIndex].oid;
    that.setData({typeName:name})
    that.setData({typeId:id})
    console.log(that.data.typeId)
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    if (that.data.fullName ==""||that.data.project=="") {
      wx.showLoading({
        title: 'Loading...',
        mask: true,
      })
    }
   
    var api = "/api/ProjectEx";
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
          project:res.data,
         })        
         console.log("ccc"+JSON.stringify(that.data))
       
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
    var api2 = "/api/IssueTypeEx";
    //page.showLoading();

  if(unionid!=""){
  console.log("CCC"+unionid)
    wx.request({
       url: util.getUrl(api2),
       method: "GET",  
       success(res) {
        console.log("res.data"+res.data);
        if(res.data != ""){
        that.setData({                
         type:res.data,
        })        
        console.log("ccc"+JSON.stringify(that.data))
      
       }
        else{
         console.log("res.data is empty")
        }
      
      },
   
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
      submitDate:util.formatTime(new Date()),
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
    wx.showNavigationBarLoading() //在标题栏中显示加载
    //模拟加载  
    setTimeout(function()
    {
    // complete
    wx.hideNavigationBarLoading() //完成停止加载 
    wx.stopPullDownRefresh() //停止下拉刷新
    },1500);
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