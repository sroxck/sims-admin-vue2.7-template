import { ref, onMounted, defineComponent, computed, reactive } from "vue";
import { useParallax } from "@vueuse/core";
import fromItemDemo from "@/views/form/index";
import { Form, Row, Col } from "element-ui";
import schma from "./form/schma";
import "./test.scss";
export default defineComponent({
  setup() {
    const count = ref(0);
    const container = ref(null);
    const { tilt, roll, source } = useParallax(container);
    return () => (
      <div ref="container">
              <fromItemDemo config={schma}/>
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
