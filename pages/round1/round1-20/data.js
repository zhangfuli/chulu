function getData() {
  return [
    { "id": "1-1", "position": "1-1", "class": "", "attribute": "path", "arrived": "false" },
    { "id": "1-2", "position": "1-2", "class": "", "attribute": "path", "arrived": "false" },
    { "id": "1-3", "position": "1-3", "class": "obstacle", "attribute": "obstacle", "arrived": "false" },
    { "id": "1-4", "position": "1-4", "class": "obstacle", "attribute": "obstacle", "arrived": "false" },
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

    { "id": "4-1", "position": "4-1", "class": "arrived", "attribute": "start", "arrived": "true" },
    { "id": "4-2", "position": "4-2", "class": "obstacle", "attribute": "obstacle", "arrived": "false" },
    { "id": "4-3", "position": "4-3", "class": "", "attribute": "path", "arrived": "false" },
    { "id": "4-4", "position": "4-4", "class": "", "attribute": "path", "arrived": "false" },
    { "id": "4-5", "position": "4-5", "class": "", "attribute": "path", "arrived": "false" },

    { "id": "5-1", "position": "5-1", "class": "obstacle", "attribute": "obstacle", "arrived": "false" },
    { "id": "5-2", "position": "5-2", "class": "", "attribute": "path", "arrived": "false" },
    { "id": "5-3", "position": "5-3", "class": "", "attribute": "path", "arrived": "false" },
    { "id": "5-4", "position": "5-4", "class": "", "attribute": "path", "arrived": "false" },
    { "id": "5-5", "position": "5-5", "class": "", "attribute": "path", "arrived": "false" },

    { "id": "6-1", "position": "6-1", "class": "", "attribute": "path", "arrived": "false" },
    { "id": "6-2", "position": "6-2", "class": "", "attribute": "path", "arrived": "false" },
    { "id": "6-3", "position": "6-3", "class": "obstacle", "attribute": "obstacle", "arrived": "false" },
    { "id": "6-4", "position": "6-4", "class": "", "attribute": "path", "arrived": "false" },
    { "id": "6-5", "position": "6-5", "class": "", "attribute": "path", "arrived": "false" },

    { "id": "7-1", "position": "7-1", "class": "", "attribute": "path", "arrived": "false" },
    { "id": "7-2", "position": "7-2", "class": "", "attribute": "path", "arrived": "false" },
    { "id": "7-3", "position": "7-3", "class": "", "attribute": "path", "arrived": "false" },
    { "id": "7-4", "position": "7-4", "class": "obstacle", "attribute": "obstacle", "arrived": "false" },
    { "id": "7-5", "position": "7-5", "class": "", "attribute": "path", "arrived": "false" },

    { "id": "8-1", "position": "8-1", "class": "", "attribute": "path", "arrived": "false" },
    { "id": "8-2", "position": "8-2", "class": "", "attribute": "path", "arrived": "false" },
    { "id": "8-3", "position": "8-3", "class": "", "attribute": "path", "arrived": "false" },
    { "id": "8-4", "position": "8-4", "class": "", "attribute": "path", "arrived": "false" },
    { "id": "8-5", "position": "8-5", "class": "", "attribute": "path", "arrived": "false" },

  ]
}
function getStart() {
  return 3 * 5 + 0
}
function getSelfUrl() {
  return '/pages/round1/round1-20/round1-20'
}
function getNextUrl() {
  return '/pages/round1/round1-21/round1-21'
}
export { getData, getSelfUrl, getNextUrl, getStart }