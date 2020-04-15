// pages/musicDetail/musicDetail.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlay:null,
    musicData:[],
    timeNum:'',
    musicTimeNum:'',
    musicProgress:'00:00',
    musicTime:'00:00',
    manager:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ musicData: app.globalData.musicData })
    app.globalData.videoData = ''
  },
  
  playMusic: function () {
    let that = this;
    let audio = this.data.musicData;
    let manager = wx.getBackgroundAudioManager();
    
    // 获取音频总时长 
    setTimeout(() => {
      console.log(manager.duration)
      var reslut = this.musicTime(manager.duration)
      this.setData({ musicTime: reslut, musicTimeNum: manager.duration })
    }, 400)  

    manager.onError((err =>{
      console.log(err)
    }))
    manager.onTimeUpdate(()=> {
      var time = manager.currentTime;
      var min = Math.floor(time % 3600);
      Math.floor(time / 3600) + "时" + Math.floor(min / 60) + "分" + time % 60 + "秒";
      var second = String(time % 60).split('.')[0]
      if (second.length == 1) {
        second = '0' + second
      }
      this.setData({ musicProgress: '0' + Math.floor(min / 60) + ":" + second, timeNum: parseInt(time) })
    })
    if (this.data.isPlay==null){
      manager.title = audio.author || "音频标题";
      manager.epname = "夏天随唱";
      manager.singer = "周浩";
      manager.coverImgUrl = audio.image;
      manager.src = audio.musicUrl;
      manager.currentTime = 0;
      this.setData({ isPlay: !this.data.isPlay, manager: manager })
    }else if (this.data.isPlay){
      this.setData({ isPlay: !this.data.isPlay })
      manager.pause()
      return
    } else if (this.data.isPlay==false){
      this.setData({ isPlay: !this.data.isPlay })
      manager.play()
    }
  },

  

  // 将秒转成分秒格式
  musicTime(time){
    console.log(time)
    var min = Math.floor(time % 3600);
    Math.floor(time / 3600) + "时" + Math.floor(min / 60) + "分" + time % 60 + "秒";
    var second = String(time % 60).split('.')[0]
    if (second.length == 1) {
      second = '0' + second
    }
    return '0' + Math.floor(min / 60) + ":" + second
  },

  
  // 点击了播放
  play(){
    this.playMusic()
  },
  // 进度条拖动中
  onSlideBar() {
    this.data.manager.pause()
    this.setData({ isPlay: false })
  },
  // 进度条拖动完成
  slideBar(e){
    console.log(e.detail.value)
    this.data.manager.seek(e.detail.value)
    this.data.manager.play()
    this.setData({ isPlay: true })
    
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