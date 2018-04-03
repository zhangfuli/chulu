const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function getAngle(angx, angy) {
  return Math.atan2(angy, angx) * 180 / Math.PI;
}
/**
 * 得到手指滑动的方向
 * 
 * 得到两个view的相对位置  只需传入两个view的左上点的坐标
 * 
 * */  
function getDirection(clientX, clientY, startX, startY) {
  const result = {
    '0': 'top',
    '1': 'right',
    '2': 'bottom',
    '3': 'left',
    '4': 'not move'
  };
  if (Math.abs(clientX - startX) > 2 && Math.abs(clientY - startY) > 2) {
    //移动距离太短
    return result[4];
  }
  var angle = getAngle(clientX - startX, clientY - startY);
  if (angle >= -135 && angle <= -45) {
    return result[0];
  } else if (angle > 45 && angle < 135) {
    return result[2];
  } else if (angle >= 135 && angle <= 180 || angle >= -180 && angle < -135) {
    return result[3];
  } else if (angle >= -45 && angle <= 45) {
    return result[1];
  }
}
function isNext(p1x, p1y, p2x, p2y){
  var p1x = parseInt(p1x);
  var p2x = parseInt(p2x);
  var p1y = parseInt(p1y);
  var p2y = parseInt(p2y);
  if (((p2x - p1x) * (p2x - p1x) + (p2y - p1y) * (p2y - p1y)) -1 >0){
    return false;
  }else{
    return true;
  }
}

function Stack(){
  this.stack = [];
}
Stack.prototype ={
  push: function(value){
    this.stack.push(value);
  },
  //弹出栈顶元素
  pop: function(){
     return this.stack.pop();
  },
  //查看栈顶元素
  checkpop: function(){
    return this.stack[this.stack.length - 1];
  },
  //检查元素是否在栈中
  inStack: function(value){
    if (this.stack.indexOf(value)!== -1){
      return true;
    }else{
      return false;
    }
  },
  getStack: function(){
    return this.stack
  },
  getLength: function(){
    return this.stack.length
  }
}



module.exports = {
  formatTime: formatTime,
  getDirection: getDirection,   //判断手指滑动方向
  isNext: isNext,  //判断两点是否相邻
  Stack: Stack
}
