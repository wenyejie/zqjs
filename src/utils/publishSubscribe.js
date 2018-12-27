/**
 * 发布订阅模式
 *
 * @author: Storm
 * @date: 2018-12-27
 */

// 默认的选项
const defaultOptions = {

  // 是否保留发布状态
  retain: true,

  // 是否订阅每次发布
  every: true,

  // 默认的订阅者
  subscriber: []
}

/**
 * 状态
 * @type {{PUBLISHED: string 已发布, PADDING: string 等待}}
 */
const STATUS = {
  // 等待
  PADDING: 'padding',

  // 已发布
  PUBLISHED: 'published'
}

export default class PublishSubscribe {

  /**
   * 订阅发布构造函数
   * @param {Object} options 用户自定义选项
   * @return {void}
   */
  constructor (options = {}) {
    this.options = Object.assign(options, defaultOptions)

    // 订阅者
    this.subscriber = this.options.subscriber

    // 订阅发布的状态
    this.status = STATUS.PADDING

    this.publishParams = null
  }

  /**
   * 订阅
   * @param {Function} callback 订阅的回调
   * @return {void}
   */
  subscribe (callback) {
    this.subscriber.push(callback)

    // 如果有保留发布状态并且已经发布则立即进行回调
    if (this.options.retain && this.status === STATUS.PUBLISHED) {
      this.callback()
    }
  }

  /**
   * 订阅回调
   * @return {void}
   */
  callback () {

    if (this.status !== STATUS.PUBLISHED) return

    // 进行回调
    this.subscriber.forEach(callbackFn => callbackFn.apply(null, this.publishParams))

    // 是否保留发布状态
    if (!this.options.retain) {
      this.status = STATUS.PADDING
    }

    // 是否订阅每次发布
    if (!this.options.every) {
      this.subscriber = []
    }
  }

  /**
   * 发布
   * @param rest 发布传递的参数
   * @return {void}
   */
  publish (...rest) {
    this.publishParams = rest

    this.status = 'published'

    this.callback()
  }
}
