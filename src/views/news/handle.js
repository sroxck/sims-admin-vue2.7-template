/**
 * @Author: sroxck
 * @Date: 2023-05-05 10:11:37
 * @LastEditors: sroxck
 * @LastEditTime: 2023-06-25 10:44:29
 * @Description:
 */
import { h, ref } from 'vue'
import { download } from '@/utils/download'
import { getList, postFun } from '@/api/common'
import { Message, MessageBox } from 'element-ui'
export function useHandle(props, ctx, getTableData) {

  /** 删除 */
  const deleteExcel = async (row) => {
    const res = await postFun(`/api/newsmanage/newsdel?newsId=${row.newsId}`)
    if (res.status == 200) {
      Message.success('删除成功')
      getTableData()
    }
  }
  /** 执行 */
  const run = async (row) => {
    const { code } = await postFun('/cebp-dwh/api/excelImport/exe', { excelImportId: row.excelImportId }) || {}
    if (code == 200) {
      Message.success('执行成功！')
    }
    getTableData()
  }
  /** 下单用户上传的模版 */
  const downloadByList = (row) => {
    console.log('download', row)

    download(row.excelName, row.excelUploadPath)
  }

  /** 导入公共模版 */
  const importDialog = ref(false)
  const importConfirm = () => {
    getTableData()

    console.log('importConfirm')
  }

  /** 切换搜索条件状态 */
  const stateChange = (e) => {
    if (e.status == '') {
      e.status = undefined
    }
    getTableData({
      ...e
    })
    console.log('stateChange', e)
  }
  return {

    importDialog,
    importConfirm,
    deleteExcel,
    run,
    downloadByList,

    stateChange
  }
}
