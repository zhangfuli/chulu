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
    originItems:[],
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
      self.originItems = rects[0];
      for(let i=0; i<self.items.length; i++){
        if(i === 0 || i === self.items.length -1){
          self.items[i].class = {
            parentClass: "start-end",
            childClass: ['path up hide', 'endpoint', 'path down hide'] //三个子view
          }   
        }else{
          self.items[i].class = {
            parentClass:"start-end",
            childClass:['hide', 'hide', 'hide'] //三个子view
          }
        }  
       
      }
      self.setData({ items: self.items });  
      self.originItems = JSON.parse(JSON.stringify(self.items));
    })
  },
  /**
   * 用户开始滑动
   */
  handletouchmove: function (event) {
    this.items = JSON.parse(JSON.stringify(this.originItems))
    this.setData({items: this.originItems})
    this.startX = event.touches[0].clientX;
    this.startY = event.touches[0].clientY;
    this.currentId = event.currentTarget.id;
    this.startId = event.currentTarget.id;

    //判定从起点开始滑动
    if( event.currentTarget.dataset.isstart === 'false'){
      wx.showToast({
        title: '请选择起点',
        image: '../images/error.png',
      })
      this.setData({ items: this.originItems })
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
        this.items[i].dataset.touched = "true"
      }
    }
    //当用户的手从一个view滑动到另一个view
    if (event.currentTarget.id !== this.currentId){
      this.addPath(this.currentId, event.currentTarget.id);
      this.currentId = event.currentTarget.id 
    }  
  },
  touchend: function(){
    let j=0;
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].dataset.touched == "true"){
        j++;
      }
    }
    if (this.items.length == j){
      console.log("qunaguo")
      wx.showToast({
        title: 'great！清除缓存',
        icon: 'success',
        duration: 2000
      })
      //清除数据缓存
    }else{
      wx.showToast({
        title: '没有全遍历哦',
        image: '../images/error.png',
        duration: 2000
      })
      this.setData({ items: this.originItems })
      this.items = JSON.parse(JSON.stringify(this.originItems))
    }
  },
  addPath: function(preId, nextId){
    //手指滑出， 刷新页面
    if(nextId === this.startId){
      //刷新--重新导航到当前页面
      wx.showToast({
        title: '滑出去啦',
        image: '../images/error.png',
        duration: 2000
      })
      this.setData({items: this.originItems})
      this.items = JSON.parse(JSON.stringify(this.originItems))
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
    let self = this;
    switch (direction) {
      case 'down':
        for (let i in self.items) { 
          if (self.items[i].id === preId) {//正则不好匹配
            switch (self.items[i].class.parentClass){
              case 'start-end':
                self.items[i].class.parentClass = 'block-down-path';
                self.items[i].class.childClass = ['path up', 'endpoint', 'path down hide'];
                break;
              case 'block-up-path':
                self.items[i].class.parentClass = 'block-up-down-path';
                self.items[i].class.childClass = ['path up', 'endpoint', 'path down'];
                break;
              case 'block-left-path':
                self.items[i].class.parentClass = 'block-left-down-path';
                self.items[i].class.childClass = ['row-up-path', 'row-path', 'row-endpoint'];
                break;
              case 'block-right-path':
                self.items[i].class.parentClass = 'block-right-down-path';
                self.items[i].class.childClass = ['row-up-path', 'row-path', 'row-endpoint'];
                break;
            }
          }
          if (this.items[i].id === nextId) {
            self.items[i].class.parentClass = 'block-up-path';
            self.items[i].class.childClass = ['path up', 'endpoint', 'path down hide'];
          }
        }
        break;
      case "up":
        for (let i in self.items) {
          if (self.items[i].id === preId) {
            switch (self.items[i].class.parentClass) {
              case 'start-end':
                self.items[i].class.parentClass = 'block-up-path hide';
                self.items[i].class.childClass = ['path up', 'endpoint', 'path down hide'];
                break;
              case 'block-down-path':
                self.items[i].class.parentClass = 'block-up-down-path';
                self.items[i].class.childClass = ['path up', 'endpoint', 'path down'];
                break;
              case 'block-left-path':
                self.items[i].class.parentClass = 'block-up-left-path';
                self.items[i].class.childClass = ['row-up-path', 'row-path', 'row-endpoint'];
                break;
              case 'block-right-path':
                self.items[i].class.parentClass = 'block-up-right-path';
                self.items[i].class.childClass = ['row-up-path', 'row-path', 'row-endpoint'];
            }
          }
          if (this.items[i].id === nextId) {
            self.items[i].class.parentClass = 'block-down-path';
            self.items[i].class.childClass = ['path up', 'endpoint', 'path down hide'];
          }
        }
        break;
      // case 字符串:
      //   语句;
      // default:
      //   语句;
    }
    self.setData({items:self.items})
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