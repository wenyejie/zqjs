/**
 * 错误日志监听
 * @author: Storm
 * @date: 2019-01-04
 * @email: wenyejie@foxmail.com
 */

/**
 * 错误收藏
 * @param type {String} 错误类型
 * @param error {Error} 错误信息
 * @param info {Object|String} 其它错误信息
 */
const collect = (type, error, info) => {
  const result = {
    type,
    ...info,
    userAgent: navigator.userAgent,
    url: document.URL,
    referrer: document.referrer,
    charset: document.charset,
    lastModified: document.lastModified
  }
  if (error) {
    result.name = error.name
    result.message = error.message
    result.stack = error.stack
  }
  console.log(result)
}

window.addEventListener('error', event => {
  let result
  let error = event.error

  if (error) {
    result = {
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno
    }
  } else {
    error = {
      name: '',
      message: '',
      stack: ''
    }
  }
  collect('WindowError', error, result)
}, true)

export default collect
