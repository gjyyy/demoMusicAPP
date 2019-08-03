# musicapp
<推荐页面>

<img src="https://raw.githubusercontent.com/gjyyy/demoMusicAPP/8f090eaf7766c2f0e882b25776d0377b0af73e61/Image/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202019-08-03%20%E4%B8%8B%E5%8D%881.33.36.png" width=20% height=20%>

<歌手页面>

<img src="https://github.com/gjyyy/demoMusicAPP/blob/master/Image/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202019-08-03%20%E4%B8%8B%E5%8D%881.33.47.png" width=20% height=20%>    <img src="https://github.com/gjyyy/demoMusicAPP/blob/master/Image/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202019-08-03%20%E4%B8%8B%E5%8D%881.33.52.png" width=20% height=20%>    <img src="https://github.com/gjyyy/demoMusicAPP/blob/master/Image/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202019-08-03%20%E4%B8%8B%E5%8D%881.33.56.png" width=20% height=20%>    <img src="https://github.com/gjyyy/demoMusicAPP/blob/master/Image/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202019-08-03%20%E4%B8%8B%E5%8D%881.33.59.png" width=20% height=20%>

<排行榜页面>

<img src="https://github.com/gjyyy/demoMusicAPP/blob/master/Image/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202019-08-03%20%E4%B8%8B%E5%8D%881.34.19.png" width=20% height=20%>

<搜索页面>

<img src="https://github.com/gjyyy/demoMusicAPP/blob/master/Image/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202019-08-03%20%E4%B8%8B%E5%8D%881.34.32.png" width=20% height=20%>    <img src="https://github.com/gjyyy/demoMusicAPP/blob/master/Image/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202019-08-03%20%E4%B8%8B%E5%8D%881.34.36.png" width=20% height=20%>

<个人中心>

<img src="https://github.com/gjyyy/demoMusicAPP/blob/master/Image/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202019-08-03%20%E4%B8%8B%E5%8D%881.34.43.png" width=20% height=20%>    <img src="https://github.com/gjyyy/demoMusicAPP/blob/master/Image/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202019-08-03%20%E4%B8%8B%E5%8D%881.34.12.png" width=20% height=20%>

# 项目介绍
基于vue全家桶开发的一款移动端音乐播放器webapp
## 技术栈
* 数据 :由qq音乐后台通过jsonp跨域和代理获取
* 前端 :vue全家桶，es6，stylus，axios，jsonp，better-scroll, vuex, good-storage, lyric-parser
## 功能模块
* 推荐页面 : 轮播图，推荐歌单，点击跳转歌单详情页
* 歌手页面 : 按姓氏首字母排列，点击侧面字母栏跳转到对应歌手区域,点击跳转到歌手详情页
* 详情页 : 点击跳转播放页
* 播放页 : 旋转中心图片，进度条，收藏，歌词页，控制按钮，迷你播放栏
* 排行页 : 显示榜单前几，点击跳转详情页 
* 搜索页 : 搜索框监听内容变化显示搜索结果；搜索结果上拉加载；搜索为歌曲，结果添加到当前播放列表并播放该歌曲；搜索为歌手跳转歌手详情页；保存搜索历史；显示热门搜索标签
* 个人中心页 : 选项卡显示最近播放历史,我的收藏列表
## 项目难点
* jsonp与代理，获取QQ音乐真实后台数据，获取数据的二次封装使用
* vuex的组件间数据传递
* 通过good-storage数据本地保存
* css 中flex的正确使用
* better-scroll 抽象成组件复用

# 项目运行

## 下载依赖
```
cnpm install
```

## 运行项目 打开端口localhost:8080
```
cnpm run dev
```

GJY

2019.8.3
