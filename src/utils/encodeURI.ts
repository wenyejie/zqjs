/**
 * encode
 * @param string 字符串
 *
 * @author: Storm
 * @date: 2018/01/17
 */
export default (string: string): string => {
  return encodeURIComponent(typeof string === 'string' ? string : '')
}
