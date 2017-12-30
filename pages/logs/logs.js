//logs.js
const util = require('../../utils/util.js')
var app = getApp();
var ats = [];
var values = [];
Page({
  data: {
    logs: [],
    a: [],
    b: []
  },
  //显示历史发言页面
  onLoad:function(){
    var that = this;
    var urls = "https://api.heclouds.com/devices/" + app.globalData.devidg +"/datapoints?type=3"
      wx.request({
        url: urls,
        header: {
          "api-key": app.globalData.keysg
        },
        method: "GET",
        dataType: "json",
        data: {
          "datastream_id": "words",
          "start":"2015-01-10T08:00:35" 
        },
        success: function (res) {
          for ( const o of res.data.data.datastreams[0].datapoints ){
              ats.push( o.at );
              values.push( o.value );
          }
          console.log(that.data)
          that.setData({
            a:ats,
            b:values
          })
          ats = [];
          values = [];
          //console.log(res.data.data.datastreams["0"].datapoints),
          //console.log(ats,values)
          }
      })
    },
})
