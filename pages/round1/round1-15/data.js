function getData() {
  return [
    { "id": "1-1", "position": "1-1", "class": "", "attribute": "path", "arrived": "false" },
    { "id": "1-2", "position": "1-2", "class": "obstacle", "attribute": "obstacle", "arrived": "false" },
    { "id": "1-3", "position": "1-3", "class": "", "attribute": "path", "arrived": "false" },
    { "id": "1-4", "position": "1-4", "class": "", "attribute": "path", "arrived": "false" },
    { "id": "1-5", "position": "1-5", "class": "", "attribute": "path", "arrived": "false" },

    { "id": "2-1", "position": "2-1", "class": "", "attribute": "path", "arrived": "false" },
    { "id": "2-2", "position": "2-2", "class": "", "attribute": "path", "arrived": "false" },
    { "id": "2-3", "position": "2-3", "class": "", "attribute": "path", "arrived": "false" },
    { "id": "2-4", "position": "2-4", "class": "", "attribute": "path", "arrived": "false" },
    { "id": "2-5", "position": "2-5", "class": "", "attribute": "path", "arrived": "false" },

    { "id": "3-1", "position": "3-1", "class": "", "attribute": "path", "arrived": "false" },
    { "id": "3-2", "position": "3-2", "class": "", "attribute": "path", "arrived": "false" },
    { "id": "3-3", "position": "3-3", "class": "", "attribute": "path", "arrived": "false" },
    { "id": "3-4", "position": "3-4", "class": "", "attribute": "path", "arrived": "false" },
    { "id": "3-5", "position": "3-5", "class": "", "attribute": "path", "arrived": "false" },

    { "id": "4-1", "position": "4-1", "class": "", "attribute": "path", "arrived": "false" },
    { "id": "4-2", "position": "4-2", "class": "", "attribute": "path", "arrived": "false" },
    { "id": "4-3", "position": "4-3", "class": "", "attribute": "path", "arrived": "false" },
    { "id": "4-4", "position": "4-4", "class": "", "attribute": "path", "arrived": "false" },
    { "id": "4-5", "position": "4-5", "class": "", "attribute": "path", "arrived": "false" },

    { "id": "5-1", "position": "5-1", "class": "obstacle", "attribute": "obstacle", "arrived": "false" },
    { "id": "5-2", "position": "5-2", "class": "", "attribute": "path", "arrived": "false" },
    { "id": "5-3", "position": "5-3", "class": "arrived", "attribute": "start", "arrived": "true" },
    { "id": "5-4", "position": "5-4", "class": "obstacle", "attribute": "obstacle", "arrived": "false" },
    { "id": "5-5", "position": "5-5", "class": "obstacle", "attribute": "obstacle", "arrived": "false" },

  ]
}
function getStart() {
  return 4 * 5 + 2
}
function getSelfUrl() {
  return '/pages/round1/round1-15/round1-15'
}
function getNextUrl() {
  return '/pages/round1/round1-16/round1-16'
}
export { getData, getSelfUrl, getNextUrl, getStart }