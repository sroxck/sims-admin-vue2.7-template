import { ref, onMounted,defineComponent, computed } from "vue";
import { useParallax } from '@vueuse/core'
export default defineComponent({
  setup() {
   
    
    return () => (
      <div ref='container'>
        demo页面
      </div>
    
    );
  },
})
