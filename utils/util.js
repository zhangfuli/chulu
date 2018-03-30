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
    '0': 'up',
    '1': 'right',
    '2': 'down',
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

module.exports = {
  formatTime: formatTime,
  getDirection: getDirection   //判断手指滑动方向
}
