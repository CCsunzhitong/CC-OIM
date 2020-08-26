// miniprogram/pages/regist/regist.js
var util = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
    openid: "",    
    unionid:"",
    oid: "",
    fullName: "",
    telephone: "",
  },
  
 
  handleSubmit(e){
    wx.showToast({  
      title: '正在上传...',  
      icon: 'loading',  
      mask: true,  
      duration: 10000  
    });
    //console.log(this.data.openid);
  
    var page = this;
    var api = "/api/Employee/PostEmployee";
    var url = util.getUrl(api);   
    console.log("OpenIDOpenIDOpenIDOpenIDOpenIDOpenIDOpenID:" + page.data.openid);
    console.log("UnionIDOpenIDOpenIDOpenIDOpenIDOpenIDOpenID:" +  page.data.unionid);
   
    var theID = wx.getStorageSync('openid')
    var UnionId=wx.getStorageSync('unionid')
     console.log("EEEEE"+e.detail.value.fullName);
     console.log("EEEEE"+e.detail.value.telephone);
    wx.request({
      url: url,
      method: "POST",
      header: {
        "content-type": "application/json"//"x-www-form-urlencoded"//
      },
      data: {
         "openid":theID ,                      
         "name": e.detail.value.fullName,
         "phone": e.detail.value.telephone,
         "unionid":UnionId,
      },

      success (res) {
        console.log(res);
        if (res.errMsg == "request:ok") {
          console.log(res.data);
          if (res.data != "") {
            page.setData({
              fullName:res.data.fullName,
              telephone:res.data.phone,
              openid:res.data.openid,
              unionid:res.data.unionid,
            });
            wx.showToast({
              title: '操作成功！请联系管理员完成后台注册管理', // 标题
              icon: 'success',  // 图标类型，默认success
              duration: 2000  // 提示窗停留时间，默认1500ms
            })
            wx.showTabBar({
              animation: false,
            })
            page.onReady();
          }
          else {
            wx.showToast({
              title: '空数据！请联系管理员', // 标题
              icon: 'none',  // 图标类型，默认success
              duration: 2000  // 提示窗停留时间，默认1500ms
            })
          }
        }
        else {
          wx.showToast({
            title: '出错！请联系管理员', // 标题
            icon: 'none',  // 图标类型，默认success
            duration: 2000  // 提示窗停留时间，默认1500ms
          })
        }
      },
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:  function () {
    // app.globalData.openid=app.globalData.openid||(await wx.cloud.callFunction({name:'login'})).result.OPENID
    var that=this
   
    app.getAuthKey().then(function (res) { 
      that.setData({
        openid: wx.getStorageSync('openid'),
      
      })

  })
   
  },
  
  getUserInfo: function (e) {
    var that=this
    app.globalData.userInfo = e.detail.userInfo
  
    if (!app.globalData.unionid ) {
      wx.cloud.callFunction({
        name: 'login',
        data: { weRunData: wx.cloud.CloudID(e.detail.cloudID) }
      }).then(res => {
        console.log(res);
        wx.setStorageSync('unionid',res.result.event.weRunData.data.unionId);//存储openid  
        app.globalData.unionid = res.result.event.weRunData.data.unionId
        this.data.unionId=app.globalData.unionid
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that=this
    var api = "/api/Employee/GetEmployees";
    var openid=wx.getStorageSync('openid')
    var unionid=wx.getStorageSync('unionid');
    console.log("unionid"+openid);
     if(unionid!=""){
       wx.request({
          url: util.getUrl(api),
          method: "GET",  
          data:{
            unionid: unionid
          }  ,  
          success(res) {
            
           console.log("unionid"+res.data);
           if(res.data!= ""&&res!=""){
           that.setData({
            fullName: res.data[0].name,
            telephone:res.data[0].phone,
            staffId:res.data[0].applyStaffId,
            departmentName:res.data[0].department,
            openid:openid,
           }         
           )        
           
           console.log(that.data);
            app.globalData.username = that.data.fullName;
            app.globalData.phoneNumber = that.data.telephone;
            app.globalData.department = that.data.departmentName;
            app.globalData.staffid=that.data.staffId;
            console.log(app.globalData);
            if (that.data.fullName != "") {
              wx.showTabBar({
                animation: false,
              })
            }
          }
           else{
            // wx.hideLoading();
            console.log("res.data is empty")
           }
           wx.hideLoading();
         },
         fail(res) {
           console.log(res);
          // wx.hideLoading();
         }
       })}
       else if(openid!=""){
        wx.request({
          url: util.getUrl(api),
          method: "GET",  
          data:{
            openid: openid
          }  ,  
          success(res) {
           console.log("openod"+res.data);
           if(res.data!= ""&&res!=""){
           that.setData({
            fullName: res.data[0].name,
            telephone:res.data[0].phone,
            staffId:res.data[0].applyStaffId,
            departmentName:res.data[0].department,              
           }         
           )            
           }
           console.log(that.data);
           app.globalData.username = that.data.fullName;
           app.globalData.phoneNumber = that.data.telephone;
           app.globalData.department = that.data.departmentName;
           app.globalData.staffid=that.data.staffId;
           if (that.data.fullName != "") {
            wx.showTabBar({
              animation: false,
            })
          }
           else{
            
           }
           wx.hideLoading();
         },
         fail(res) {
        
          wx.hideLoading();
         }
       }) 
       }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   var that=this 

   if(that.data.fullName==""){
    wx.hideTabBar({
      animation: false,
    })
     wx.showLoading({
     title: 'Loading...',
       mask: true,
   })
  }
  
  setTimeout(()=>{
    that.onReady()
  },1500)
 
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
    var that=this
    //模拟加载    
    setTimeout(function()    
    {    
    // complete
    that.onLoad()
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