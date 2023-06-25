/**
 *
 * @param {*} date 日期
 * @returns 返回格式化后的时间 格式 2020-02-02 02:20:20
 */
export function escapeDate(date) {
  if (date) {
    const time = new Date(date)
    const day = time.getFullYear() + '-' +
      ((time.getMonth() + 1).toString().padStart(2, '0')) + '-' +
      ((time.getDate()).toString().padStart(2, '0')) + ' ' +
      ((time.getHours()).toString()) + ':' +
      ((time.getMinutes()).toString().padStart(2, '0')) + ':' +
      ((time.getSeconds()).toString().padStart(2, '0'))
    return day
  }
}
