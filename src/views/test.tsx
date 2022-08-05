import { ref, onMounted,defineComponent, computed } from "vue";
import { useParallax } from '@vueuse/core'
export default defineComponent({
  setup() {
    const count = ref(0);
    const container = ref(null)
    const { tilt, roll, source } = useParallax(container)
    
    return () => (
      <div ref='container'>
        {source.value}
      </div>
    
    );
  },
})
