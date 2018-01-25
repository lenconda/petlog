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
    var originalUrl = imgArr[i]
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
      vue.$store.commit('processImg', pushSrc)
      vue.imgList.push(pushSrc)
      vue.$store.commit('delProcessed')
    }
  }
}

export default utils