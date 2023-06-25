<script >
import Search from './components/search/index.vue'
import Content from './components/content/index.vue'
import pagination from '@/components/Pagination/index.vue'
import Dialog from './components/dialog/index.vue'
import ResultDialog from './components/dialog/result.vue'
import { searchConfig } from './components/search/useSearch'
import { postFun, getList } from '@/api/common'
import { computed, onActivated, reactive, ref, toRefs, h, defineComponent } from 'vue'
// import { escapeDate } from '@/utils/time'
import { Message, MessageBox } from 'element-ui'
import { useHandle } from './handle'
import { useDialog } from '@/compoables/useDialog'
import downLoadTemplate from './components/dialog/downLoadTemplate.vue'
export default {
  components: {
    Search,
    Content,
    Dialog,
    ResultDialog,
    pagination
  },
  setup(props, ctx) {
    const resultDialogshow = ref(false)
    const downloadButtonClick = () => {

    }



    const formData = reactive({
      pageSize: 10,
      pageNumber: 1,
      totalRow: -1
    })

    const tableData = ref([])
    const tamplateList = ref([])
    async function getTableData(params) {
      const { data, status } = await getList('/api/newsmanage/newslist', params || {
        paras: {},
        ...formData
      })
      if (status == 200) {
        formData.totalRow = data.totalRow
        // data.list.forEach(item => (item.createdTime = escapeDate(item.createdTime * 1000)))
        tableData.value = data.list
      }

      // formData.totalRow = data.totalRow
      // data.list.forEach(item => (item.createdTime = escapeDate(item.createdTime * 1000)))
      // tableData.value = data.list
    }

    getTableData()
    const labelData = {
      excelName: '学员名称',
      excelName1: '身份证号',
      excelName2: '证书编号',
      excelName3: '专业技能',
      excelName4: '学时',
      excelName5: '考试成绩',

    }
    // // 1成功 2失败 3执行中 4执行完成
    const transferStatus = computed(() => ({ status }) => {
      const statusMap = new Map([
        [1, '校验成功'],
        [2, '校验失败'],
        [3, '执行中'],
        [4, '执行完成']

      ])
      return statusMap.get(status) || '未知'
    })
    const linkType = computed(() => status => {
      const statusMap = new Map([
        [1, 'success'],
        [2, 'danger'],
        [3, 'warning'],
        [4, 'success']
      ])
      return statusMap.get(status) || 'info'
    })
    const error = (row) => {
      if (row.status != 2) return
      MessageBox({
        title: '校验失败信息',
        message: JSON.parse(row.json).join() || '',
        // showCancelButton: true,
        confirmButtonText: '确定'
      })
    }
    const json = ref([])
    /** 执行结果弹窗详情 */
    const runInfo = (row) => {
      if (![4].includes(row.status)) return
      json.value = JSON.parse(row.json).map(item => {
        item.reason = item.reasonList.join()
        //1成功 2失败 3执行中 4执行完成
        item.status = ['-', '成功', '失败 ', '执行中', '执行完成'][item.status]
        return item
      })

      resultDialogshow.value = true
    }

    return {
      json,
      runInfo,
      transferStatus,
      ...toRefs(useHandle(props, ctx, getTableData)),
      getTableData,
      tableData,
      labelData,
      error,
      linkType,
      tamplateList,
      searchConfig,
      formData,
      resultDialogshow,
      downloadButtonClick,
    }
  }
}

</script>

<template>
  <div class="contentBox">
    <div style="width: 100%">
      <el-row :gutter="40" style="margin: 0; padding-top: 20px">
        <el-col :xs="24" :sm="24" :lg="24">
          <Search :config="searchConfig" @search="getTableData" @update:download="downloadButtonClick"
            @update:import="importDialog = true" @update:change="stateChange" />
          <Content :table-data="tableData" :label-data="labelData">
            <template #custom>
              <el-table-column label="添加时间">
                <template slot-scope="scope">
                  {{ scope.row.excelImportTime  }}
                </template>
              </el-table-column>
              <el-table-column label="培训时间">
                <template slot-scope="scope">
                  {{ scope.row.excelImportTime  }}
                </template>
              </el-table-column>
              <el-table-column label="证书状态">
                <template slot-scope="scope">
                  <el-link :type="linkType(scope.row.status)" @click="error(scope.row)">{{ transferStatus(scope.row)
                  }}</el-link>
                </template>
              </el-table-column>

            </template>
            <template #handle="{ row }">
              <el-link type="primary" @click="downloadByList(row)">下载</el-link>
              <el-link v-if="row.status == 1" type="primary" @click="run(row)">执行</el-link>
              <el-link v-if="row.status < 3" type="primary" @click="deleteExcel(row)">删除</el-link>
              <el-link v-if="row.status == 4" type="primary" @click="runInfo(row)">执行结果</el-link>
            </template>
          </Content>

          <pagination :total="formData.totalRow" :page.sync="formData.pageNumber" :limit.sync="formData.pageSize"
            @pagination="getTableData" />
          <Dialog :show.sync="importDialog" @confirm="importConfirm" />
          <ResultDialog :show.sync="resultDialogshow" :json="json" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>
