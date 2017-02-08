var path = require('path'),
  fs = require("fs")

exports.refreshIndex = function () {
  let filePath = path.resolve(path.dirname(__dirname), 'app/index.html')
  return new Promise(resolve => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      let html = data.replace(/\?version=(\d?)+/g, '?version=' + Date.now())
      fs.writeFile(filePath, html, (err) => {
        resolve()
      })
    })
  })
}

