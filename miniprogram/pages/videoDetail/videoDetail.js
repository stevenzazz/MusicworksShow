// pages/videoDetail/videoDetail.js
var app = getApp()
const db = wx.cloud.database()
const homeData = db.collection('homeData')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoData:{},
    content:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.setData({ 
      videoData: app.globalData.videoData ,
      userinfo : wx.getStorageSync('userinfo')
    })
    wx.setNavigationBarTitle({
      title: this.data.videoData.author
    })
    app.globalData.videoData = ''
  },
  inputChange(e){
    console.log(e)
    this.setData({ content: e.detail.value })
  },
  // 发送评论
  send() {
    wx.showLoading({
      title: '评论发送中！',
    })
    var that = this
    wx.cloud.callFunction({
      name: 'send',
      data: {
        _id: this.data.videoData._id,
        userinfo: this.data.userinfo,
        content: this.data.content
      }
    }).then(res =>{
      that.updateComments()
    })
  },


  // 更新评论 
  updateComments(){
    homeData.doc(this.data.videoData._id).get().then(res =>{
      console.log(res)
      res.data.comment.reverse()
      wx.hideLoading()
      this.setData({
        'videoData.comment': res.data.comment,
        content:''
      })
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  }

})