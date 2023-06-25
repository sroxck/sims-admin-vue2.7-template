/**
 * @Author: sroxck
 * @Date: 2023-05-05 12:58:44
 * @LastEditors: sroxck
 * @LastEditTime: 2023-06-20 16:44:20
 * @Description:
 */

export function download(fileName, url, cb) {
  const element = document.createElement('a')
  element.setAttribute('href', url)
  element.download = fileName
  element.click()
}
export function downloadFn(flow = null, name,hz='xls') {
  if (!flow) return
  const blob = new Blob([flow])
  const blobUrl = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.style.display = 'none'
  a.download = `${name}.${hz}` // 自定义下载的文件名
  a.href = blobUrl
  a.click()
}
