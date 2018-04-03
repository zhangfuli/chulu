//{ "id": "1-1", "position": "1-1", "class": "arrived", "attribute": "path", "arrived": "true" }
//{ "id": "1-2", "position": "1-2", "class": "", "attribute": "path", "arrived": "false" },
//{ "id": "2-2", "position": "2-2", "class": "obstacle", "attribute": "obstacle", "arrived": "false" },

function getData() {
  return [{ "id": "1-1", "position": "1-1", "class": "arrived", "attribute": "path", "arrived": "true" },
  { "id": "1-2", "position": "1-2", "class": "", "attribute": "path", "arrived": "false" },
  { "id": "1-3", "position": "1-3", "class": "", "attribute": "path", "arrived": "false" },
  { "id": "2-1", "position": "2-1", "class": "", "attribute": "path", "arrived": "false" },
  { "id": "2-2", "position": "2-2", "class": "obstacle", "attribute": "obstacle", "arrived": "false" },
  { "id": "2-3", "position": "2-3", "class": "", "attribute": "path", "arrived": "false" },
  { "id": "3-1", "position": "3-1", "class": "", "attribute": "path", "arrived": "false" },
  { "id": "3-2", "position": "3-2", "class": "", "attribute": "path", "arrived": "false" },
  { "id": "3-3", "position": "3-3", "class": "", "attribute": "start", "arrived": "true" },
  ]
}
function getSelfUrl(){
  return '/pages/round1/round1-1/round1-1'
}
function getNextUrl(){
  return '/pages/round1/round1-2/round1-2'
}
function getStart(){
  return 0*3+0
}
export { getData, getSelfUrl, getNextUrl, getStart}