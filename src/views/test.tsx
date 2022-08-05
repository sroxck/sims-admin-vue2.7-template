import { ref, onMounted,defineComponent, computed } from "vue";
export default defineComponent({
  setup() {
    const count = ref(0);
    return () => (
      <div class=" p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
      </div>
    );
  },
})
