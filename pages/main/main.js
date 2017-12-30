//index.js
//主界面实现
//获取应用实例
const app = getApp();
var mottos = new Array();
mottos[0] = "Beautiful is better than ugly.-Tim Peters";
mottos[1] = "Explicit is better than implicit.-Tim Peters";
mottos[2] = "Simple is better than complex.-Tim Peters";
mottos[3] = "Complex is better than complicated.-Tim Peters";
mottos[4] = "Flat is better than nested.-Tim Peters";
mottos[5] = "Sparse is better than dense.-Tim Peters";
mottos[6] = "Readability counts.-Tim Peters";
mottos[7] = "Special cases aren't special enough to break the rules.-Tim Peters";
mottos[8] = "Although practicality beats purity.-Tim Peters";
mottos[9] = "Errors should never pass silently.-Tim Peters";
mottos[10] = "Unless explicitly silenced.-Tim Peters";
mottos[11] = "In the face of ambiguity, refuse the temptation to guess.-Tim Peters";
mottos[12] = "There should be one-- and preferably only one --obvious way to do it.-Tim Peters";
mottos[13] = "Although that way may not be obvious at first unless you're Dutch.-Tim Peters";
mottos[14] = "Now is better than never.-Tim Peters";
mottos[15] = "Although never is often better than *right* now.-Tim Peters";
mottos[16] = "If the implementation is hard to explain, it's a bad idea.-Tim Peters";
mottos[17] = "If the implementation is easy to explain, it may be a good idea.-Tim Peters";
mottos[18] = "Namespaces are one honking great idea -- let's do more of those!-Tim Peters";
Page({
  data: {
    motto: 'Hello LIFE',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    word:null,
    mymotto:null,
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  messageInput:function(e){
    this.setData({
      word:e
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    this.setData({
      mymotto:mottos[Math.floor(Math.random()*19)]
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  more:function(){
    wx.navigateTo({
      url: '../lookforFriends/lookforFriends'
    })
  },
  qiandao: function () {
    var app = getApp();
    var urls = "https://api.heclouds.com/devices/" + app.globalData.devidg + "/datapoints?type=3";
    var words = this.data.word.detail.value; 
    console.log(words);
    wx.request({
      url: urls,
      header: {
        "api-key": app.globalData.keysg,
      },
      method: "POST",
      dataType: "json",
      data: {
        "words": words
      },
      success: function (res) {
        console.log(res)
        wx.showModal({
          title: "√",
          content: "发送成功"})
      }
    })
  },
})
