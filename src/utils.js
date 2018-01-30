const utils = {
  getDate: (option, row) => {
    var date = new Date()
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var row_month = date.getMonth() + 1
    var day = date.getDate()
    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()
    if (month < 10) {
      month = '0' + month
    }
    switch (option) {
      case 0:
        return `${year}-${row ? row_month : month}-${day} ${hour}:${minute}:${second}`
        break
      case 1:
        return `${year}-${row ? row_month : month}-${day} ${hour}:${minute}`
        break
      case 2:
        return `${year}-${row ? row_month : month}-${day}`
        break
      case 3:
        return `${year}年${row ? row_month : month}月${day}日 ${hour}:${minute}:${second}`
        break
      case 4:
        return `${year}年${row ? row_month : month}月${day}日 ${hour}:${minute}`
        break
      case 5:
        return `${year}年${row ? row_month : month}月${day}日`
        break
      default:
        return false
        break
    }
    
  },
  getImgURL: (i, vue) => {
    var originalUrl = vue.imgList[i]
    console.log(`Original URL is ${originalUrl}`)
    var xhr = new XMLHttpRequest
    var blobAsDataUrl
    xhr.responseType = 'blob'
    xhr.onload = () => {
      var recoveredBlob = xhr.response
      var reader = new FileReader()
      reader.onload = () => {
        blobAsDataUrl = reader.result
        vue.$store.commit('processImg', blobAsDataUrl)
        vue.uploadList.push(vue.$store.state.processed)
        vue.$store.commit('delProcessed')
      }
      reader.readAsDataURL(recoveredBlob)
    }
    xhr.open('GET', originalUrl)
    xhr.send()
  },
  rotateImg: (imgSrc, vue) => {
    function getObjectURL (object) {
      return (window.URL) ? window.URL.createObjectURL(object) : window.webkitURL.createObjectURL(object)
    }
    function dataURLtoBlob (dataurl) {
      var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    }
    var canvas = document.createElement('canvas')
    var context = canvas.getContext('2d')
    var image = new Image()
    var testSrc
    image.src = imgSrc
    image.onload = () => {
      var imgRealWidth = image.width
      var imgRealHeight = image.height
      canvas.width = imgRealHeight
      canvas.height = imgRealWidth
      context.rotate(90 * Math.PI / 180)
      context.drawImage(image, 0, -imgRealHeight)
      var result = canvas.toDataURL('image/png')
      var blobObj = dataURLtoBlob(result)
      var file = new File([blobObj], `${Date.now()}.png`, {type: 'image/png'})
      var pushSrc = getObjectURL(file)
      testSrc = getObjectURL(file)
      vue.imgList.push(pushSrc)
    }
  }
}

export default utils