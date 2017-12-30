// pages/lookforFriends/lookforFriends.js
//招募页面入口
var ats=[];
var values=[];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    a:null,
    words:null
  },
  //获取招募信息模块
  onLoad:function(){
  var that = this;
  var urls = "https://api.heclouds.com/devices/23844058/datapoints?type=3"
      wx.request({
    url: urls,
    header: {
      "api-key": "ZyjOeM1=UtZ5wguCPBbJVAaqi1Y="
    },
    method: "GET",
    dataType: "json",
    data: {
      "datastream_id": "this",
      "start": "2015-01-10T08:00:35"
    },
    success: function (res) {
      for (const o of res.data.data.datastreams[0].datapoints) {
        ats.push(o.at);
        values.push(o.value);
      }
      console.log(that.data)
      that.setData({
        a: ats,
        words: values
      })
      ats = [];
      values = [];
      //console.log(res.data.data.datastreams["0"].datapoints),
      //console.log(ats,values)
    }
  })
},
more:function(){
  wx.navigateTo({
    url: '../givei/givei'
  })}
})