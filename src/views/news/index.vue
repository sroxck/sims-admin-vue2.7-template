<script >
import Search from './components/search/index.vue'
import Content from './components/content/index.vue'
import pagination from '@/components/Pagination/index.vue'
import Dialog from './components/dialog/index.vue'
import ResultDialog from './components/dialog/result.vue'
import { searchConfig } from './components/search/useSearch'
import { postFun, getList } from '@/api/common'
import { computed, onActivated, reactive, ref, toRefs, h, defineComponent } from 'vue'
import { escapeDate } from '@/utils/time'
import { Message, MessageBox } from 'element-ui'
import { useHandle } from './handle'
import { useDialog } from '@/compoables/useDialog'
import downLoadTemplate from './components/dialog/downLoadTemplate.vue'
import { useRouter } from '@/router'
import news from '@/components/Article/index.vue'
export default {
  components: {
    Search,
    Content,
    Dialog,
    ResultDialog,
    pagination,
    news
  },
  setup(props, ctx) {
    const router = useRouter()
    const resultDialogshow = ref(false)
    const downloadButtonClick = () => {

    }



    const formData = reactive({
      pageSize: 10,
      pageNum: 1,
      totalRow: -1
    })
    function removeEmptyString(obj) {
      if (typeof obj !== 'object' || obj === null) {
        return obj; // 如果参数不是对象，则直接返回原对象
      }
      return Object.keys(obj).reduce((acc, key) => {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          acc[key] = removeEmptyString(obj[key]); // 递归遍历对象的属性
        } else if (obj[key] !== '') {
          acc[key] = obj[key]; // 保留非空字符串属性
        }
        return acc;
      }, {});
    }

    const tableData = ref([])
    const tamplateList = ref([])
    async function getTableData(params) {
      console.log(removeEmptyString(params), 'params')

      const { data, status } = await getList('/api/newsmanage/newslist', {
        paras: removeEmptyString(params) || {},
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
      newsTitle: '新闻标题',

    }
    // // 1  中心动态  2  新闻动态  3  通知公告  4  图片要闻  5  重要声明  6  健康馆  7  中医培训  8  同业资讯  9  成功案例
    const transferStatus = computed(() => (status) => {
      const statusMap = new Map([
        [1, '中心动态'],
        [2, '新闻动态'],
        [3, '通知公告'],
        [4, '图片要闻'],
        [5, '重要声明'],
        [6, '健康馆'],
        [7, '中医培训'],
        [8, '同业资讯'],
        [9, '成功案例'],
      ])
      return statusMap.get(status) || '未知'
    })
    // 0-待发布,1-已发布,2-已下架
    const newsStatus = computed(() => (status) => {
      const statusMap = new Map([
        [0, '待发布'],
        [1, '已发布'],
        [2, '已下架'],
      ])
      return statusMap.get(status) || '未知'
    })

    const linkType = computed(() => status => {
      const statusMap = new Map([
        [0, 'info'],
        [1, 'success'],
        [2, 'warning'],
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
    const newDialog = ref(false)
    const newsType = ref(null)
    const addNews = () => {
      // router.value.push('/newsAdds')
      newDialog.value = true
      newsType.value = null
    }
    const modifyDialog = (row) => {
      row.view = false
      newDialog.value = true
      newsType.value = row
    }
    const viewNews = (row) => {
      row.view = true
      newDialog.value = true
      newsType.value = row
    }
    const publicOrSoldOutNews = async (row,type) => {
      const res = await postFun('/api/newsmanage/newunshelve', {
        newsId: row.newsId,
        newsStatus: type
      })
      if (res.status == 200) {
        Message.success('发布成功')
        getTableData()
      }
    }
    return {
      viewNews,
      publicOrSoldOutNews,
      newDialog,
      modifyDialog,
      newsType,
      json,
      runInfo,
      newsStatus,
      transferStatus,
      ...toRefs(useHandle(props, ctx, getTableData)),
      getTableData,
      tableData,
      labelData,
      error,
      escapeDate,
      linkType,
      tamplateList,
      addNews,
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

    <news :type="newsType" v-if="newDialog" :show.sync="newDialog" @upload="getTableData"></news>
    <div style="width: 100%">
      <el-row :gutter="40" style="margin: 0; padding-top: 20px">
        <el-col :xs="24" :sm="24" :lg="24">
          <Search :config="searchConfig" @search="getTableData" @update:addNews="addNews" @update:change="stateChange" />
          <Content :table-data="tableData" :label-data="labelData">
            <template #custom>
              <el-table-column label="新闻类型">
                <template slot-scope="scope">
                  {{ transferStatus(scope.row.newsType) }}
                </template>
              </el-table-column>
              <el-table-column label="发布状态">
                <template slot-scope="scope">
                  <el-link :type="linkType(scope.row.newsStatus)"> {{ newsStatus(scope.row.newsStatus) }}</el-link>
                </template>
              </el-table-column>
              <el-table-column label="发布时间">
                <template slot-scope="scope">
                  {{ escapeDate(scope.row.releaseTime * 1000) }}
                </template>
              </el-table-column>

            </template>
            <template #handle="{ row }">
              <el-link class="mr-2" type="primary" @click="viewNews(row)">预览</el-link>
              <el-link class="mr-2" v-if="row.newsStatus != 1" type="primary" @click="modifyDialog(row)">编辑</el-link>
              <el-link class="mr-2" v-if="row.newsStatus != 1" type="primary" @click="deleteExcel(row)">删除</el-link>
              <el-link class="mr-2" v-if="row.newsStatus != 1" type="primary" @click="publicOrSoldOutNews(row,1)">发布</el-link>
              <el-link class="mr-2" v-if="row.newsStatus == 1" type="primary" @click="publicOrSoldOutNews(row,2)">下架</el-link>
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
