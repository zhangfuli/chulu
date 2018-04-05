import { getData, getSelfUrl, getNextUrl, getStart } from './data.js'
import { getDirection, isNext, Stack } from '../../../utils/util.js'

Page({
  /**
   * 页面的初始数据
   * postion: (row-1)*一行个数+col
   * 
   * 
   */
  data: {
    items: [],
    stack: '',
    originItems: [],
    obstacle: '',
    round:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var items = getData();
    this.items = items;
    this.obstacle = 0;
    this.round = getSelfUrl().split('/')[getSelfUrl().split('/').length-1].replace(/[a-z]+/g,'');
    this.setData({
      round: this.round
    })
    this.setData({
      items: items
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.stack = new Stack();
    this.queryMultipleNodes();
  },
  queryMultipleNodes: function () {
    let query = wx.createSelectorQuery()
    let i = 0;
    let self = this;
    query.selectAll('.block').boundingClientRect().exec(function (rects) {
      self.items = rects[0];
      self.setData({ items: self.items });
      self.stack.push(self.items[getStart()]);
      self.originItems = JSON.parse(JSON.stringify(self.items));
      for (let i in self.items) {
        if (self.items[i].dataset.attribute === 'obstacle') {
          self.obstacle++;
        }
      }
    })
  },


  handletouchmove: function (event) {
    // console.log("currentId:" + this.stack.checkpop().id)
  },
  moving: function (event) {
    var startX = event.touches[0].clientX;
    var startY = event.touches[0].clientY;
    for (let i = 0; i < this.items.length; i++) {
      if ((this.items[i].left - startX < 0 && this.items[i].right - startX > 0)
        && (this.items[i].top - startY < 0 && this.items[i].bottom - startY > 0)) {
        event.currentTarget.id = this.items[i].id;
        this.items[i].dataset.arrived = "true";
        event.currentTarget.dataset = this.items[i].dataset;

        //滑动的入栈
        if (!this.stack.inStack(this.items[i])
          && this.items[i].dataset.attribute !== 'obstacle'
          && isNext(
            this.stack.checkpop().id.split('-')[0],
            this.stack.checkpop().id.split('-')[1],
            this.items[i].id.split('-')[0],
            this.items[i].id.split('-')[1])) {

          this.stack.push(this.items[i])
          this.render(1)
        }
        //回退
        if (this.stack.getLength() > 1
          && this.items[i].id === this.stack.getStack()[this.stack.getLength() - 2].id) {
          //this.items[i].dataset.arrived = "false";
          this.render(-1)
          this.stack.pop()

        }
      }
    }
  },

  //渲染dom
  render: function (value) {
    if (value === 1) {
      this.addPath();
    } else {
      this.removePath();
    }
    for (let i in this.items) {
      for (let j in this.stack.getStack()) {
        if (this.items[i].id === this.stack.getStack()[j].id) {
          this.items[i] = this.stack.getStack()[j]
        }
      }
      this.setData({
        items: this.items
      })
    }
  },
  addPath: function () {
    //判断stack中最后两个item的相对位置
    if (this.stack.getLength() > 1) {
      switch (getDirection(
        this.stack.getStack()[this.stack.getLength() - 1].left,
        this.stack.getStack()[this.stack.getLength() - 1].top,
        this.stack.getStack()[this.stack.getLength() - 2].left,
        this.stack.getStack()[this.stack.getLength() - 2].top)) {
        case 'right': {
          this.stack.getStack()[this.stack.getLength() - 1].dataset.class = 'arrived arrived-left'
          if (this.stack.getStack()[this.stack.getLength() - 2].dataset.class == 'arrived arrived-left') {
            this.stack.getStack()[this.stack.getLength() - 2].dataset.class = 'arrived arrived-left-right'
          }
          if (this.stack.getStack()[this.stack.getLength() - 2].dataset.class == 'arrived') {
            this.stack.getStack()[this.stack.getLength() - 2].dataset.class = 'arrived arrived-right'
          }
          if (this.stack.getStack()[this.stack.getLength() - 2].dataset.class == 'arrived arrived-bottom') {
            this.stack.getStack()[this.stack.getLength() - 2].dataset.class = 'arrived arrived-right-bottom'
          }
          if (this.stack.getStack()[this.stack.getLength() - 2].dataset.class == 'arrived arrived-top') {
            this.stack.getStack()[this.stack.getLength() - 2].dataset.class = 'arrived arrived-right-top'
          }
          break;
        }
        case 'top': {
          this.stack.getStack()[this.stack.getLength() - 1].dataset.class = 'arrived arrived-bottom'
          //前一个
          if (this.stack.getStack()[this.stack.getLength() - 2].dataset.class == 'arrived arrived-left') {
            this.stack.getStack()[this.stack.getLength() - 2].dataset.class = 'arrived arrived-left-top'
          }
          if (this.stack.getStack()[this.stack.getLength() - 2].dataset.class == 'arrived') {
            this.stack.getStack()[this.stack.getLength() - 2].dataset.class = 'arrived arrived-top'
          }
          if (this.stack.getStack()[this.stack.getLength() - 2].dataset.class == 'arrived arrived-bottom') {
            this.stack.getStack()[this.stack.getLength() - 2].dataset.class = 'arrived arrived-top-bottom'
          }
          if (this.stack.getStack()[this.stack.getLength() - 2].dataset.class == 'arrived arrived-right') {
            this.stack.getStack()[this.stack.getLength() - 2].dataset.class = 'arrived arrived-right-top'
          }
          break;
        }
        case 'bottom': {
          this.stack.getStack()[this.stack.getLength() - 1].dataset.class = 'arrived arrived-top'
          //前一个
          if (this.stack.getStack()[this.stack.getLength() - 2].dataset.class == 'arrived arrived-left') {
            this.stack.getStack()[this.stack.getLength() - 2].dataset.class = 'arrived arrived-left-bottom'
          }
          if (this.stack.getStack()[this.stack.getLength() - 2].dataset.class == 'arrived') {
            this.stack.getStack()[this.stack.getLength() - 2].dataset.class = 'arrived arrived-bottom'
          }
          if (this.stack.getStack()[this.stack.getLength() - 2].dataset.class == 'arrived arrived-top') {
            this.stack.getStack()[this.stack.getLength() - 2].dataset.class = 'arrived arrived-top-bottom'
          }
          if (this.stack.getStack()[this.stack.getLength() - 2].dataset.class == 'arrived arrived-right') {
            this.stack.getStack()[this.stack.getLength() - 2].dataset.class = 'arrived arrived-right-bottom'
          }
          break;
        }
        case 'left': {
          this.stack.getStack()[this.stack.getLength() - 1].dataset.class = 'arrived arrived-right'
          //前一个
          if (this.stack.getStack()[this.stack.getLength() - 2].dataset.class == 'arrived arrived-top') {
            this.stack.getStack()[this.stack.getLength() - 2].dataset.class = 'arrived arrived-left-top'
          }
          if (this.stack.getStack()[this.stack.getLength() - 2].dataset.class == 'arrived') {
            this.stack.getStack()[this.stack.getLength() - 2].dataset.class = 'arrived arrived-left'
          }
          if (this.stack.getStack()[this.stack.getLength() - 2].dataset.class == 'arrived arrived-bottom') {
            this.stack.getStack()[this.stack.getLength() - 2].dataset.class = 'arrived arrived-left-bottom'
          }
          if (this.stack.getStack()[this.stack.getLength() - 2].dataset.class == 'arrived arrived-right') {
            this.stack.getStack()[this.stack.getLength() - 2].dataset.class = 'arrived arrived-left-right'
          }
          break;
        }
      }
    }
  },
  removePath: function () {
    if (this.stack.getLength() > 1) {
      switch (getDirection(
        this.stack.getStack()[this.stack.getLength() - 2].left,
        this.stack.getStack()[this.stack.getLength() - 2].top,
        this.stack.getStack()[this.stack.getLength() - 1].left,
        this.stack.getStack()[this.stack.getLength() - 1].top)) {
        case 'left': {
          this.stack.getStack()[this.stack.getLength() - 1].dataset.class = ''
          if (this.stack.getStack()[this.stack.getLength() - 2].dataset.class == 'arrived arrived-left-right') {
            this.stack.getStack()[this.stack.getLength() - 2].dataset.class = 'arrived arrived-left'
          }
          if (this.stack.getStack()[this.stack.getLength() - 2].dataset.class == 'arrived arrived-right-bottom') {
            this.stack.getStack()[this.stack.getLength() - 2].dataset.class = 'arrived arrived-bottom'
          }
          if (this.stack.getStack()[this.stack.getLength() - 2].dataset.class == 'arrived arrived-right-top') {
            this.stack.getStack()[this.stack.getLength() - 2].dataset.class = 'arrived arrived-top'
          }
          if (this.stack.getStack()[this.stack.getLength() - 2].dataset.class == 'arrived arrived-right') {
            this.stack.getStack()[this.stack.getLength() - 2].dataset.class = 'arrived'
          }
          break;
        }
        case 'top': {
          this.stack.getStack()[this.stack.getLength() - 1].dataset.class = ''
          //前一个
          if (this.stack.getStack()[this.stack.getLength() - 2].dataset.class == 'arrived arrived-top-bottom') {
            this.stack.getStack()[this.stack.getLength() - 2].dataset.class = 'arrived arrived-top'
          }
          if (this.stack.getStack()[this.stack.getLength() - 2].dataset.class == 'arrived arrived-left-bottom') {
            this.stack.getStack()[this.stack.getLength() - 2].dataset.class = 'arrived arrived-left'
          }
          if (this.stack.getStack()[this.stack.getLength() - 2].dataset.class == 'arrived arrived-right-bottom') {
            this.stack.getStack()[this.stack.getLength() - 2].dataset.class = 'arrived arrived-right'
          }
          if (this.stack.getStack()[this.stack.getLength() - 2].dataset.class == 'arrived arrived-bottom') {
            this.stack.getStack()[this.stack.getLength() - 2].dataset.class = 'arrived'
          }
          break;
        }
        case 'bottom': {
          this.stack.getStack()[this.stack.getLength() - 1].dataset.class = ''
          //前一个
          if (this.stack.getStack()[this.stack.getLength() - 2].dataset.class == 'arrived arrived-left-top') {
            this.stack.getStack()[this.stack.getLength() - 2].dataset.class = 'arrived arrived-left'
          }
          if (this.stack.getStack()[this.stack.getLength() - 2].dataset.class == 'arrived arrived-top-bottom') {
            this.stack.getStack()[this.stack.getLength() - 2].dataset.class = 'arrived arrived-bottom'
          }
          if (this.stack.getStack()[this.stack.getLength() - 2].dataset.class == 'arrived arrived-right-top') {
            this.stack.getStack()[this.stack.getLength() - 2].dataset.class = 'arrived arrived-right'
          }
          if (this.stack.getStack()[this.stack.getLength() - 2].dataset.class == 'arrived arrived-top') {
            this.stack.getStack()[this.stack.getLength() - 2].dataset.class = 'arrived'
          }
          break;
        }
        case 'right': {
          this.stack.getStack()[this.stack.getLength() - 1].dataset.class = ''
          //前一个
          if (this.stack.getStack()[this.stack.getLength() - 2].dataset.class == 'arrived arrived-left-right') {
            this.stack.getStack()[this.stack.getLength() - 2].dataset.class = 'arrived arrived-right'
          }
          if (this.stack.getStack()[this.stack.getLength() - 2].dataset.class == 'arrived arrived-left-top') {
            this.stack.getStack()[this.stack.getLength() - 2].dataset.class = 'arrived arrived-top'
          }
          if (this.stack.getStack()[this.stack.getLength() - 2].dataset.class == 'arrived arrived-left-bottom') {
            this.stack.getStack()[this.stack.getLength() - 2].dataset.class = 'arrived arrived-bottom'
          }
          if (this.stack.getStack()[this.stack.getLength() - 2].dataset.class == 'arrived arrived-left') {
            this.stack.getStack()[this.stack.getLength() - 2].dataset.class = 'arrived'
          }
          break;
        }
      }
    }
  },
  touchend: function () {
    if (this.stack.getLength() + this.obstacle === this.items.length) {
      wx.showToast({
        title: 'great!',
        icon: 'success',
        duration: 2000
      })
      wx.redirectTo({
        url: getNextUrl()
      })
      wx.setStorageSync("round", getNextUrl())
    }
  },
  refresh: function () {
    wx.redirectTo({
      url: getSelfUrl()
    })
  }
})