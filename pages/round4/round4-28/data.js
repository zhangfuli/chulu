let StartPosition = '';
function getSelfUrl() {
  return '/pages/round3/round3-28/round'
}
function getNextUrl() {
  return '/pages/round3/round3-29/round'
}
function getData() {
  /**
   * 0--path
   * 1--obstacle
   * 2--start
   * 
   */
  let data = [
    [0, 0, 0, 1, 0, 0],
    [0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [1, 0, 0, 1, 0, 2]
  ];


  let returnData = [];
  for(let i=0;i< data.length;i++){
    for(let j=0;j < data[i].length;j++){
      if(data[i][j] === 0){
        returnData.push(
          JSON.parse(`{ "id": "${i}-${j}", "position": "${i}-${j}", "class": "", "attribute": "path", "arrived": "false" }`)
        )
      } else if (data[i][j] === 1){
        returnData.push(
          JSON.parse(`{ "id": "${i}-${j}", "position": "${i}-${j}", "class": "obstacle", "attribute": "obstacle", "arrived": "false" }`)
        )
      }else{
        returnData.push(
          JSON.parse(`{ "id": "${i}-${j}", "position": "${i}-${j}", "class": "arrived", "attribute": "start", "arrived": "true" }`)
        );
        StartPosition = returnData.length;
      }
    }
  }
  return returnData
}
function getStart() {
  return parseInt(StartPosition)-1;
}

export { getData, getSelfUrl, getNextUrl, getStart }