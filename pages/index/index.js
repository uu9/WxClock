var Password;
var devid;
var ownkey;
//var input=123456;
//https://image.baidu.com/search/flip?tn=baiduimage&ie=utf-8&word=东方project&width=1920&height=1080&v=flip
Page({
data: {
  input: null,
  xuehao: null,
  },
mimainput:function(e){
  this.setData({
    input:e
  })
},
//登录及验证
xuehaoinput: function (e) {
  this.setData({
    xuehao: e
  })
  if(this.data.xuehao.detail.cursor==10){
    wx.request({
      url: "https://api.heclouds.com/register_de?register_code=B7JoBQorqNqJjIkp",
      data: {
        sn: String(this.data.xuehao.detail.value)
      },
      dataType: "json",
      method: "POST",
      success: function (res) {
        //console.log(res.data.data.device_id)
        //devid = res.data.data.device_id;
        //console.log(devid);
        devid = res.data.data.device_id;
        ownkey = res.data.data.key;
        var app = getApp();
        app.globalData.keysg = ownkey;
        app.globalData.devidg = devid;
        console.log(typeof (devid));
        console.log(devid);
        var urls = "https://api.heclouds.com/devices/" + devid + "/datapoints";
        console.log(urls)
        wx.request({
          url: urls,
          method: "GET",
          dataType: "json",
          data: {
            "datastream_id": "password",
          },
          header: {
            "api-key": ownkey,
          },
          success: function (ress) {
            console.log(ress);
            Password = ress.data.data.datastreams[0].datapoints[0].value;
            console.log(Password);
          }
        })
      }
    })
  }
},
toSignUp: function() {
  wx.navigateTo({
    url: '../signup/signup'
  })
},

toSignIn1: function (){
  console.log(this.data.input)
  if (this.data.input.detail.value == Password) {
    wx.navigateTo({
      url: '../main/main'
    })
  }
  else {
    console.log("密码错误")
    wx.showModal({
      title: "x",
      content: "密码错误",})
  }
},
  sendToOneNet: function () {
  wx.request({
    url: "https://api.heclouds.com/devices/23261614/datapoints?type=3",
    header: {
      "api-key": "OYAz8m0KbW4PU17T4k=q0ERdPy4=",
    },
    method: "POST",
    dataType: "json",
    data: {
      "password": "123456"
    },
    success: function (res) {
      console.log(res)
    }
  })
},
})