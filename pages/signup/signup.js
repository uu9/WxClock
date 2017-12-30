//注册页面
Page({
  data: {
    name:null,
    snum:null,
    password:null,
  },
  mimainput: function (e) {
    this.setData({
      password: e
    })
    console.log(this.data.password.detail.value);
  },
  xuehaoinput: function (e) {
    this.setData({
      snum: e
    })
    //console.log(1);
  },
  nameinput: function (e) {
    this.setData({
      name: e
    })
    //console.log(1);
  },
  signUp:function(){
    //console.log(this.data.snum.detail.value)
    var that = this;
    
      wx.request({
        url: "https://api.heclouds.com/register_de?register_code=B7JoBQorqNqJjIkp",
        data: {
          sn: String(this.data.snum.detail.value)
        },
        dataType: "json",
        method: "POST",
        success: function (res) {
          //console.log(res.data);
          var devid = res.data.data.device_id;
          var urls = "https://api.heclouds.com/devices/" + devid + "/datapoints?type=3";
          var keys = res.data.data.key;
          var passwords = that.data.password.detail.value;
          console.log(urls,keys,that.data)
          //console.log(res.data.data.device_id);
          //console.log(this.data.password)
          //password = this.data.password.detail.value;
          //console.log(password);
          wx.request({
            url: urls,
            header: {
              "api-key": keys,
            },
            method: "POST",
            dataType: "json",
            data: {
              "password": passwords,
              "name":name,
              "exsit":1
            },
            success: function (ress) {
              //console.log(urls);
              console.log(ress)
              wx.showModal({
                title: "√",
                content:"注册成功",
                success:function(res){
                  if(res.confirm){
                    wx.navigateTo({
                      url: '../index/index'
                    })
                  }
                }
              })
            }
          })
        },
      })
  },
})