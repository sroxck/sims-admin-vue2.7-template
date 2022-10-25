import { defineComponent, getCurrentInstance, h, ref, } from "vue";
import Pagination from '@components/Pagination/index.vue'
import { useTextSelection } from '@vueuse/core'
import '../test.scss'
export default defineComponent({
  setup() {
    const AppHeight = ref(null)
    const dialogVisible = ref(false)
    const test = ref(null)
    const select = useTextSelection()

    const tableData = ref([
      {
        sample: "现病史：患者今晨2:30分如厕小便后出现一过性意识丧失并摔倒在地无两目上视、口角歪斜无肢体抽搐、二便失禁、汗出心慌等症状持续约3分钟后意识转清醒后可自行站立行走伴头昏沉不适全身乏力感行走无力持续未见明显缓解为求进一步系统治疗来我院就诊入住我科现症见：患者现意识清晰，精神较差，语声低微，全身乏力感，头昏沉不适，行走略不稳，无口眼歪斜，无肢体麻木，无饮水呛咳及吞咽困难，无视物重影，言语流利，近5天觉头痛，以头顶部及后枕部为主，呈阵发性，无恶心呕吐，无心慌胸闷等不适，平素右脚踝肿痛不适，纳眠可，大便调，小便频，夜尿5-6次。往2015年和2016年均出现一次发作性意识丧失无两目上视、肢体抽搐、二便失禁等症状未行治疗“高血压病”病史3年间断服用“伲福达1片qd”血压控制欠佳（具体不详）“血糖偏高”病史数月具体不详未行系统治疗",
        id: 'SAM00241248',
        score: 0.611897,
        time: '2022-08-22 13:10:43	',
        state: '未标注'
      },
      {
        id: 'SAM00241207',
        score: 0.580692,
        time: '2022-08-22 13:10:51	',
        state: '未标注', sample: "出院情况:患者左上肢肌张力较前稍下降，现左上肢屈肌肌张力1+级，左小腿三头肌肌张力仍稍高，踝阵挛明显，查体：神志清楚，精神正常，言语清晰，高级智能正常，双眼视力粗测正常，视野粗测无缺失，眼睑无下垂，眼裂对称，大小正常，双侧眼球各向正常，双瞳孔等大等圆，直径约3mm，对光反射灵敏，角膜反射灵敏，眼底未窥入，无眼震，双侧额面纹对称，左侧鼻唇沟浅，伸舌左偏，无舌肌纤颤，张口下颌无偏斜，下颌反射阴性，咽反射对称，悬雍垂居中。左侧上肢肌力0级，左下肢肌力3级，右侧肢体肌力5级，左侧肌张力较前稍减低，右侧肌张力正常，左侧腱反射活跃（+++），右侧腱反射正常（++），左侧巴宾斯基征（+），右侧巴宾斯基征（-），左上肢针刺觉较对侧减退，左侧指鼻试验无法完成，左侧跟膝胫试验欠稳准，右侧指鼻试验及跟膝胫试验正常，脑膜刺激征（-）。"
      }
    ])
    const content = ref('')
    function setContent(sample: string) {
      content.value = sample
      console.log(content.value)

    }
    const annotation_dts = [
      { color: 'rgb(92, 34, 35)', text: '阴性症状' },
      { color: 'rgb(238, 162, 164)', text: '阳性症状' },
      { color: 'rgb(238, 63, 77)', text: '发作特征' },
      { color: 'rgb(211, 36, 186)', text: '持续时间' },
      { color: 'rgb(43, 115, 175)', text: '放射部位' },
    ]

    const annotation_dts2 = [
      { color: 'rgb(92, 34, 135)', text: '处方' },
      { color: 'rgb(22, 42, 164)', text: '中药' },
      { color: 'rgb(44, 25, 77)', text: '西药' },
      { color: 'rgb(255, 4, 186)', text: '穴位' },
      { color: 'rgb(44, 115, 175)', text: '手术' },
    ]
    function setState(data: any) {
      console.log(select, 'select')
      var selection = window.getSelection();
      var range = selection?.getRangeAt(0);
      var span = document.createElement('span');
      span.style.backgroundColor = data.color;
      range && range.surroundContents(span);
      // 匹配每个字
      // content.value = content.value.replace(select.text.value, `<span style="background:${data.color};color:#fff">${select.text.value}</span>`)

    }

    return () => (
      <div>
        <el-table data={tableData.value} border header-cell-style={{ background: '#F2F6FD' }} style="width: 100%" stripe>
          <el-table-column prop="id" label="SAM_ID" show-overflow-tooltip />
          <el-table-column prop="score" label="SCORE" show-overflow-tooltip />
          <el-table-column prop="time" label="领取时间" show-overflow-tooltip />
          <el-table-column prop="sample" label="样本" show-overflow-tooltip />
          <el-table-column prop="state" label="样本状态" show-overflow-tooltip >
            {(scope: any) => <div>
              <el-link type="danger" >{scope.row.state}</el-link>
            </div>}
          </el-table-column>
          <el-table-column label="操作">
            {(scope: any) => <div>
              <el-button onClick={() => setContent(scope.row.sample)}>选取</el-button>
            </div>}
          </el-table-column>
        </el-table>
        <div class="row mt-10">
          <div class="w-2/3 ">
            <el-tabs type="border-card" >
              <el-tab-pane label="实体标注">
                {content.value ? <div style="line-height:30px" domPropsInnerHTML={content.value} ref="test"></div> : <el-empty description="无样本" />}
              </el-tab-pane>
              {/* <el-tab-pane label="名值提取">名值提取</el-tab-pane> */}
              {/* <el-tab-pane label="事件标注">事件标注</el-tab-pane> */}
            </el-tabs>
          </div>
          <div class="w-1/3 px-4">
            <el-card>
              <el-input
                class="mb-3"
                placeholder="请输入内容"
                prefix-icon="el-icon-search"
              >
              </el-input>
              <el-tabs>
                <el-tab-pane label="治疗实体">
                  {annotation_dts.map((item: any) => (
                    <el-button onClick={() => { setState(item) }} style={{ background: item.color, color: '#fff', width: '100%', margin: 0, marginBottom: '10px' }}>{item.text}</el-button>

                  ))}</el-tab-pane>
                <el-tab-pane label="辅助实体" >{annotation_dts2.map((item: any) => (
                  <el-button onClick={() => { setState(item) }} style={{ background: item.color, color: '#fff', width: '100%', margin: 0, marginBottom: '10px' }}>{item.text}</el-button>

                ))}</el-tab-pane>
                <el-tab-pane label="基础实体" >角色管理</el-tab-pane>
              </el-tabs>

            </el-card>
          </div>
        </div>
      </div >

    )
  },

});
