//index.js
const app = getApp()
const db = wx.cloud.database()
Page({
  data: {
    homeData:[]
  },

  onLoad: function() {
    db.collection('homeData').get().then(res => {
      for(let item of res.data){
        item.comment.reverse() 
      }
      this.setData({ homeData: res.data})
    })
 

    this.onGetOpenid()
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  }, 

  sliderChange(e){
    console.log(e.detail.value)
  },

  intoDetail(e){
    console.log(e)
    var item = e.currentTarget.dataset.item
    if (item.type=='music'){
      app.globalData.musicData = item
      wx.navigateTo({
        url: '/pages/musicDetail/musicDetail' ,
      })
    }else{
      app.globalData.videoData = item
      wx.navigateTo({
        url: '/pages/videoDetail/videoDetail' ,
      })
    }
  },

  intoMusic(){
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease'
    })
    this.animation = animation
    animation.scale(.9).step()
    this.setData({
      animationData1: animation.export(),
    })
    setTimeout(() => {
      animation.scale(1).step()
      this.setData({
        animationData1: animation.export(),
      })
    }, 300)
    setTimeout(() => {
      wx.navigateTo({
        url: '/pages/music/music',
      })
    }, 100)
  },
  intoArtcle(){
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease'
    })
    this.animation = animation
    animation.scale(.9).step()
    this.setData({
      animationData2: animation.export(),
    })
    setTimeout(() => {
      animation.scale(1).step()
      this.setData({
        animationData2: animation.export(),
      })
    }, 300)
  },


  onGetUserInfo: function(e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res)
        wx.setStorageSync('openid', res.result.openid)
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        
        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
            
            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },
  onShareAppMessage: function (options) {
  }  
})
