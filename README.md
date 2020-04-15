# 界面简约美观 适合个人展示音乐作品 视频视频 记录生活等
现有功能： 视频展示 视频评论 音乐展示 音乐分享 



# 基于小程序云开发

这是云开发的快速启动指引，其中演示了如何上手使用云开发的三大基础能力：
- 数据库：一个既可在小程序前端操作，也能在云函数中读写的 JSON 文档型数据库
- 文件存储：在小程序前端直接上传/下载云端文件，在云开发控制台可视化管理
- 云函数：在云端运行的代码，微信私有协议天然鉴权，开发者只需编写业务逻辑代码

# 界面展示

<img src="https://attachments-cdn.shimo.im/yuNu2GHoVb4UjEVX/WX20200413-181240_2x.png" width = "260" div />
<img src="https://attachments-cdn.shimo.im/Mc7fLQoFWzQrFij1.png" width = "260" div  />
<img src="https://attachments-cdn.shimo.im/hLWHt7Z48EoPTVI9.png" width = "260" div  />


# 数据库设计
```
{   
    "_id":"f3db088f5e9341c",
    "image":"http://images/20180518/4c99a22ef08946459ccd846f538acf4b.jpeg",
    "content":"“那些个民谣（包括人民摇滚），太穷，动不动就唱北戴河、秦皇岛、安和桥。我就喜欢陈老师，你品尝了夜的巴黎，你踏过下雪的北京，你拥抱热情的岛屿，你埋葬记忆的土耳其，你累计了许多飞行，你用心挑选纪念品，你收集了地图上每一次的风和日丽。听着，就有钱。”",
    "author":"弹唱 旅行的意义",
    "musicUrl":"",
    "type":"video",
    "videoUrl":"旅行的意义.mp4",
    "comment":[
        {
            "time":"2020-4-13 5:33",
            "content":"还可以",
            "nickName":"夏天",
            "avatarUrl":"https://wx.qlogo.cn/mmopen/mAg/132"
        },
        {
            "nickName":"夏天",
            "avatarUrl":"https://wx.qlogo.cn/m132",
            "time":"2020-4-13 5:33",
            "content":"1"
        },
        {
            "content":"123",
            "nickName":"夏天",
            "avatarUrl":"https://wx.qlogo.cn/mmopen/v132",
            "time":"2020-4-13 5:33"
        },
        {
            "content":"哎哟卧槽",
            "nickName":"夏天",
            "avatarUrl":"https://w132",
            "time":"2020-4-13 10:4"
        },
        {
            "nickName":"夏天",
            "avatarUrl":"https://132",
            "time":"2020-4-13 10:4",
            "content":"测试"
        },
        {
            "content":"哇",
            "nickName":"夏天",
            "avatarUrl":"https:///132",
            "time":"2020-4-13 10:4"
        }
    ]
}
```
