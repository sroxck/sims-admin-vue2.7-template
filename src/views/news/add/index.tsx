/*
 * @Author: sroxck
 * @Date: 2023-06-21 15:11:04
 * @LastEditors: sroxck
 * @LastEditTime: 2023-06-21 16:00:25
 * @Description: 
 */
import { defineComponent } from "vue";
import news from '@/components/Article/index.vue'
export default defineComponent({
  components:{
    news
  },
  setup(props, ctx) {
    return () =>
      <div>
        <news></news>
        {/* <el-form label-position="left">
          <el-form-item label="新闻标题" prop="name">
            <el-input ></el-input>
          </el-form-item>
          <el-form-item label="新闻类型" prop="name">
            <el-input ></el-input>
          </el-form-item>
          <el-form-item label="新闻封面" prop="name">
            <el-input ></el-input>
          </el-form-item>
          <el-form-item label="新闻正文" prop="name">
            <el-input ></el-input>
          </el-form-item>
        </el-form > */}
      </div >
  }
})
