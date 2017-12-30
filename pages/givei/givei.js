//招募页面入口
// pages/givei/givei.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    word:null
  },
  //将输入数据赋值给word，以和html交互
  messageInput: function (e) {
    this.setData({
      word: e
    })
  },
  //发送招募信息
  givei: function () {
    var app = getApp();
    var urls = "https://api.heclouds.com/devices/23844058/datapoints?type=3";
    var words = this.data.word.detail.value;
    console.log(words);
    wx.request({
      url: urls,
      header: {
        "api-key": "ZyjOeM1=UtZ5wguCPBbJVAaqi1Y=",
      },
      method: "POST",
      dataType: "json",
      data: {
        "this": words
      },
      success: function (res) {
        console.log(res)
        wx.showModal({
          title: "√",
          content: "发送成功"
        })
      }
    })
  },
})