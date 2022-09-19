import { defineComponent, getCurrentInstance, h, ref, } from "vue";
import Container from '@components/Container/index.vue'
import Pagination from '@components/Pagination/index.vue'
import { useDialog } from "@/hooks/useDialog";
import { Dialog, Message, MessageBox } from "element-ui";
import upload from "./upload.vue";
export default defineComponent({
  setup() {
    const root = getCurrentInstance()
    const tableList = ref<Object>([])
    const tableValue = ref([])
    const tableData = ref([])
    const tabletitle = ref('')
    let list: any = []
    const result = (e: any) => {
      tableValue.value = e[0]
      tableData.value = e
    }
    const AppHeight = ref(null)
    const resultTitle = (e:any)=>{
      tabletitle.value = e
    }
    const { open, close } = useDialog({
      title: <div>导入数据</div>,
      content: (
        <div>
          <upload onGetResult={result} onGetResultTitle={resultTitle}> </upload>
        </div>
      ),
      footer: <el-button onClick={() => {
        tableList.value = [{ name: '文件1.excel', time: '2022-9-19' }]
        // tableValue.value = list[0]

        close()
      }} >确认</el-button>,
    });
    const tableRender = () => {
      return <el-table style="width: 100%" stripe data={tableData.value}
        height={AppHeight.value}
        header-cell-style={{ background: '#F2F6FD' }}
        default-expand-all>
        {Object.keys(tableValue.value).map((item2: any) => {
          return (<el-table-column label={item2} prop={item2}></el-table-column>)
        })}
      </el-table>
    }


    const slots = {
      header: () => (
        <div>
          <el-form inline label-position="left" label-width="80px">
            <el-form-item>
              <el-input placeholder="请输入" prefix-icon="el-icon-search" style="width:180px;margin-right:10px"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="请输入" prefix-icon="el-icon-search" style="width:180px;margin-right:10px"></el-input>
            </el-form-item>
            <el-button type="primary" style="float:right;" onClick={open}>导入</el-button>
          </el-form>
        </div>
      ),
      main: () => <div>
        {/* <el-table style="width: 100%" stripe data={tableList.value}
          height={AppHeight.value}
          header-cell-style={{ background: '#F2F6FD' }}
          default-expand-all>
          {Object.keys(tableValue.value).map((item2: any) => {
            return (<el-table-column label={item2} prop={item2}></el-table-column>)
          })}

        </el-table> */}
        <el-table style="width: 100%" stripe data={tableList.value}
          height={AppHeight.value}
          header-cell-style={{ background: '#F2F6FD' }}
          default-expand-all>
          <el-table-column label="数据名称" >
            {tabletitle.value}
          </el-table-column>
          <el-table-column label="导入时间" prop="time"></el-table-column>
          <el-table-column label="操作">
            <el-button onClick={viewExportData}>查看</el-button>
          </el-table-column>
        </el-table>
      </div>,
      footer: () => (
        <Pagination total={20}></Pagination>
      )
    }
    const dialogVisible = ref(false)
    
    const viewExportData = () => {
      
      dialogVisible.value = true

    }
    const closeSS = ()=>{
      dialogVisible.value = false
    }
    return () => (
      <div>
        <el-dialog
          title="提示"
          visible={dialogVisible.value}
          width="80%"
        >
           <el-table style="width: 100%" stripe data={tableData.value}
          header-cell-style={{ background: '#F2F6FD' }}
          default-expand-all>
          {Object.keys(tableValue.value).map((item2: any) => {
            return (<el-table-column label={item2} prop={item2}></el-table-column>)
          })}

        </el-table>
          <span slot="footer" class="dialog-footer">
            <el-button onClick={closeSS}>取 消</el-button>
            <el-button type="primary" onClick={closeSS}>确 定</el-button>
          </span >
        </el-dialog>

        <Container scopedSlots={slots} size={AppHeight.value}></Container>
      </div >
    )
  },
  components: {
    upload
  }
});
