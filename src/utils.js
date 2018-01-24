const utils = {
  getDate: () => {
    var date = new Date()
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()
    if (month < 10) {
      month = '0' + month
    }
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`
  },
  getImgURL: (i, imgArr, uplArr) => {
    var originalUrl = imgArr[i].src
    console.log(`Original URL is ${originalUrl}`)
    var xhr = new XMLHttpRequest
    var blobAsDataUrl
    xhr.responseType = 'blob'
    xhr.onload = () => {
      var recoveredBlob = xhr.response
      var reader = new FileReader()
      reader.onload = () => {
        blobAsDataUrl = reader.result
        uplArr.push(blobAsDataUrl)
      }
      reader.readAsDataURL(recoveredBlob)
    }
    xhr.open('GET', originalUrl)
    xhr.send()
  }
}

export default utils