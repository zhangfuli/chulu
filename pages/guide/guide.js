// pages/model/model.js
import { getDirection } from '../../utils/util.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    startX: '',
    startY: '',
    items: [], //用于记录路径上每个viewport的位置 
    /**
     * 以及class信息
     * [{
     *  parentClass:"",
     *  childClass:['','',''] //三个子view
     * }]
     * */
    currentId: '', //用于记录当前滑动对象的id
    isStart: '',  //判断用户是不是从起点开始移动
    startId: '',  //用于记录用户开始的view  id
    test:'11'
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
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.queryMultipleNodes()
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
  */
  queryMultipleNodes: function () {
    let query = wx.createSelectorQuery()
    let i = 0;
    let self = this;
    query.selectAll('.block').boundingClientRect().exec(function (rects) {
      self.items = rects[0];
      for(let i=0; i<self.items.length; i++){
        if(i === 0 || i === self.items.length -1){
          self.items[i].class = {
            parentClass: "start-end",
            childClass: ['path up hide', 'endpoint', 'path down hide'] //三个子view
          }   
        }else{
          self.items[i].class = {
            parentClass:"",
            childClass:['', '', ''] //三个子view
          }
        }  
        self.setData({items: self.items});  
      }
  
  
    })
  },
  /**
   * 用户开始滑动
   */
  handletouchmove: function (event) {
    this.startX = event.touches[0].clientX;
    this.startY = event.touches[0].clientY;
    this.currentId = event.currentTarget.id;
    //判定从起点开始滑动
    if( event.currentTarget.dataset.isstart === 'false'){
      wx.showToast({
        title: '请选择起点',
        image: '../images/error.png',
      })
    }
  },
  /**
   * 滑动方向
  */
  moving: function moving(event) {
    this.startX = event.touches[0].clientX;
    this.startY = event.touches[0].clientY;
    for (let i = 0; i < this.items.length ; i++) {
      if ((this.items[i].left - this.startX < 0 && this.items[i].right - this.startX > 0)
        && (this.items[i].top - this.startY < 0 && this.items[i].bottom - this.startY > 0)) {
        event.currentTarget.id = this.items[i].id;
      }
    }
  
    //当用户的手从一个view滑动到另一个view
    if (event.currentTarget.id !== this.currentId){
      this.addPath(this.currentId, event.currentTarget.id);
      this.currentId = event.currentTarget.id 
    }  
  },
  addPath: function(preId, nextId){
    //手指滑出， 刷新页面
    if(nextId === this.startId){
      //刷新--重新导航到当前页面
      wx.showToast({
        title: '失败',
        image: '../images/error.png',
        complete: function () {
          setTimeout(function(){
            wx.navigateTo({
              url: '/pages/guide/guide'
            })
          },1500)    
        }
      })
    }
    
    /**
      * 得到两个view的相对位置
    */
    let next = this.getPosition(nextId);
    let pre = this.getPosition(preId);
    let direction = getDirection(next[0], next[1], pre[0], pre[1]);
    // /**
    //  * const result = {
    //  *'0': 'up',
    //  * '1': 'right',
    //  * '2': 'down',
    //  * '3': 'left',
    //  * '4': 'not move'
    //  *};
    //  * */
    switch (direction) {
      case 'down':
        for (let i in this.items) {
          if (this.items[i].id === preId) {
            switch(preId){
              case 'start-end':
              case 'block-up-path':
              case 'block-left-path':
              case 'block-right-path':
            }

          }
          if (this.items[i].id === nextId) {
            console.log(nextId)
          }
        }
        break;
      // case 数字:
      //   语句;
      //   break;
      // case 字符串:
      //   语句;
      // default:
      //   语句;
    }
    // if (direction == 'down'){
    //   for(let i in this.items){
    //     if(this.items[i].id === preId){
    //       console.log(this.items[i].class)
    //     }
    //     if(this.items[i].id === nextId){
    //       console.log(nextId)
    //     }
    //   }
    // }
  },

  //得到左上角坐标
  getPosition: function (itemId) {
    for (let i in this.items) {
      if (itemId === this.items[i].id) {
        return [this.items[i].left, this.items[i].top]
      }
    }
  }
})