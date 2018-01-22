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
  }
}

export default utils