// pages/round1/round1-1/round1-1.js
import { getDirection } from '../../../utils/util.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    startX: '',
    startY: '',
    items: [], //用于记录路径上每个viewport的位置 
    originItems: [],
    currentId: '', //用于记录当前滑动对象的id
    isStart: '',  //判断用户是不是从起点开始移动
    startId: '',  //用于记录用户开始的view  id
    animation: ''
  },

  onShow: function () {
    this.queryMultipleNodes()
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
      for (let i = 0; i < self.items.length; i++) {
        self.items[i].class = '';
      }
      self.setData({ items: self.items });
      self.originItems = JSON.parse(JSON.stringify(self.items));
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

    this.startId = event.currentTarget.id;
    let self = this;
    if (event.currentTarget.dataset.isstart === 'false') {
      wx.showToast({
        title: '请选择起点',
        image: '/pages/images/error.png',
        complete: function(){ 
          setTimeout(function(){
            self.refresh()
          },500)
        }
      })  
    }

    
  },
  /**
   * 滑动方向
  */
  moving: function moving(event) {
    this.startX = event.touches[0].clientX;
    this.startY = event.touches[0].clientY;
    for (let i = 0; i < this.items.length; i++) {
      if ((this.items[i].left - this.startX < 0 && this.items[i].right - this.startX > 0)
        && (this.items[i].top - this.startY < 0 && this.items[i].bottom - this.startY > 0)) {
        event.currentTarget.id = this.items[i].id;
        this.items[i].dataset.touched = "true"
      }
    }
    //当用户的手从一个view滑动到另一个view
    if (event.currentTarget.id !== this.currentId) {
      this.addPath(this.currentId, event.currentTarget.id);
      this.currentId = event.currentTarget.id
    }
  },
  touchend: function () {
    let j = 0;
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].class.indexOf("arrived") != -1) {
        j++;
      }
    }
    if (this.items.length == j) {
      wx.showToast({
        title: 'great!',
        icon: 'success',
        duration: 2000
      })
      //清除数据缓存
      wx.navigateTo({
        url: 'pages/round1/round1-1/round1-1'
      })
    }
  },
  addPath: function (preId, nextId) {
    //手指滑出， 刷新页面
    if (nextId === this.startId) {
      //刷新--重新导航到当前页面
      this.refresh()
      return;
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
            switch (self.items[i].class) {
              //增加
              case 'arrived':
                self.items[i].class = 'arrived arrived-bottom'
                break;
              case '':
                self.items[i].class = 'arrived arrived-bottom'
                break;
              case 'arrived arrived-top':
                self.items[i].class = 'arrived arrived-top-bottom'
                break;
              case 'arrived arrived-left':
                self.items[i].class = 'arrived arrived-left-bottom'
                break;
              case 'arrived arrived-right':
                self.items[i].class = 'arrived arrived-right-bottom'
                break;

              //删除
              case 'arrived arrived-bottom':
                self.items[i].class = ''

            }
          }
          if (self.items[i].id === nextId) {//正则不好匹配
            switch (self.items[i].class) {
              //增加
              case '':
                self.items[i].class = 'arrived arrived-top'
                break;

              //删除
              case 'arrived arrived-top-bottom':
                self.items[i].class = 'arrived arrived-bottom'
                break;
              case 'arrived arrived-right-top':
                self.items[i].class = 'arrived arrived-right'
                break;
            }
          }
        }
        break;
      case 'up':
        for (let i in self.items) {
          if (self.items[i].id === preId) {//正则不好匹配
            switch (self.items[i].class) {
              //增加
              case 'arrived':
                self.items[i].class = 'arrived arrived-top'
                break;
              case '':
                self.items[i].class = 'arrived arrived-top'
                break;
              case 'arrived arrived-bottom':
                self.items[i].class = 'arrived arrived-top-bottom'
                break;
              case 'arrived arrived-right':
                self.items[i].class = 'arrived arrived-right-top'
                break;
              case 'arrived arrived-left':
                self.items[i].class = 'arrived arrived-left-top'
                break;
              

              //删除
              case 'arrived arrived-top':
                self.items[i].class = ''
                break;
              case 'arrived arrived-top-bottom':
                self.items[i].class = ''
                break;
              case 'arrived arrived-right-top':
                self.items[i].class = ''
                break;
              
            }
          }
          if (self.items[i].id === nextId) {//正则不好匹配
            switch (self.items[i].class) {
              case '':
                self.items[i].class = 'arrived arrived-bottom'
                break;

              //删除
              case 'arrived arrived-top-bottom':
                self.items[i].class = 'arrived arrived-top'
                break;
              case 'arrived arrived-bottom':
                self.items[i].class = 'arrived'
                break;
              case 'arrived arrived-right-bottom':
                self.items[i].class = 'arrived arrived-right'
                break;
              case 'arrived arrived-left-bottom':
                self.items[i].class = 'arrived arrived-left'
                break;
            }
          }
        }
        break;
      case 'right':
        for (let i in self.items) {
          if (self.items[i].id === preId) {//正则不好匹配
            switch (self.items[i].class) {
              //增加
              case 'arrived':
                self.items[i].class = 'arrived arrived-right'
                break;
              case '':
                self.items[i].class = 'arrived arrived-right'
                break;
              case 'arrived arrived-left':
                self.items[i].class = 'arrived arrived-left-right'
                break;
              case 'arrived arrived-bottom':
                self.items[i].class = 'arrived arrived-right-bottom'
                break;
              case 'arrived arrived-top':
                self.items[i].class = 'arrived arrived-right-top'
                break;

              //删除
              case 'arrived arrived-right':
                self.items[i].class = ''
              // case 'arrived arrived-left-right':
              //   self.items[i].class = ''
            }
          }
          if (self.items[i].id === nextId) {//正则不好匹配
            switch (self.items[i].class) {
              //增加
              case '':
                self.items[i].class = 'arrived arrived-left'
                break;

              //删除
              case 'arrived arrived-left-right':
                self.items[i].class = 'arrived arrived-right'
                break;
               case 'arrived arrived-left-top':
                self.items[i].class = 'arrived arrived-top'
                break;
               case 'arrived arrived-left-bottom':
                 self.items[i].class = 'arrived arrived-bottom'
                 break;
            }
          }
        }
        break;
      case 'left':
        for (let i in self.items) {
          if (self.items[i].id === preId) {//正则不好匹配
            switch (self.items[i].class) {
              //增加
              case 'arrived':
                self.items[i].class = 'arrived arrived-left'
                break;
              case '':
                self.items[i].class = 'arrived arrived-left'
                break;
              case 'arrived arrived-right':
                self.items[i].class = 'arrived arrived-left-right'
                break;
              case 'arrived arrived-top':
                self.items[i].class = 'arrived arrived-left-top'
                break;
              case 'arrived arrived-bottom':
                self.items[i].class = 'arrived arrived-left-bottom'
                break;

              //删除
              case 'arrived arrived-left':
                self.items[i].class = ''
                break;
              case 'arrived arrived-left-bottom':
                self.items[i].class = ''
                break;
              case 'arrived arrived-left-top':
                self.items[i].class = ''
                break;
            }
          }
          if (self.items[i].id === nextId) {//正则不好匹配
            switch (self.items[i].class) {
              //增加
              case '':
                self.items[i].class = 'arrived arrived-right'
                break;

              //删除
              case 'arrived arrived-left-right':
                self.items[i].class = 'arrived arrived-left'
                break;
              case 'arrived arrived-right-bottom':
                self.items[i].class = 'arrived arrived-bottom'
                break;
              case 'arrived arrived-right-top':
                self.items[i].class = 'arrived arrived-top'
                break;
        
            }
          }
        }
        break;
      // case 字符串:
      //   语句;
      // default:
      //   // 语句;
    }
    self.setData({ items: self.items })
  },

  //得到左上角坐标
  getPosition: function (itemId) {
    for (let i in this.items) {
      if (itemId === this.items[i].id) {
        return [this.items[i].left, this.items[i].top]
      }
    }
  },
  refresh: function (event) {
    console.log(11)
    let self = this;
    this.items = [];
    this.items = JSON.parse(JSON.stringify(this.originItems));
    this.setData({ animation: 'animation-rotate' });
    setTimeout(function () {
      self.setData({ items: self.items });
      self.setData({ animation: '' });
      self.setData({ startX: ''});
      self.setData({ startY: '' });
      self.setData({ currentId: ''});
      self.setData({ isStart: ''});
      self.setData({ startId: '' });
    }, 1000)

  }
})