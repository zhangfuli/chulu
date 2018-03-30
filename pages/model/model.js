// pages/model/model.js
import { getDirection } from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startX: '',
    startY: '',
    items: [],
    //用于记录路径上每个viewport的位置
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { 
    this.queryMultipleNodes()

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
  
  },


  /**
   * 获取所有节点
   * 
  */
  queryMultipleNodes: function(){
    var query = wx.createSelectorQuery()
    let i = 0;
    let self = this;
    query.selectAll('.block').boundingClientRect().exec(function (rects) {
      self.items = rects[0]
    })   
  },
  /**
   * 用户开始滑动
   * 
   */
  handletouchmove: function (event) {
    this.startX = event.touches[0].clientX;
    this.startY = event.touches[0].clientY;
  },

  /**
   * 滑动方向
  */
  moving: function moving(event) {
    this.startX = event.touches[0].clientX;
    this.startY = event.touches[0].clientY;
    for (let i in this.items) {
      if ((this.items[i].left - this.startX < 0 && this.items[i].right - this.startX > 0)
        && (this.items[i].top - this.startY < 0 && this.items[i].bottom - this.startY > 0)) {
        event.currentTarget.id = this.items[i].id
        console.log(event.currentTarget.id)
      }
    }
  },
  test: function(){
    console.log("test")
  }
})