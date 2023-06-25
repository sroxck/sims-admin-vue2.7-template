/*
 * @Author: sroxck
 * @Date: 2023-05-29 10:31:09
 * @LastEditors: sroxck
 * @LastEditTime: 2023-06-21 10:23:18
 * @Description: 
 */
import { ref, onMounted, defineComponent, computed, reactive } from "vue";
import { useParallax } from "@vueuse/core";
import fromItemDemo from "@/views/form/from";
import { Form, Row, Col } from "element-ui";
import schma from "./form/schma";
import schma2 from "./schma";
export default defineComponent({
  setup() {
    const count = ref(0);
    const container = ref(null);
    const { tilt, roll, source } = useParallax(container);
    return () => (
      <div ref="container">
              <h1>表单生成测试</h1>
              <fromItemDemo config={schma}/>
              <br></br>
              <br></br>
              <h1>多列生成测试</h1>
              <br></br>
              <fromItemDemo config={schma2}/>
        <button
          onClick={() => {
          }}
        >
          测试
        </button>
      </div>
    );
  },
  components: {
    fromItemDemo,
  },
});
